import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario/usuario';
import { DocVisitanteService } from '../../../services/doc-visitante/doc-visitante';
import { AlertaService } from '../../../services/alerta/alerta';
import { Usuario } from '../../../models/Usuario';
import { DocVisitante } from '../../../models/DocVisitante';
import { RequisicaoPaginada } from '../../../models/RequisicaoPaginada';
import { EPapel } from '../../../models/EPapel';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gerenciar-documentos',
  templateUrl: './gerenciar-documentos.html',
  styleUrl: './gerenciar-documentos.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
})
export class GerenciarDocumentos implements OnInit {

  todosVisitantes: Usuario[] = [];
  visitantesExibidos: Usuario[] = [];

  filtroNome: string = '';
  isLoading = true;
  isModalVisible = false;

  visitanteSelecionado: Usuario | null = null;
  documentoAtual: DocVisitante | null = null;

  documentoForm = new FormGroup({
    tipo: new FormControl<string | null>('CPF', Validators.required),
    numero: new FormControl<string | null>('', Validators.required),
  });

  constructor(
    private usuarioService: UsuarioService,
    private docVisitanteService: DocVisitanteService,
    private alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    this.carregarVisitantes();
  }

  carregarVisitantes(): void {
    this.isLoading = true;
    const paginacao = new RequisicaoPaginada();
    paginacao.size = 1000; // Busca um grande número de usuários

    this.usuarioService.get(undefined, paginacao).subscribe({
      next: (resposta) => {
        // Filtra para manter apenas os usuários com o papel de VISITANTE
        this.todosVisitantes = resposta.content.filter(u => u.papel === EPapel.VISITANTE);
        this.aplicarFiltros();
      },
      error: (err) => console.error("Erro ao carregar visitantes", err),
      complete: () => this.isLoading = false
    });
  }

  aplicarFiltros(): void {
    let filtrados = [...this.todosVisitantes];

    if (this.filtroNome.trim()) {
      filtrados = filtrados.filter(u =>
        u.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
      );
    }
    
    this.visitantesExibidos = filtrados;
  }

  abrirModal(visitante: Usuario): void {
    this.visitanteSelecionado = visitante;
    this.isLoading = true;
    
    this.docVisitanteService.getByUsuarioId(visitante.id!).subscribe(doc => {
      if (doc) {
        this.documentoAtual = doc;
        this.documentoForm.patchValue(doc);
      } else {
        this.documentoAtual = null;
        this.documentoForm.reset({ tipo: 'CPF' });
      }
      this.isLoading = false;
      this.isModalVisible = true;
    });
  }

  fecharModal(): void {
    this.isModalVisible = false;
    this.visitanteSelecionado = null;
    this.documentoAtual = null;
  }

  salvarDocumento(): void {
    if (this.documentoForm.invalid || !this.visitanteSelecionado) return;

    const dadosForm = this.documentoForm.getRawValue();
    const documentoParaSalvar: DocVisitante = {
      idDocumento: this.documentoAtual?.idDocumento,
      tipo: dadosForm.tipo!,
      numero: dadosForm.numero!,
      usuario: this.visitanteSelecionado
    };

    this.docVisitanteService.save(documentoParaSalvar).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Documento salvo com sucesso!' });
        this.fecharModal();
      },
      error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao salvar o documento.' })
    });
  }

  excluirDocumento(): void {
    if (!this.documentoAtual?.idDocumento) return;

    if (confirm('Tem certeza que deseja excluir este documento?')) {
      this.docVisitanteService.delete(this.documentoAtual.idDocumento).subscribe({
        next: () => {
          this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Documento excluído com sucesso!' });
          this.fecharModal();
        },
        error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao excluir o documento.' })
      });
    }
  }
}