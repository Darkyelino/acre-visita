import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FeedbackService } from '../../../services/feedback/feedback';
import { Feedback } from '../../../models/Feedback';
import { RequisicaoPaginada } from '../../../models/RequisicaoPaginada';

@Component({
  selector: 'app-list-feedbacks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-feedbacks.html',
  styleUrls: ['./list-feedbacks.css']
})
export class ListFeedbacks implements OnInit {

  todosFeedbacks: Feedback[] = [];
  feedbacksExibidos: Feedback[] = [];

  // Modelos para os filtros
  filtroTexto: string = '';
  filtroDataInicio: string = '';
  filtroDataFim: string = '';
  
  isLoading = true;

  constructor(
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarFeedbacks();
  }

  carregarFeedbacks(): void {
    this.isLoading = true;
    const paginacao = new RequisicaoPaginada();
    paginacao.size = 1000; // Busca um número grande de feedbacks para filtrar no front-end
    paginacao.sort = ['dataEnvio,desc']; // Ordena pelos mais recentes primeiro

    this.feedbackService.get(paginacao).subscribe({
      next: (resposta) => {
        this.todosFeedbacks = resposta.content;
        this.aplicarFiltros();
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar feedbacks", err);
        this.isLoading = false;
      }
    });
  }

  aplicarFiltros(): void {
    let feedbacksFiltrados = [...this.todosFeedbacks];

    // 1. Filtro por TEXTO
    if (this.filtroTexto.trim()) {
      feedbacksFiltrados = feedbacksFiltrados.filter(f =>
        f.texto.toLowerCase().includes(this.filtroTexto.toLowerCase())
      );
    }

    // 2. Filtro por DATA DE INÍCIO
    if (this.filtroDataInicio) {
      const dataInicio = new Date(this.filtroDataInicio + 'T00:00:00');
      feedbacksFiltrados = feedbacksFiltrados.filter(f => 
        new Date(f.dataEnvio) >= dataInicio
      );
    }

    // 3. Filtro por DATA DE FIM
    if (this.filtroDataFim) {
      const dataFim = new Date(this.filtroDataFim + 'T23:59:59');
      feedbacksFiltrados = feedbacksFiltrados.filter(f => 
        new Date(f.dataEnvio) <= dataFim
      );
    }
    
    this.feedbacksExibidos = feedbacksFiltrados;
  }
}