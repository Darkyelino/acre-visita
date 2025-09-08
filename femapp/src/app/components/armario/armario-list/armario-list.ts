import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArmarioService } from '../../../services/armario/armario';
import { UsuarioService } from '../../../services/usuario/usuario';
import { AuthService } from '../../../services/auth/auth';
import { Armario } from '../../../models/Armario';
import { Usuario } from '../../../models/Usuario';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { EPapel } from '../../../models/EPapel';

@Component({
  selector: 'app-armario-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './armario-list.html',
  styleUrls: ['./armario-list.css']
})
export class ArmarioList implements OnInit {

  todosArmarios: Armario[] = [];
  armariosVisiveis: Armario[] = [];
  visitantes: Usuario[] = [];
  
  coordenadorLogado: Usuario | null = null;
  
  // Variáveis de estado
  mostrarModalAssociacao = false;
  modoCriacao = false;
  modoExclusao = false;

  // Dados para os modais
  armarioSelecionado: Armario | null = null;
  visitanteSelecionadoId: number | null = null;
  novoArmario: Partial<Armario> = {};

  constructor(
    private armarioService: ArmarioService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private servicoAlerta: AlertaService
  ) { }

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }
  
  get armariosDisponiveis(): Armario[] {
    return this.armariosVisiveis.filter(a => !a.usuario);
  }

  carregarDadosIniciais(): void {
    // Pega o usuário logado como 'any' para acessar as propriedades do DTO (setorId, setorNome)
    const usuario: any = this.authService.loggedUser;
    
    if (usuario && usuario.papel === EPapel.COORDENADOR && usuario.setorId) {
      
      // Reconstrói o objeto 'setor' que o componente espera, usando os dados já disponíveis
      usuario.setor = {
        idSetor: usuario.setorId,
        nomeSetor: usuario.setorNome,
        tipoSetor: '' // tipoSetor não é essencial para a lógica deste componente
      };

      this.coordenadorLogado = usuario as Usuario; // Agora o objeto está no formato correto
      
      // O restante da lógica agora funcionará como esperado
      this.carregarArmariosDoSetor();
      this.carregarVisitantes();

    } else {
      this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Acesso negado ou setor do coordenador não encontrado.' });
    }
  }

  carregarArmariosDoSetor(callback?: () => void): void {
    this.armarioService.get(undefined, { page: 0, size: 500, sort: ['numeracao,asc'] }).subscribe({
      next: resposta => {
        this.todosArmarios = resposta.content;
        if (this.coordenadorLogado && this.coordenadorLogado.setor) {
          this.armariosVisiveis = this.todosArmarios.filter(
            a => a.setor.idSetor === this.coordenadorLogado?.setor?.idSetor
          );
        }
        if (callback) {
          callback();
        }
      },
      error: () => this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao carregar armários.' })
    });
  }
  
  carregarVisitantes(): void {
    this.usuarioService.get().subscribe({
      next: (resposta) => {
        this.visitantes = resposta.content.filter(u => u.papel === EPapel.VISITANTE);
      },
      error: () => this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao carregar visitantes.' })
    });
  }

  abrirModalAssociacao(armario: Armario): void { this.armarioSelecionado = { ...armario }; this.mostrarModalAssociacao = true; }
  abrirModalCriacao(): void {
    if (!this.coordenadorLogado?.setor) return;
    this.novoArmario = { numeracao: undefined, setor: this.coordenadorLogado.setor, usuario: null  };
    this.modoCriacao = true;
  }
  abrirModalExclusao(): void { this.armarioSelecionado = null; this.modoExclusao = true; }
  fecharModais(): void {
    this.mostrarModalAssociacao = false;
    this.modoCriacao = false;
    this.modoExclusao = false;
    this.armarioSelecionado = null;
    this.visitanteSelecionadoId = null;
  }

  salvarAssociacao(): void {
    if (!this.armarioSelecionado || !this.visitanteSelecionadoId) return;
    const visitante = this.visitantes.find(v => v.id == this.visitanteSelecionadoId);
    if (!visitante) return;
    this.armarioSelecionado.usuario = visitante;
    this.armarioService.save(this.armarioSelecionado).subscribe({
      next: () => { this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Armário associado!' }); this.carregarArmariosDoSetor(); this.fecharModais(); },
      error: () => this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Falha ao associar.'})
    });
  }

  liberarArmario(): void {
    if (!this.armarioSelecionado) return;
    this.armarioSelecionado.usuario = null;
    this.armarioService.save(this.armarioSelecionado).subscribe({
      next: () => { this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Armário liberado!' }); this.carregarArmariosDoSetor(); this.fecharModais(); },
      error: () => this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Falha ao liberar.' })
    });
  }

  salvarNovoArmario(): void {
    if (!this.novoArmario.numeracao || this.novoArmario.numeracao <= 0) {
      this.servicoAlerta.enviarAlerta({ 
        tipo: ETipoAlerta.ERRO, 
        mensagem: 'A numeração do armário deve ser um número positivo.' 
      });
      return;
    }
    if (!this.novoArmario.setor) return;

    this.armarioService.save(this.novoArmario as Armario).subscribe({
      next: () => { this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Armário criado!' }); this.carregarArmariosDoSetor(); this.fecharModais(); },
      error: () => this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Falha ao criar.' })
    });
  }

  excluirArmario(armario: Armario | null): void {
    if (!armario || !armario.idArmario) return;
    if (armario.usuario) { this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Armário em uso.' }); return; }
    this.armarioService.delete(armario.idArmario).subscribe({
      next: () => { this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Armário excluído!' }); this.carregarArmariosDoSetor(); this.fecharModais(); },
      error: () => this.servicoAlerta.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Falha ao excluir.' })
    });
  }
}