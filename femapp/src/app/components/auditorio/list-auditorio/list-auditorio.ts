import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuditorioService } from '../../../services/auditorio/auditorio';
import { SetorService } from '../../../services/setor/setor';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { Auditorio } from '../../../models/Auditorio';
import { Setor } from '../../../models/Setor';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-list-auditorio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-auditorio.html',
  styleUrls: ['./list-auditorio.css']
})
export class ListAuditorio implements OnInit {

  todosAuditorios: Auditorio[] = [];
  auditoriosExibidos: Auditorio[] = [];
  setores: Setor[] = [];

  // Modelos para os filtros
  filtroNome: string = '';
  filtroDisponibilidade: 'TODOS' | 'true' | 'false' = 'TODOS';
  filtroSetor: number | 'TODOS' = 'TODOS';
  
  isLoading = false;

  constructor(
    private auditorioService: AuditorioService,
    private setorService: SetorService,
    private alertaService: AlertaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  carregarDadosIniciais(): void {
    this.isLoading = true;
    this.setorService.getAll().subscribe(res => this.setores = res.content);
    
    // Usamos o 'get' sem paginação para buscar todos os auditórios de uma vez
    this.auditorioService.get().subscribe({
      next: (resposta) => {
        this.todosAuditorios = resposta.content;
        this.aplicarFiltros(); // Aplica os filtros iniciais (mostra tudo)
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  aplicarFiltros(): void {
    let auditoriosFiltrados = [...this.todosAuditorios];

    // 1. Filtro por NOME
    if (this.filtroNome.trim()) {
      auditoriosFiltrados = auditoriosFiltrados.filter(a =>
        a.nomeAuditorio.toLowerCase().includes(this.filtroNome.toLowerCase())
      );
    }

    // 2. Filtro por DISPONIBILIDADE
    if (this.filtroDisponibilidade !== 'TODOS') {
      const isDisponivel = this.filtroDisponibilidade === 'true';
      auditoriosFiltrados = auditoriosFiltrados.filter(a => a.disponibilidade === isDisponivel);
    }
    
    // 3. Filtro por SETOR
    if (this.filtroSetor !== 'TODOS') {
      auditoriosFiltrados = auditoriosFiltrados.filter(a => a.setor?.idSetor === +this.filtroSetor);
    }
    
    this.auditoriosExibidos = auditoriosFiltrados;
  }
  
  editar(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/admin/auditorio/editar', id]);
    }
  }

  excluir(id: number | undefined, nome: string): void {
    if (!id) return;
    
    if (confirm(`Tem certeza que deseja excluir o auditório "${nome}"?`)) {
      this.auditorioService.delete(id).subscribe({
        next: () => {
          this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Auditório excluído com sucesso!' });
          this.carregarDadosIniciais(); // Recarrega a lista
        },
        error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao excluir auditório.' })
      });
    }
  }
}