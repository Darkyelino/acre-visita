import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { AuthService } from '../../../services/auth/auth';
import { ReservaAuditorioService } from '../../../services/reserva-auditorio/reserva-auditorio';
import { Usuario } from '../../../models/Usuario';
import { ReservaAuditorio } from '../../../models/ReservaAuditorio';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

// Tipo para o status visual que usamos na tela.
type StatusVisual = 'PENDENTE' | 'APROVADA' | 'RECUSADA' | 'FINALIZADO';

// Interface que estende a original para adicionar nosso status visual.
interface ReservaComStatusVisual extends ReservaAuditorio {
  statusVisual: StatusVisual;
}

@Component({
  selector: 'app-gerenciar-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-reservas.html',
  styleUrls: ['./gerenciar-reservas.css']
})
export class GerenciarReservas implements OnInit {

  funcionarioLogado: Usuario | null = null;
  
  // Listas que armazenam os dados da API
  reservasPendentes: ReservaComStatusVisual[] = [];
  reservasAprovadasEFinalizadas: ReservaComStatusVisual[] = [];
  reservasRecusadas: ReservaComStatusVisual[] = [];
  
  // Lista que é efetivamente mostrada na tela
  reservasExibidas: ReservaComStatusVisual[] = [];

  filtroAtivo: 'PENDENTE' | 'APROVADA' | 'RECUSADA' = 'PENDENTE';
  isLoading = true;

  constructor(
    private authService: AuthService,
    private reservaService: ReservaAuditorioService,
    private alertaService: AlertaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.funcionarioLogado = this.authService.loggedUser;
    this.carregarReservas();
  }

  carregarReservas(): void {
    this.isLoading = true;
    if (!this.funcionarioLogado?.setor) {
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Seu usuário não está associado a um setor.' });
      this.isLoading = false;
      return;
    }
    const meuSetorId = this.funcionarioLogado.setor.idSetor;

    // Busca todos os tipos de reserva em paralelo
    forkJoin({
      pendentes: this.reservaService.buscarReservas(undefined, 'PENDENTE'),
      aprovadas: this.reservaService.buscarReservas(undefined, 'APROVADA'),
      finalizadas: this.reservaService.buscarReservas(undefined, 'FINALIZADO'),
      recusadas: this.reservaService.buscarReservas(undefined, 'RECUSADA')
    }).subscribe({
      next: ({ pendentes, aprovadas, finalizadas, recusadas }) => {
        const agora = new Date().getTime();
        
        // Processa as listas, filtrando pelo setor do funcionário
        this.reservasPendentes = pendentes.content
          .filter(r => r.auditorio.setor.idSetor === meuSetorId)
          .map(r => ({ ...r, statusVisual: 'PENDENTE' }));

        this.reservasRecusadas = recusadas.content
          .filter(r => r.auditorio.setor.idSetor === meuSetorId)
          .map(r => ({ ...r, statusVisual: 'RECUSADA' }));

        const aprovadasDoSetor = aprovadas.content
          .filter(r => r.auditorio.setor.idSetor === meuSetorId)
          .map((r): ReservaComStatusVisual => { // Dica de tipo para o TypeScript
            const dataFim = new Date(`${r.data}T${r.horaFim}`).getTime();
            return {
              ...r,
              statusVisual: dataFim < agora ? 'FINALIZADO' : 'APROVADA'
            };
          });
        
        const finalizadasDoSetor = finalizadas.content
            .filter(r => r.auditorio.setor.idSetor === meuSetorId)
            .map((r): ReservaComStatusVisual => ({ ...r, statusVisual: 'FINALIZADO' }));

        this.reservasAprovadasEFinalizadas = [...aprovadasDoSetor, ...finalizadasDoSetor];
        
        this.mudarFiltro(this.filtroAtivo);
      },
      error: (err) => console.error("Erro ao carregar reservas", err),
      complete: () => this.isLoading = false
    });
  }

  mudarFiltro(filtro: 'PENDENTE' | 'APROVADA' | 'RECUSADA'): void {
    this.filtroAtivo = filtro;
    if (filtro === 'PENDENTE') {
      this.reservasExibidas = this.reservasPendentes;
    } else if (filtro === 'APROVADA') {
      this.reservasExibidas = this.reservasAprovadasEFinalizadas;
    } else { // RECUSADA
      this.reservasExibidas = this.reservasRecusadas;
    }
  }

  aprovar(reservaParaAprovar: ReservaAuditorio): void {
    const inicioNova = new Date(`${reservaParaAprovar.data}T${reservaParaAprovar.horaInicio}`).getTime();
    const fimNova = new Date(`${reservaParaAprovar.data}T${reservaParaAprovar.horaFim}`).getTime();

    // A verificação de conflito só precisa ser feita contra reservas que ainda não finalizaram.
    const conflito = this.reservasAprovadasEFinalizadas.find(reservaExistente => {
      if (reservaExistente.statusVisual !== 'APROVADA' || reservaExistente.auditorio.idAuditorio !== reservaParaAprovar.auditorio.idAuditorio) {
          return false;
      }
      const inicioExistente = new Date(`${reservaExistente.data}T${reservaExistente.horaInicio}`).getTime();
      const fimExistente = new Date(`${reservaExistente.data}T${reservaExistente.horaFim}`).getTime();
      return (inicioNova < fimExistente) && (fimNova > inicioExistente);
    });

    if (conflito) {
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: `Conflito de horário com o evento: "${conflito.nomeEvento}".`});
      return;
    }

    this.reservaService.aprovar(reservaParaAprovar.idReserva!).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Reserva aprovada!' });
        this.carregarReservas();
      },
      error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao aprovar reserva.' })
    });
  }

  recusar(reserva: ReservaAuditorio): void {
    if (confirm(`Tem certeza que deseja recusar/cancelar a reserva para "${reserva.nomeEvento}"?`)) {
      this.reservaService.recusar(reserva.idReserva!).subscribe({
        next: () => {
          this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Reserva recusada/cancelada.' });
          this.carregarReservas();
        },
        error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao recusar reserva.' })
      });
    }
  }
}