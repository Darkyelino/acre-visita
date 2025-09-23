import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { UsuarioService } from '../../../services/usuario/usuario';
import { DocVisitanteService } from '../../../services/doc-visitante/doc-visitante';
import { Usuario } from '../../../models/Usuario';
import { DocVisitante } from '../../../models/DocVisitante';
import { RequisicaoPaginada } from '../../../models/RequisicaoPaginada';
import { EPapel } from '../../../models/EPapel';

// Interface para combinar os dados na view
interface VisitanteComDocumento extends Usuario {
  documento?: DocVisitante;
}

@Component({
  selector: 'app-gerenciar-documentos',
  templateUrl: './gerenciar-documentos.html',
  styleUrls: ['./gerenciar-documentos.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
})
export class GerenciarDocumentos implements OnInit {

  todosVisitantes: VisitanteComDocumento[] = [];
  visitantesExibidos: VisitanteComDocumento[] = [];

  filtroNome: string = '';
  isLoading = true;

  constructor(
    private usuarioService: UsuarioService,
    private docVisitanteService: DocVisitanteService,
    private router: Router // ✅ Router injetado para navegação
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.isLoading = true;
    const paginacao = new RequisicaoPaginada();
    paginacao.size = 2000;

    // Busca visitantes e documentos em paralelo para otimizar o carregamento
    forkJoin({
      usuarios: this.usuarioService.get(undefined, paginacao),
      documentos: this.docVisitanteService.get(paginacao)
    }).subscribe({
      next: ({ usuarios, documentos }) => {
        const visitantes = usuarios.content.filter(u => u.papel === EPapel.VISITANTE);
        
        // Combina os dados: para cada visitante, encontra seu documento
        this.todosVisitantes = visitantes.map(visitante => {
          const documentoEncontrado = documentos.content.find(doc => doc.usuario.id === visitante.id);
          return {
            ...visitante,
            documento: documentoEncontrado
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
      this.visitantesExibidos = this.todosVisitantes.filter(u =>
        u.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
      );
    } else {
      this.visitantesExibidos = [...this.todosVisitantes];
    }
  }

  // ✅ NOVO: Lógica de navegação
  gerenciarDocumento(visitante: VisitanteComDocumento): void {
    if (visitante.documento) {
      // Se já tem documento, navega para a rota de edição com o ID do DOCUMENTO
      this.router.navigate(['/documentos/editar', visitante.documento.idDocumento]);
    } else {
      // Se não tem, navega para o formulário de criação, passando o ID do USUÁRIO como query param
      this.router.navigate(['/documentos/form'], { queryParams: { usuarioId: visitante.id } });
    }
  }
}
