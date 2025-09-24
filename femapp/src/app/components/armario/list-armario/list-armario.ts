import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ArmarioService } from '../../../services/armario/armario';
import { SetorService } from '../../../services/setor/setor';

import { Armario } from '../../../models/Armario';
import { Setor } from '../../../models/Setor';
import { RequisicaoPaginada } from '../../../models/RequisicaoPaginada';

@Component({
  selector: 'app-list-armario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-armario.html',
  styleUrls: ['./list-armario.css']
})
export class ListArmario implements OnInit {

  todosArmarios: Armario[] = [];
  armariosExibidos: Armario[] = [];
  setores: Setor[] = [];

  // Modelos para os filtros
  filtroNumeracao: string = '';
  filtroSetor: number | 'TODOS' = 'TODOS';
  
  isLoading = true;

  constructor(
    private armarioService: ArmarioService,
    private setorService: SetorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  carregarDadosIniciais(): void {
    this.isLoading = true;
    const paginacao = new RequisicaoPaginada();
    paginacao.size = 2000; // Busca um número grande para filtrar no front-end
    paginacao.sort = ['numeracao,asc'];

    forkJoin({
      armarios: this.armarioService.get(undefined, paginacao),
      setores: this.setorService.getAll()
    }).subscribe({
      next: ({ armarios, setores }) => {
        this.todosArmarios = armarios.content;
        this.setores = setores.content;
        this.aplicarFiltros();
      },
      error: (err) => {
        console.error("Erro ao carregar dados", err);
        this.isLoading = false;
      },
      complete: () => this.isLoading = false
    });
  }

  aplicarFiltros(): void {
    let armariosFiltrados = [...this.todosArmarios];

    // 1. Filtro por NUMERAÇÃO
    if (this.filtroNumeracao.trim()) {
      armariosFiltrados = armariosFiltrados.filter(a =>
        a.numeracao.toString().includes(this.filtroNumeracao)
      );
    }

    // 2. Filtro por SETOR
    if (this.filtroSetor !== 'TODOS') {
      armariosFiltrados = armariosFiltrados.filter(a => a.setor?.idSetor === +this.filtroSetor);
    }
    
    this.armariosExibidos = armariosFiltrados;
  }
  
  editar(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/armario/editar', id]);
    }
  }
}
