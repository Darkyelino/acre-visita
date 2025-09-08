import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario';
import { SetorService } from '../../../services/setor/setor';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { Usuario } from '../../../models/Usuario';
import { Setor } from '../../../models/Setor';
import { EPapel } from '../../../models/EPapel';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-list-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-funcionario.html',
  styleUrls: ['./list-funcionario.css']
})
export class ListFuncionario implements OnInit {

  todosFuncionarios: Usuario[] = [];
  funcionariosExibidos: Usuario[] = [];
  setores: Setor[] = [];

  filtroNome: string = '';
  filtroPapel: EPapel | 'TODOS' = 'TODOS';
  filtroSetor: number | 'TODOS' = 'TODOS';
  
  isLoading = false;

  papeisDisponiveis = [
    { nome: 'Atendente', valor: EPapel.ATENDENTE },
    { nome: 'Coordenador', valor: EPapel.COORDENADOR }
  ];

  constructor(
    private usuarioService: UsuarioService,
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
    
    this.usuarioService.get(undefined, { page: 0, size: 1000, sort: ['nome'] }).subscribe({
      next: (resposta) => {
        this.todosFuncionarios = resposta.content.filter(u => 
            u.papel === EPapel.ATENDENTE || u.papel === EPapel.COORDENADOR
        );
        this.aplicarFiltros();
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  aplicarFiltros(): void {
    let funcionariosFiltrados = [...this.todosFuncionarios];

    if (this.filtroNome.trim()) {
      funcionariosFiltrados = funcionariosFiltrados.filter(u =>
        u.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
      );
    }

    if (this.filtroPapel !== 'TODOS') {
      funcionariosFiltrados = funcionariosFiltrados.filter(u => u.papel === this.filtroPapel);
    }
    
    if (this.filtroSetor !== 'TODOS') {
      // ✅ CORREÇÃO: Adicionado o '+' para converter a string do filtro para número
      funcionariosFiltrados = funcionariosFiltrados.filter(u => u.setor?.idSetor === +this.filtroSetor);
    }
    
    this.funcionariosExibidos = funcionariosFiltrados;
  }
  
  editar(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/editar-funcionario', id]);
    }
  }

  excluir(id: number | undefined, nome: string): void {
    if (!id) return;
    
    if (confirm(`Tem certeza que deseja excluir o funcionário "${nome}"?`)) {
      this.usuarioService.delete(id).subscribe({
        next: () => {
          this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Funcionário excluído com sucesso!' });
          this.carregarDadosIniciais();
        },
        error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao excluir funcionário.' })
      });
    }
  }
}