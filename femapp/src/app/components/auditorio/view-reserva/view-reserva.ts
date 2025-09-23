import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth';
import { ReservaAuditorioService } from '../../../services/reserva-auditorio/reserva-auditorio';
import { Usuario } from '../../../models/Usuario';
import { ReservaAuditorio } from '../../../models/ReservaAuditorio';

@Component({
  selector: 'app-view-reserva',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './view-reserva.html',
  styleUrls: ['./view-reserva.css']
})
export class ViewReserva implements OnInit {

  usuarioLogado: Usuario | null = null;
  minhasReservas: ReservaAuditorio[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private reservaService: ReservaAuditorioService
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.authService.loggedUser;
    this.carregarMinhasReservas();
  }

  carregarMinhasReservas(): void {
    if (!this.usuarioLogado) {
      this.isLoading = false;
      return;
    }
    this.isLoading = true;

    // Busca todas as reservas e filtra pelo ID do usuário logado
    this.reservaService.buscarReservas().subscribe({
      next: (resposta) => {
        this.minhasReservas = resposta.content
          .filter(reserva => reserva.usuario.id === this.usuarioLogado?.id)
          .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()); // Ordena pelas mais recentes
      },
      error: (err) => {
        console.error("Erro ao carregar reservas:", err);
        this.isLoading = false;
      },
      complete: () => this.isLoading = false
    });
  }

  getStatusClass(status: string): string {
    return `badge-${status.toLowerCase()}`;
  }
}
