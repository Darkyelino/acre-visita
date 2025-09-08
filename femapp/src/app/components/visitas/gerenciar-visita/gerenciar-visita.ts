import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { AuthService } from '../../../services/auth/auth';
import { VisitaService } from '../../../services/visita/visita';
import { Usuario } from '../../../models/Usuario';
import { Visita } from '../../../models/Visita';
import { RequisicaoPaginada } from '../../../models/RequisicaoPaginada';
import { EStatus } from '../../../models/EStatus';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-gerenciar-visita',
  standalone: true,
  imports: [CommonModule], // ✅ CORREÇÃO: RouterLink e FormsModule removidos
  templateUrl: './gerenciar-visita.html',
  styleUrls: ['./gerenciar-visita.css']
})
export class GerenciarVisita implements OnInit {

  visitasParaGerenciar: Visita[] = [];
  isLoading = true;
  funcionarioLogado: Usuario | null = null;

  constructor(
    private visitaService: VisitaService,
    private alertaService: AlertaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.funcionarioLogado = this.authService.loggedUser;
    this.carregarVisitas();
  }

  carregarVisitas(): void {
    if (!this.funcionarioLogado?.setor) {
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: "Usuário logado não tem um setor definido." });
      this.isLoading = false;
      return;
    }

    const setorId = this.funcionarioLogado.setor.idSetor;
    const statuses = [EStatus.AGENDADA, EStatus.PENDENTE];
    const paginacao = new RequisicaoPaginada();
    paginacao.size = 100;

    this.visitaService.getVisitasPorSetorEStatus(setorId, statuses, paginacao).subscribe({
      next: (resposta) => this.visitasParaGerenciar = resposta.content,
      error: (err) => console.error("Erro ao buscar visitas", err),
      complete: () => this.isLoading = false
    });
  }

  confirmar(visita: Visita): void {
    this.visitaService.atualizarStatus(visita.idVisita!, EStatus.CONFIRMADA).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Visita confirmada com sucesso!' });
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