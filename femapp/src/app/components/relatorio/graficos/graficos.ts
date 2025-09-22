import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Declara as variáveis globais que serão criadas pelos scripts
declare var Chart: any;
declare var jsPDF: any;
declare var html2canvas: any;

import { VisitaService } from '../../../services/visita/visita';
import { UsuarioService } from '../../../services/usuario/usuario';
import { ReservaAuditorioService } from '../../../services/reserva-auditorio/reserva-auditorio';
import { FilmotecaService } from '../../../services/filmoteca/filmoteca';
import { Visita } from '../../../models/Visita';
import { Usuario } from '../../../models/Usuario';
import { ReservaAuditorio } from '../../../models/ReservaAuditorio';
import { EPapel } from '../../../models/EPapel';
import { RequisicaoPaginada } from '../../../models/RequisicaoPaginada';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './graficos.html',
  styleUrls: ['./graficos.css']
})
export class Graficos implements OnInit {
  @ViewChild('dashboardContent') dashboardContent!: ElementRef;

  isLoading = true;

  // Dados para os cards
  totalVisitas = 0;
  totalVisitantes = 0;
  reservasPendentes = 0;
  sugestoesFilmoteca = 0;

  // Dados processados para os gráficos
  visitasPorMesData: any;
  visitasPorSetorData: any;
  visitantesPorNacionalidadeData: any;
  reservasPorStatusData: any;
  visitasPorDiaSemanaData: any; // ✅ NOVO
  horarioPicoData: any; // ✅ NOVO

  // Instâncias dos gráficos
  private visitasChart: any;
  private nacionalidadeChart: any;
  private setorChart: any;
  private reservasChart: any;
  private visitasPorDiaSemanaChart: any; // ✅ NOVO
  private horarioPicoChart: any; // ✅ NOVO

  constructor(
    private visitaService: VisitaService,
    private usuarioService: UsuarioService,
    private reservaService: ReservaAuditorioService,
    private filmotecaService: FilmotecaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadScriptsAndData();
  }

  private loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(`Erro ao carregar o script: ${url}`);
      document.body.appendChild(script);
    });
  }

  private async loadScriptsAndData(): Promise<void> {
    try {
      await Promise.all([
        this.loadScript('https://cdn.jsdelivr.net/npm/chart.js'),
        this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
        this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js')
      ]);
      await this.carregarTodosOsDados();
    } catch (error) {
      console.error(error);
      this.isLoading = false;
    }
  }
  
  private carregarTodosOsDados(): Promise<void> {
    return new Promise((resolve) => {
        const paginacao = new RequisicaoPaginada();
        paginacao.size = 2000;

        this.usuarioService.get(undefined, paginacao).subscribe(usuariosRes => {
          const visitantes = usuariosRes.content.filter(u => u.papel === EPapel.VISITANTE);
          this.totalVisitantes = visitantes.length;
          this.processarDadosNacionalidade(visitantes);

          this.visitaService.get(paginacao).subscribe(visitasRes => {
            this.totalVisitas = visitasRes.content.length;
            this.processarDadosVisitas(visitasRes.content);

            this.reservaService.buscarReservas().subscribe(reservasRes => {
              this.reservasPendentes = reservasRes.content.filter(r => r.status === 'PENDENTE').length;
              this.processarDadosReservas(reservasRes.content);

              this.filmotecaService.get(paginacao).subscribe(filmotecaRes => {
                this.sugestoesFilmoteca = filmotecaRes.totalElements;
                this.isLoading = false;
                this.cdr.detectChanges();
                this.renderizarTodosOsGraficos();
                resolve();
              });
            });
          });
        });
    });
  }

  processarDadosVisitas(visitas: Visita[]): void {
    const visitasPorMes: { [key: string]: number } = {};
    const visitasPorSetor: { [key: string]: number } = {};
    const visitasPorDiaSemana: number[] = new Array(7).fill(0); // 0: Domingo, 1: Segunda...
    const visitasPorHora: { [key: string]: number } = {};

    visitas.forEach(visita => {
      const dataVisita = new Date(visita.dataHoraEntrada || visita.dataHoraAgendamento!);
      
      // Dados para visitas por mês
      const mesAno = `${dataVisita.getMonth() + 1}/${dataVisita.getFullYear()}`;
      visitasPorMes[mesAno] = (visitasPorMes[mesAno] || 0) + 1;
      
      // Dados para visitas por setor
      const nomeSetor = visita.local.nomeSetor;
      visitasPorSetor[nomeSetor] = (visitasPorSetor[nomeSetor] || 0) + 1;

      // ✅ NOVO: Dados para visitas por dia da semana
      const dia = dataVisita.getDay();
      visitasPorDiaSemana[dia]++;

      // ✅ NOVO: Dados para visitas por hora
      const hora = dataVisita.getHours();
      const horaLabel = `${hora.toString().padStart(2, '0')}:00`;
      visitasPorHora[horaLabel] = (visitasPorHora[horaLabel] || 0) + 1;
    });

    const mesesOrdenados = Object.keys(visitasPorMes).sort((a, b) => {
        const [mesA, anoA] = a.split('/').map(Number);
        const [mesB, anoB] = b.split('/').map(Number);
        return new Date(anoA, mesA - 1).getTime() - new Date(anoB, mesB - 1).getTime();
    });

    this.visitasPorMesData = {
      labels: mesesOrdenados,
      datasets: [{ label: 'Número de Visitas', data: mesesOrdenados.map(mes => visitasPorMes[mes]), borderColor: '#36A2EB', backgroundColor: 'rgba(54, 162, 235, 0.2)', fill: true, tension: 0.3 }]
    };

    this.visitasPorSetorData = {
        labels: Object.keys(visitasPorSetor),
        datasets: [{ label: 'Visitas por Setor', data: Object.values(visitasPorSetor), backgroundColor: '#FF6384' }]
    };

    // ✅ NOVO: Processamento para os novos gráficos
    const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    this.visitasPorDiaSemanaData = {
        labels: diasDaSemana,
        datasets: [{ label: 'Visitas por Dia da Semana', data: visitasPorDiaSemana, backgroundColor: '#FF9F40' }]
    };

    const horasOrdenadas = Object.keys(visitasPorHora).sort((a, b) => parseInt(a) - parseInt(b));
    this.horarioPicoData = {
        labels: horasOrdenadas,
        datasets: [{ label: 'Visitas por Hora do Dia', data: horasOrdenadas.map(hora => visitasPorHora[hora]), backgroundColor: '#4BC0C0' }]
    };
  }

  processarDadosNacionalidade(visitantes: Usuario[]): void {
    const contagem: { [key: string]: number } = {};
    visitantes.forEach(v => {
      const nacionalidade = v.nacionalidade?.nacionalidade || 'Não informada';
      contagem[nacionalidade] = (contagem[nacionalidade] || 0) + 1;
    });
    this.visitantesPorNacionalidadeData = {
      labels: Object.keys(contagem),
      datasets: [{ data: Object.values(contagem), backgroundColor: ['#4BC0C0', '#FFCD56', '#FF9F40'] }]
    };
  }

  processarDadosReservas(reservas: ReservaAuditorio[]): void {
    const contagem: { [key: string]: number } = {};
    reservas.forEach(r => {
        const status = r.status || 'Não informado';
        contagem[status] = (contagem[status] || 0) + 1;
    });
    this.reservasPorStatusData = {
        labels: Object.keys(contagem),
        datasets: [{ data: Object.values(contagem), backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }]
    };
  }

  renderizarTodosOsGraficos(): void {
    this.renderVisitasPorMesChart(); this.renderNacionalidadeChart();
    this.renderSetorChart(); this.renderReservasChart();
    this.renderVisitasPorDiaSemanaChart(); this.renderHorarioPicoChart(); // ✅ NOVO
  }

  renderVisitasPorMesChart(): void {
    const canvas = document.getElementById('visitasChart') as HTMLCanvasElement;
    if (canvas && this.visitasPorMesData) {
      if (this.visitasChart) this.visitasChart.destroy();
      this.visitasChart = new Chart(canvas, { type: 'line', data: this.visitasPorMesData, options: { responsive: true, maintainAspectRatio: false } });
    }
  }

  renderNacionalidadeChart(): void {
    const canvas = document.getElementById('nacionalidadeChart') as HTMLCanvasElement;
    if (canvas && this.visitantesPorNacionalidadeData) {
      if(this.nacionalidadeChart) this.nacionalidadeChart.destroy();
      this.nacionalidadeChart = new Chart(canvas, { type: 'doughnut', data: this.visitantesPorNacionalidadeData, options: { responsive: true, maintainAspectRatio: false } });
    }
  }

  renderSetorChart(): void {
      const canvas = document.getElementById('setorChart') as HTMLCanvasElement;
      if(canvas && this.visitasPorSetorData) {
          if(this.setorChart) this.setorChart.destroy();
          this.setorChart = new Chart(canvas, { type: 'bar', data: this.visitasPorSetorData, options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y' } });
      }
  }

  renderReservasChart(): void {
      const canvas = document.getElementById('reservasChart') as HTMLCanvasElement;
      if(canvas && this.reservasPorStatusData) {
          if(this.reservasChart) this.reservasChart.destroy();
          this.reservasChart = new Chart(canvas, { type: 'pie', data: this.reservasPorStatusData, options: { responsive: true, maintainAspectRatio: false } });
      }
  }

  // ✅ NOVOS MÉTODOS DE RENDERIZAÇÃO
  renderVisitasPorDiaSemanaChart(): void {
    const canvas = document.getElementById('visitasPorDiaSemanaChart') as HTMLCanvasElement;
    if (canvas && this.visitasPorDiaSemanaData) {
      if (this.visitasPorDiaSemanaChart) this.visitasPorDiaSemanaChart.destroy();
      this.visitasPorDiaSemanaChart = new Chart(canvas, {
        type: 'bar',
        data: this.visitasPorDiaSemanaData,
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }

  renderHorarioPicoChart(): void {
    const canvas = document.getElementById('horarioPicoChart') as HTMLCanvasElement;
    if (canvas && this.horarioPicoData) {
      if (this.horarioPicoChart) this.horarioPicoChart.destroy();
      this.horarioPicoChart = new Chart(canvas, {
        type: 'bar',
        data: this.horarioPicoData,
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }

  gerarPDF(): void {
    const content = this.dashboardContent.nativeElement;
    html2canvas(content, { scale: 2, useCORS: true }).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Relatorio_AcreVisita_${new Date().toLocaleDateString()}.pdf`);
    });
  }
}

