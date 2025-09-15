import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs'
import { AlertaService } from '../../../services/alerta/alerta.service';
import { AuthService } from '../../../services/auth/auth';
import { VisitaService } from '../../../services/visita/visita';
import { FeedbackService } from '../../../services/feedback/feedback';
import { Usuario } from '../../../models/Usuario';
import { Visita } from '../../../models/Visita';
import { Feedback } from '../../../models/Feedback';
import { RequisicaoPaginada } from '../../../models/RequisicaoPaginada';
import { EStatus } from '../../../models/EStatus';

interface VisitaComFeedback extends Visita {
  possuiFeedback?: boolean;
  feedbackId?: number;
}

@Component({
  selector: 'app-minhas-visitas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './minhas-visitas.html',
  styleUrls: ['./minhas-visitas.css']
})
export class MinhasVisitas implements OnInit {

  usuarioLogado: Usuario | null = null;
  todasAsMinhasVisitas: VisitaComFeedback[] = [];
  visitasExibidas: VisitaComFeedback[] = [];
  
  filtroStatus: EStatus | 'TODAS' = 'TODAS';
  isLoading = true;
  
  statusDisponiveis = [
    { nome: 'Agendadas', valor: EStatus.AGENDADA },
    { nome: 'Confirmadas', valor: EStatus.CONFIRMADA },
    { nome: 'Canceladas', valor: EStatus.CANCELADA }
  ];

  constructor(
    private authService: AuthService,
    private visitaService: VisitaService,
    private feedbackService: FeedbackService,
    private router: Router,
    private alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.authService.loggedUser;
    this.carregarMinhasVisitas();
  }

  carregarMinhasVisitas(): void {
    if (!this.usuarioLogado) {
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    
    const paginacao = new RequisicaoPaginada();
    paginacao.size = 1000;

    forkJoin({
      visitas: this.visitaService.get(paginacao),
      feedbacks: this.feedbackService.get(paginacao)
    }).subscribe({
      next: ({ visitas, feedbacks }) => {
        // Filtra para manter apenas os do usuário logado
        const minhasVisitas = visitas.content.filter(v => v.usuario.id === this.usuarioLogado?.id);
        const meusFeedbacks = feedbacks.content.filter(f => f.usuario.id === this.usuarioLogado?.id);

        // ✅ Lógica para cruzar os dados
        this.todasAsMinhasVisitas = minhasVisitas.map(visita => {
          const feedbackCorrespondente = meusFeedbacks.find(f => f.visita?.idVisita === visita.idVisita);
          return {
            ...visita,
            possuiFeedback: !!feedbackCorrespondente,
            feedbackId: feedbackCorrespondente?.idFeedback
          };
        }).sort((a, b) => { // Ordena
            const dataA = new Date(a.dataHoraAgendamento || a.dataHoraEntrada!).getTime();
            const dataB = new Date(b.dataHoraAgendamento || b.dataHoraEntrada!).getTime();
            return dataB - dataA;
        });
        
        this.aplicarFiltros();
      },
      error: (err) => console.error("Erro ao carregar dados:", err),
      complete: () => this.isLoading = false
    });
  }

  aplicarFiltros(): void {
    if (this.filtroStatus === 'TODAS') {
      this.visitasExibidas = [...this.todasAsMinhasVisitas];
    } else {
      this.visitasExibidas = this.todasAsMinhasVisitas.filter(v => v.status === this.filtroStatus);
    }
  }

  /**
   * Navega para a página correta dependendo se a visita já tem feedback ou não.
   */
  gerenciarFeedback(visita: VisitaComFeedback): void {
    if (visita.possuiFeedback) {
      // Se já tem feedback, vai para a página de visualização
      this.router.navigate(['/feedback/visualizar', visita.feedbackId]);
    } else {
      // Se não, vai para a página de criação
      this.router.navigate(['/feedback/fazer'], { queryParams: { visitaId: visita.idVisita } });
    }
  }
}