import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SetorService } from '../../../services/setor/setor';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { Setor } from '../../../models/Setor';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-list-setor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-setor.html',
  styleUrls: ['./list-setor.css']
})
export class ListSetor implements OnInit {

  todosSetores: Setor[] = [];
  setoresExibidos: Setor[] = [];

  // Modelos para os filtros
  filtroNome: string = '';
  filtroTipo: string | 'TODOS' = 'TODOS';
  
  isLoading = false;

  constructor(
    private setorService: SetorService,
    private alertaService: AlertaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarSetores();
  }

  carregarSetores(): void {
    this.isLoading = true;
    this.setorService.getAll().subscribe({
      next: (resposta) => {
        this.todosSetores = resposta.content;
        this.aplicarFiltros(); // Exibe a lista completa inicialmente
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar setores", err);
        this.isLoading = false;
      }
    });
  }

  aplicarFiltros(): void {
    let setoresFiltrados = [...this.todosSetores];

    // 1. Filtro por NOME
    if (this.filtroNome.trim()) {
      setoresFiltrados = setoresFiltrados.filter(s =>
        s.nomeSetor.toLowerCase().includes(this.filtroNome.toLowerCase())
      );
    }

    // 2. Filtro por TIPO
    if (this.filtroTipo !== 'TODOS') {
      setoresFiltrados = setoresFiltrados.filter(s => s.tipoSetor === this.filtroTipo);
    }
    
    this.setoresExibidos = setoresFiltrados;
  }
  
  editar(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/setor/editar', id]);
    }
  }

  excluir(id: number | undefined, nome: string): void {
    if (!id) return;
    
    if (confirm(`Tem certeza que deseja excluir o setor "${nome}"?`)) {
      this.setorService.delete(id).subscribe({
        next: () => {
          this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Setor excluído com sucesso!' });
          this.carregarSetores(); // Recarrega a lista após a exclusão
        },
        error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao excluir setor.' })
      });
    }
  }
}