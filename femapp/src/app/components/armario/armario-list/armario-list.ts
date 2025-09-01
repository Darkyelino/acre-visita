import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArmarioService } from '../../../services/armario/armario.service';
import { VisitanteService } from '../../../services/visitante/visitante';
import { CoordenadorService } from '../../../services/coordenador/coordenador.service';
import { Armario } from '../../../models/Armario';
import { Visitante } from '../../../models/Visitante';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { Coordenador } from '../../../models/Coordenador';

@Component({
  selector: 'app-armario-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './armario-list.html',
  styleUrls: ['./armario-list.css']
})
export class ArmarioListComponent implements OnInit {

  todosArmarios: Armario[] = []; 
  armariosVisiveis: Armario[] = []; 
  
  coordenadores: Coordenador[] = [];
  coordenadorSelecionado: Coordenador | null = null;
  
  visitantes: Visitante[] = [];
  
  mostrarModalAssociacao = false;
  modoCriacao = false;
  modoExclusao = false;

  armarioSelecionado: Armario | null = null;
  visitanteIdSelecionado: number | null = null;
  novoArmario: Partial<Armario> = {};

  constructor(
    private armarioService: ArmarioService,
    private visitanteService: VisitanteService,
    private coordenadorService: CoordenadorService,
    private servicoAlerta: AlertaService
  ) { }

  ngOnInit(): void {
    this.carregarTodosArmarios();
    this.carregarVisitantes();
    this.carregarCoordenadores();
  }
  
  get armariosDisponiveis(): Armario[] {
    return this.armariosVisiveis.filter(a => !a.visitante);
  }

  carregarTodosArmarios(callback?: () => void): void {
    this.armarioService.get(undefined, { page: 0, size: 200, sort: ['numeracao,asc'] }).subscribe({
      next: resposta => {
        this.todosArmarios = resposta.content;
        if (callback) {
          callback();
        }
      },
      error: () => this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao carregar armários.' })
    });
  }
  
  carregarCoordenadores(): void {
    this.coordenadorService.getCoordenadores().subscribe({
      next: (resposta) => this.coordenadores = resposta.content,
      error: () => this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao carregar coordenadores.' })
    });
  }
  
  carregarVisitantes(): void {
    this.visitanteService.get(undefined, { page: 0, size: 200, sort: ['nomeVisitante,asc'] }).subscribe({
        next: resposta => this.visitantes = resposta.content,
        error: () => this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao carregar visitantes.' })
    });
  }

  onCoordenadorSelect(): void {
    if (this.coordenadorSelecionado) {
      this.armariosVisiveis = this.todosArmarios.filter(
        a => a.setor.idSetor === this.coordenadorSelecionado?.coordSetorResponsavel.idSetor
      );
    } else {
      this.armariosVisiveis = [];
    }
  }

  abrirModalAssociacao(armario: Armario): void {
    this.armarioSelecionado = { ...armario };
    this.mostrarModalAssociacao = true;
  }
  
  abrirModalCriacao(): void {
    if (!this.coordenadorSelecionado) {
      this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Selecione um coordenador primeiro.' });
      return;
    }
    this.novoArmario = { 
      numeracao: undefined, 
      setor: this.coordenadorSelecionado.coordSetorResponsavel,
      visitante: null 
    };
    this.modoCriacao = true;
  }
  
  abrirModalExclusao(): void {
    if (!this.coordenadorSelecionado) {
      this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Selecione um coordenador primeiro.' });
      return;
    }
    this.armarioSelecionado = null;
    this.modoExclusao = true;
  }

  fecharModais(): void {
    this.mostrarModalAssociacao = false;
    this.modoCriacao = false;
    this.modoExclusao = false;
    this.armarioSelecionado = null;
    this.visitanteIdSelecionado = null;
  }

  salvarAssociacao(): void {
    if (!this.armarioSelecionado || this.visitanteIdSelecionado === null) return;
    const visitanteSelecionado = this.visitantes.find(v => v.idVisitante == this.visitanteIdSelecionado);
    if (!visitanteSelecionado) return;
    this.armarioSelecionado.visitante = visitanteSelecionado;
    this.armarioService.save(this.armarioSelecionado).subscribe({
      next: () => {
        this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Armário associado com sucesso!' });
        this.carregarTodosArmarios(() => this.onCoordenadorSelect());
        this.fecharModais();
      },
      error: (err) => this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Falha ao associar armário: ' + err.message })
    });
  }

  liberarArmario(): void {
    if (!this.armarioSelecionado) return;
    this.armarioSelecionado.visitante = null;
    this.armarioService.save(this.armarioSelecionado).subscribe({
      next: () => {
        this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Armário liberado com sucesso!' });
        this.carregarTodosArmarios(() => this.onCoordenadorSelect());
        this.fecharModais();
      },
      error: (err) => this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Falha ao liberar armário: ' + err.message })
    });
  }

  salvarNovoArmario(): void {
    if (!this.novoArmario.numeracao || !this.novoArmario.setor) {
      this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Preencha a numeração e o setor.' });
      return;
    }
    this.armarioService.save(this.novoArmario as Armario).subscribe({
      next: () => {
        this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Armário criado com sucesso!' });
        this.carregarTodosArmarios(() => this.onCoordenadorSelect());
        this.fecharModais();
      },
      error: (err) => this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Falha ao criar armário: ' + err.message })
    });
  }

  excluirArmario(armario: Armario | null): void {
    if (!armario || armario.idArmario === undefined) return;

    if(armario.visitante) {
      this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Não é possível excluir um armário que está em uso.' });
      return;
    }

    this.armarioService.delete(armario.idArmario).subscribe({
      next: () => {
        this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Armário excluído com sucesso!' });
        this.carregarTodosArmarios(() => this.onCoordenadorSelect());
        this.fecharModais();
      },
      error: (err) => this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Falha ao excluir armário: ' + err.message })
    });
  }
}