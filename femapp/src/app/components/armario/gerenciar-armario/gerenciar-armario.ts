import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ArmarioService } from '../../../services/armario/armario';
import { UsuarioService } from '../../../services/usuario/usuario';
import { VisitaService } from '../../../services/visita/visita';
import { AuthService } from '../../../services/auth/auth';
import { AlertaService } from '../../../services/alerta/alerta';
import { Armario } from '../../../models/Armario';
import { Usuario } from '../../../models/Usuario';
import { EPapel } from '../../../models/EPapel';
import { EStatus } from '../../../models/EStatus';
import { RequisicaoPaginada } from '../../../models/RequisicaoPaginada';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-gerenciar-armario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gerenciar-armario.html',
  styleUrls: ['./gerenciar-armario.css']
})
export class GerenciarArmario implements OnInit {

  funcionarioLogado: Usuario | null = null;
  armariosDoSetor: Armario[] = [];
  armariosExibidos: Armario[] = [];
  
  // Para o modal de seleção
  todosVisitantes: Usuario[] = [];
  visitantesPresentes: Usuario[] = [];
  visitantesFiltrados: Usuario[] = [];
  
  isLoading = true;
  isModalOpen = false;
  armarioSelecionado: Armario | null = null;
  filtroNumero: string = '';
  filtroNomeVisitante: string = '';

  constructor(
    private armarioService: ArmarioService,
    private usuarioService: UsuarioService,
    private visitaService: VisitaService,
    private authService: AuthService,
    private alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    this.funcionarioLogado = this.authService.loggedUser;
    this.carregarDados();
  }

  carregarDados(): void {
    this.isLoading = true;
    if (!this.funcionarioLogado?.setor) {
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Seu usuário não está associado a um setor.' });
      this.isLoading = false;
      return;
    }

    const setorId = this.funcionarioLogado.setor.idSetor;
    const paginacao = new RequisicaoPaginada();
    paginacao.size = 2000; // Busca um número grande para evitar paginação

    forkJoin({
      armarios: this.armarioService.get(undefined, paginacao),
      usuarios: this.usuarioService.get(undefined, paginacao),
      visitas: this.visitaService.getVisitasPorSetorEStatus(setorId, [EStatus.CONFIRMADA], paginacao)
    }).subscribe({
      next: ({ armarios, usuarios, visitas }) => {
        // Filtra armários do setor do funcionário e ordena
        this.armariosDoSetor = armarios.content
          .filter(a => a.setor.idSetor === setorId)
          .sort((a, b) => a.numeracao - b.numeracao);
        
        // Separa todos os usuários que são visitantes
        this.todosVisitantes = usuarios.content.filter(u => u.papel === EPapel.VISITANTE);
        
        // Pega os IDs dos usuários com visita confirmada hoje no setor
        const idsVisitantesPresentes = new Set(visitas.content.map(v => v.usuario.id));
        this.visitantesPresentes = this.todosVisitantes.filter(u => idsVisitantesPresentes.has(u.id));

        this.aplicarFiltroNumero();
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar dados", err);
        this.isLoading = false;
      }
    });
  }

  aplicarFiltroNumero(): void {
    if (this.filtroNumero.trim()) {
      this.armariosExibidos = this.armariosDoSetor.filter(a =>
        a.numeracao.toString().includes(this.filtroNumero)
      );
    } else {
      this.armariosExibidos = [...this.armariosDoSetor];
    }
  }

  abrirModalAlocacao(armario: Armario): void {
    this.armarioSelecionado = armario;
    this.filtroNomeVisitante = ''; // Reseta o filtro do modal
    this.aplicarFiltroVisitantes(); // Aplica o filtro (sem termo, mostra todos)
    this.isModalOpen = true;
  }

  fecharModal(): void {
    this.isModalOpen = false;
    this.armarioSelecionado = null;
  }

  aplicarFiltroVisitantes(): void {
    if (this.filtroNomeVisitante.trim()) {
      const termo = this.filtroNomeVisitante.toLowerCase();
      this.visitantesFiltrados = this.todosVisitantes.filter(v =>
        v.nome.toLowerCase().includes(termo)
      );
    } else {
      // Se não há filtro, mostra os presentes primeiro, depois o resto
      const outrosVisitantes = this.todosVisitantes.filter(v => 
        !this.visitantesPresentes.some(vp => vp.id === v.id)
      );
      this.visitantesFiltrados = [...this.visitantesPresentes, ...outrosVisitantes];
    }
  }

  /**
   * ✅ NOVO MÉTODO:
   * Verifica se um visitante está na lista de presentes no local.
   * @param visitante O usuário a ser verificado.
   * @returns Verdadeiro se o visitante estiver presente, falso caso contrário.
   */
  isVisitantePresente(visitante: Usuario): boolean {
    if (!visitante || typeof visitante.id === 'undefined') {
      return false;
    }
    return this.visitantesPresentes.some(vp => vp.id === visitante.id);
  }

  alocar(visitante: Usuario): void {
    if (!this.armarioSelecionado) return;

    this.armarioSelecionado.usuario = visitante;
    this.armarioService.save(this.armarioSelecionado).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: `Armário ${this.armarioSelecionado?.numeracao} alocado para ${visitante.nome}.`});
        this.fecharModal();
        this.carregarDados(); // Recarrega para refletir a mudança
      },
      error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao alocar armário.' })
    });
  }

  liberar(armario: Armario): void {
    if (confirm(`Tem certeza que deseja liberar o armário ${armario.numeracao}, atualmente com ${armario.usuario?.nome}?`)) {
      armario.usuario = null; // Remove o usuário
      this.armarioService.save(armario).subscribe({
        next: () => {
          this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: `Armário ${armario.numeracao} liberado.`});
          this.carregarDados();
        },
        error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao liberar armário.' })
      });
    }
  }
}
