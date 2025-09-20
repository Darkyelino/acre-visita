import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaService } from '../../../services/alerta/alerta';
import { AuthService } from '../../../services/auth/auth';
import { VisitaService } from '../../../services/visita/visita';
import { Usuario } from '../../../models/Usuario';
import { Visita } from '../../../models/Visita';
import { RequisicaoPaginada } from '../../../models/RequisicaoPaginada';
import { EStatus } from '../../../models/EStatus';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { RouterLink } from '@angular/router';

// Tipo para controlar a aba ativa
type FiltroVisita = 'PARA_CONFIRMAR' | 'EM_ANDAMENTO' | 'HISTORICO';

@Component({
  selector: 'app-gerenciar-visita',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gerenciar-visita.html',
  styleUrls: ['./gerenciar-visita.css']
})
export class GerenciarVisita implements OnInit {

  // Listas separadas para cada aba
  visitasParaConfirmar: Visita[] = [];
  visitasEmAndamento: Visita[] = [];
  visitasHistorico: Visita[] = [];
  
  visitasExibidas: Visita[] = [];

  filtroAtivo: FiltroVisita = 'PARA_CONFIRMAR';
  isLoading = true;
  funcionarioLogado: Usuario | null = null;

  constructor(
    private visitaService: VisitaService,
    private alertaService: AlertaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.funcionarioLogado = this.authService.loggedUser;
    this.carregarVisitas();
  }

  carregarVisitas(): void {
    this.isLoading = true;
    if (!this.funcionarioLogado?.setor) {
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: "Usuário logado não tem um setor definido." });
      this.isLoading = false;
      return;
    }

    const setorId = this.funcionarioLogado.setor.idSetor;
    const paginacao = new RequisicaoPaginada();
    paginacao.size = 1000;
    
    // Busca todos os status relevantes de uma vez
    const statusesParaBuscar = [EStatus.AGENDADA, EStatus.PENDENTE, EStatus.CONFIRMADA, EStatus.CANCELADA];

    this.visitaService.getVisitasPorSetorEStatus(setorId, statusesParaBuscar, paginacao).subscribe({
      next: (resposta) => {
        const todasAsVisitas = resposta.content;
        
        // Separa as visitas nas listas corretas
        this.visitasParaConfirmar = todasAsVisitas
          .filter(v => v.status === EStatus.PENDENTE || v.status === EStatus.AGENDADA)
          .sort((a,b) => new Date(a.dataHoraAgendamento!).getTime() - new Date(b.dataHoraAgendamento!).getTime());

        this.visitasEmAndamento = todasAsVisitas.filter(v => v.status === EStatus.CONFIRMADA);
        this.visitasHistorico = todasAsVisitas.filter(v => v.status === EStatus.CANCELADA);

        this.mudarFiltro(this.filtroAtivo);
      },
      error: (err) => console.error("Erro ao buscar visitas", err),
      complete: () => this.isLoading = false
    });
  }
  
  mudarFiltro(filtro: FiltroVisita): void {
    this.filtroAtivo = filtro;
    switch (filtro) {
      case 'PARA_CONFIRMAR':
        this.visitasExibidas = this.visitasParaConfirmar;
        break;
      case 'EM_ANDAMENTO':
        this.visitasExibidas = this.visitasEmAndamento;
        break;
      case 'HISTORICO':
        this.visitasExibidas = this.visitasHistorico;
        break;
    }
  }

  confirmar(visita: Visita): void {
    this.visitaService.atualizarStatus(visita.idVisita!, EStatus.CONFIRMADA).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Entrada do visitante confirmada!' });
        this.carregarVisitas();
      },
      error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao confirmar visita.' })
    });
  }

  cancelar(visita: Visita): void {
    if (confirm(`Tem certeza que deseja cancelar a visita de "${visita.usuario.nome}"?`)) {
      this.visitaService.atualizarStatus(visita.idVisita!, EStatus.CANCELADA).subscribe({
        next: () => {
          this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Visita cancelada.' });
          this.carregarVisitas();
        },
        error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao cancelar visita.' })
      });
    }
  }
}