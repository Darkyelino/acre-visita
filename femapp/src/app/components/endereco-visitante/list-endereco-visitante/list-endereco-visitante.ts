import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UsuarioService } from '../../../services/usuario/usuario';
import { EnderecoVisitanteService } from '../../../services/endereco-visitante/endereco-visitante';
import { Usuario } from '../../../models/Usuario';
import { EnderecoVisitante } from '../../../models/EnderecoVisitante';
import { EPapel } from '../../../models/EPapel';

// Interface interna para combinar os dados
interface VisitanteComEndereco extends Usuario {
  endereco?: EnderecoVisitante;
}

@Component({
  selector: 'app-list-endereco-visitante',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-endereco-visitante.html',
  styleUrls: ['./list-endereco-visitante.css']
})
export class ListEnderecoVisitante implements OnInit {

  todosVisitantes: VisitanteComEndereco[] = [];
  visitantesExibidos: VisitanteComEndereco[] = [];
  filtroNome: string = '';
  isLoading = true;

  constructor(
    private usuarioService: UsuarioService,
    private enderecoService: EnderecoVisitanteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.isLoading = true;
    
    // Busca todos os usuários e todos os endereços em paralelo
    forkJoin({
      usuarios: this.usuarioService.get(),
      enderecos: this.enderecoService.get()
    }).subscribe({
      next: ({ usuarios, enderecos }) => {
        const listaDeEnderecos = enderecos.content;
        
        // 1. Filtra para pegar apenas os usuários que são VISITANTES
        const visitantes = usuarios.content.filter(u => u.papel === EPapel.VISITANTE);
        
        // 2. "Junta" os dados: para cada visitante, encontra seu endereço correspondente
        this.todosVisitantes = visitantes.map(visitante => {
          const enderecoEncontrado = listaDeEnderecos.find(end => end.usuario.id === visitante.id);
          return {
            ...visitante,
            endereco: enderecoEncontrado
          };
        });

        this.aplicarFiltros();
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar dados", err);
        this.isLoading = false;
      }
    });
  }

  aplicarFiltros(): void {
    if (this.filtroNome.trim()) {
      this.visitantesExibidos = this.todosVisitantes.filter(v =>
        v.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
      );
    } else {
      this.visitantesExibidos = [...this.todosVisitantes];
    }
  }
  
  gerenciarEndereco(visitante: VisitanteComEndereco): void {
    if (visitante.endereco) {
      // Se já tem endereço, navega para a rota de edição com o ID do ENDEREÇO
      this.router.navigate(['/endereco/editar', visitante.endereco.idEnderecoVisitante]);
    } else {
      // Se não tem, navega para o formulário de criação, passando o ID do USUÁRIO
      this.router.navigate(['/endereco/form'], { queryParams: { usuarioId: visitante.id } });
    }
  }
}