import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AlertaService } from '../../../services/alerta/alerta';
import { DocVisitanteService } from '../../../services/doc-visitante/doc-visitante';
import { UsuarioService } from '../../../services/usuario/usuario';

import { DocVisitante } from '../../../models/DocVisitante';
import { Usuario } from '../../../models/Usuario';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-form-documento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-documento.html',
  styleUrls: ['./form-documento.css']
})
export class FormDocumento implements OnInit {

  documentoForm: FormGroup;
  visitante: Usuario | null = null;
  isEditMode = false;
  documentoId: number | null = null;
  isLoading = true;

  constructor(
    private docVisitanteService: DocVisitanteService,
    private usuarioService: UsuarioService,
    private alertaService: AlertaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.documentoForm = new FormGroup({
      tipo: new FormControl('CPF', Validators.required),
      numero: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const usuarioIdQueryParam = this.route.snapshot.queryParamMap.get('usuarioId');

    if (idParam) { // MODO DE EDIÇÃO
      this.isEditMode = true;
      this.documentoId = +idParam;
      this.carregarDadosDocumento(this.documentoId);
    } else if (usuarioIdQueryParam) { // MODO DE CRIAÇÃO
      this.carregarDadosVisitante(+usuarioIdQueryParam);
    } else {
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Nenhum visitante ou documento especificado.' });
      this.isLoading = false;
    }
  }

  carregarDadosDocumento(id: number): void {
    this.docVisitanteService.getById(id).subscribe(doc => {
      this.visitante = doc.usuario;
      this.documentoForm.patchValue(doc);
      this.isLoading = false;
    });
  }

  carregarDadosVisitante(id: number): void {
    this.usuarioService.getById(id).subscribe(usuario => {
      this.visitante = usuario;
      this.isLoading = false;
    });
  }

  get form() { return this.documentoForm.controls; }

  save(): void {
    if (this.documentoForm.invalid || !this.visitante) {
      this.documentoForm.markAllAsTouched();
      return;
    }

    const dadosForm = this.documentoForm.getRawValue();
    const documentoParaSalvar: DocVisitante = {
      idDocumento: this.documentoId ?? undefined,
      tipo: dadosForm.tipo!,
      numero: dadosForm.numero!,
      usuario: this.visitante
    };

    this.docVisitanteService.save(documentoParaSalvar).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: `Documento ${this.isEditMode ? 'atualizado' : 'salvo'} com sucesso!`
        });
        this.router.navigate(['/documentos/list']);
      },
      error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao salvar o documento.' })
    });
  }
}
