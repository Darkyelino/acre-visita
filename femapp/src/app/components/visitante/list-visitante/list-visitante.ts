import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario';
import { AlertaService } from '../../../services/alerta/alerta';
import { Usuario } from '../../../models/Usuario';
import { RequisicaoPaginada } from '../../../models/RequisicaoPaginada';
import { EPapel } from '../../../models/EPapel';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-list-visitante',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-visitante.html',
  styleUrls: ['./list-visitante.css']
})
export class ListVisitante implements OnInit {

  todosVisitantes: Usuario[] = [];
  visitantesExibidos: Usuario[] = [];
  
  filtroNome: string = '';
  filtroEmail: string = '';
  filtroTelefone: string = '';
  
  isLoading = false;

  constructor(
    private usuarioService: UsuarioService,
    private alertaService: AlertaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarVisitantes();
  }

  // Busca na API (apenas por nome)
  carregarVisitantes(): void {
    this.isLoading = true;
    const paginacao = new RequisicaoPaginada();
    paginacao.size = 1000;
    paginacao.sort = ['nome,asc'];

    // Usa o filtroNome para a busca na API
    this.usuarioService.get(this.filtroNome, paginacao).subscribe({
      next: (resposta) => {
        this.todosVisitantes = resposta.content.filter(u => u.papel === EPapel.VISITANTE);
        this.aplicarFiltrosLocais(); // Aplica os outros filtros
      },
      error: (err) => console.error("Erro ao carregar visitantes", err),
      complete: () => this.isLoading = false
    });
  }

  // Filtra localmente os resultados que vieram da API
  aplicarFiltrosLocais(): void {
    let filtrados = [...this.todosVisitantes];

    if (this.filtroEmail.trim()) {
      filtrados = filtrados.filter(u =>
        u.email.toLowerCase().includes(this.filtroEmail.toLowerCase())
      );
    }

    if (this.filtroTelefone.trim()) {
      const telefoneNumerico = this.filtroTelefone.replace(/\D/g, '');
      filtrados = filtrados.filter(u =>
        u.telefone?.replace(/\D/g, '').includes(telefoneNumerico)
      );
    }
    
    this.visitantesExibidos = filtrados;
  }
  
  editar(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/visitante/editar', id]);
    }
  }

  excluir(id: number | undefined, nome: string): void {
    if (!id) return;
    
    if (confirm(`Tem certeza que deseja excluir o visitante "${nome}"?`)) {
      this.usuarioService.delete(id).subscribe({
        next: () => {
          this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Visitante excluído com sucesso!' });
          this.carregarVisitantes();
        },
        error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao excluir visitante.' })
      });
    }
  }
}