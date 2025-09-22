import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { FilmotecaService } from '../../../services/filmoteca/filmoteca';
import { SetorService } from '../../../services/setor/setor';
import { AlertaService } from '../../../services/alerta/alerta';
import { Filmoteca } from '../../../models/Filmoteca';
import { Setor } from '../../../models/Setor';
import { RequisicaoPaginada } from '../../../models/RequisicaoPaginada';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gerencia-filmoteca',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gerencia-filmoteca.html',
  styleUrls: ['./gerencia-filmoteca.css']
})
export class GerenciaFilmoteca implements OnInit {

  todasSugestoes: Filmoteca[] = [];
  sugestoesExibidas: Filmoteca[] = [];
  setores: Setor[] = [];

  // Modelos para os filtros
  filtroTexto: string = '';
  filtroSetor: number | 'TODOS' = 'TODOS';
  
  isLoading = true;

  constructor(
    private filmotecaService: FilmotecaService,
    private setorService: SetorService,
    private alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  carregarDadosIniciais(): void {
    this.isLoading = true;
    const paginacao = new RequisicaoPaginada();
    paginacao.size = 1000; // Busca um número grande de sugestões
    paginacao.sort = ['idFilmoteca,desc']; // Ordena pelas mais recentes

    // Carrega setores e sugestões em paralelo
    forkJoin({
      sugestoes: this.filmotecaService.get(paginacao, this.filtroTexto),
      setores: this.setorService.getAll()
    }).subscribe({
      next: ({ sugestoes, setores }) => {
        this.todasSugestoes = sugestoes.content;
        this.setores = setores.content;
        this.aplicarFiltroSetor(); // Aplica o filtro de setor localmente
      },
      error: (err) => console.error("Erro ao carregar dados", err),
      complete: () => this.isLoading = false
    });
  }

  // A busca por texto requer uma nova chamada à API
  buscarPorTexto(): void {
    this.carregarDadosIniciais();
  }

  // O filtro de setor é aplicado nos dados já carregados
  aplicarFiltroSetor(): void {
    if (this.filtroSetor === 'TODOS') {
      this.sugestoesExibidas = [...this.todasSugestoes];
    } else {
      this.sugestoesExibidas = this.todasSugestoes.filter(
        s => s.setor?.idSetor === +this.filtroSetor
      );
    }
  }
  
  excluir(sugestao: Filmoteca): void {
    if (!sugestao.idFilmoteca) return;
    
    if (confirm(`Tem certeza que deseja excluir a sugestão "${sugestao.sugestao.substring(0, 30)}..."?`)) {
      this.filmotecaService.delete(sugestao.idFilmoteca).subscribe({
        next: () => {
          this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Sugestão excluída com sucesso!' });
          this.carregarDadosIniciais(); // Recarrega a lista
        },
        error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao excluir sugestão.' })
      });
    }
  }
}