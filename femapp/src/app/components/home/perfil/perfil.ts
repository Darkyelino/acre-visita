import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth';
import { EnderecoVisitanteService } from '../../../services/endereco-visitante/endereco-visitante';
import { Usuario } from '../../../models/Usuario';
import { EnderecoVisitante } from '../../../models/EnderecoVisitante';
import { EPapel } from '../../../models/EPapel';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {

  usuarioLogado: Usuario | null = null;
  meuEndereco: EnderecoVisitante | null = null;
  isLoading = true;
  EPapel = EPapel; // Para poder usar o enum no template

  constructor(
    private authService: AuthService,
    private enderecoService: EnderecoVisitanteService
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.authService.loggedUser;

    if (this.usuarioLogado) {
      // Como não temos um endpoint para buscar o endereço por usuário,
      // buscamos todos e filtramos no front-end.
      this.enderecoService.get(undefined).subscribe({
        next: (resposta) => {
          this.meuEndereco = resposta.content.find(end => end.usuario.id === this.usuarioLogado?.id) || null;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Erro ao buscar endereço", err);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }
}