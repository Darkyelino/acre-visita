import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaAuditorioService } from '../../../../services/reserva-auditorio/reserva-auditorio';
import { ReservaAuditorio } from '../../../../models/ReservaAuditorio';
import { RequisicaoPaginada } from '../../../../models/RequisicaoPaginada';
import { RespostaPaginada } from '../../../../models/RespostaPaginada';
import { Alerta } from '../../../../models/Alerta';
import { ETipoAlerta } from '../../../../models/ETipoAlerta';

@Component({
  selector: 'app-auditorio-confirmacao',
  standalone: true, // Adicionado para indicar que é um Standalone Component
  imports: [CommonModule, FormsModule], // Módulos necessários para o template
  templateUrl: './auditorio-confirmacao.html',
  styleUrl: './auditorio-confirmacao.css'
})
export class AuditorioConfirmacao implements OnInit {

  // === DADOS DA TELA ===
  reservas: ReservaAuditorio[] = [];
  paginacao: RespostaPaginada<ReservaAuditorio> | null = null;
  requisicaoPaginada: RequisicaoPaginada = new RequisicaoPaginada();

  // === CONTROLES DE UI ===
  isLoading: boolean = false;
  termoBusca: string = '';
  statusFiltro: 'TODOS' | 'PENDENTE' | 'APROVADA' | 'RECUSADA' = 'PENDENTE';
  alerta: Alerta | null = null;

  constructor(private reservaService: ReservaAuditorioService) {
    // Define uma ordenação padrão: da data mais antiga para a mais nova
    this.requisicaoPaginada.sort = ['data,asc'];
  }

  ngOnInit(): void {
    this.carregarReservas();
  }

  /**
   * Método principal que busca as reservas na API com os filtros e paginação atuais.
   */
  carregarReservas(): void {
    this.isLoading = true;
    this.alerta = null; // Limpa alertas antigos

    this.reservaService.buscarReservas(this.termoBusca, this.statusFiltro, this.requisicaoPaginada)
      .subscribe({
        next: (resposta) => {
          this.paginacao = resposta;
          this.reservas = resposta.content;
          this.isLoading = false;
        },
        error: (erro) => {
          console.error('Erro ao carregar reservas:', erro);
          this.mostrarAlerta(ETipoAlerta.ERRO, 'Não foi possível carregar a lista de reservas.');
          this.isLoading = false;
        }
      });
  }

  /**
   * Chamado pelos botões de filtro ou pela barra de busca.
   * Reseta a paginação e busca novamente.
   */
  aplicarFiltro(): void {
    this.requisicaoPaginada.page = 0; // Volta para a primeira página
    this.carregarReservas();
  }

  /**
   * Aprova uma reserva pendente.
   * @param id O ID da reserva a ser aprovada.
   */
  aprovar(id: number | undefined): void {
    if (!id) return;

    this.reservaService.aprovar(id).subscribe({
      next: () => {
        this.mostrarAlerta(ETipoAlerta.SUCESSO, 'Reserva aprovada com sucesso!');
        this.carregarReservas(); // Recarrega a lista para refletir a mudança
      },
      error: (erro) => {
        console.error('Erro ao aprovar reserva:', erro);
        this.mostrarAlerta(ETipoAlerta.ERRO, 'Ocorreu um erro ao aprovar a reserva.');
      }
    });
  }

  /**
   * Recusa uma reserva pendente.
   * @param id O ID da reserva a ser recusada.
   */
  recusar(id: number | undefined): void {
    if (!id) return;

    this.reservaService.recusar(id).subscribe({
      next: () => {
        this.mostrarAlerta(ETipoAlerta.SUCESSO, 'Reserva recusada com sucesso.');
        this.carregarReservas(); // Recarrega a lista para refletir a mudança
      },
      error: (erro) => {
        console.error('Erro ao recusar reserva:', erro);
        this.mostrarAlerta(ETipoAlerta.ERRO, 'Ocorreu um erro ao recusar a reserva.');
      }
    });
  }

  /**
   * Navega entre as páginas da lista.
   * @param pagina O número da página para a qual navegar.
   */
  mudarPagina(pagina: number): void {
    this.requisicaoPaginada.page = pagina;
    this.carregarReservas();
  }

  // === MÉTODOS AUXILIARES ===

  mostrarAlerta(tipo: ETipoAlerta, mensagem: string): void {
    this.alerta = { tipo, mensagem };
  }

  fecharAlerta(): void {
    this.alerta = null;
  }
}