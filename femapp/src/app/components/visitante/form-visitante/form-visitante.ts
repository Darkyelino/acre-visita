import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { AlertaService } from '../../../services/alerta/alerta';
import { UsuarioService } from '../../../services/usuario/usuario';
import { NacionalidadeService } from '../../../services/nacionalidade/nacionalidade';
import { Usuario } from '../../../models/Usuario';
import { NacionalidadeVisitante } from '../../../models/NacionalidadeVisitante';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { EPapel } from '../../../models/EPapel';

@Component({
  selector: 'app-form-visitante',
  standalone: true,
  imports: [ CommonModule, RouterLink, ReactiveFormsModule, NgxMaskDirective ],
  templateUrl: './form-visitante.html',
  styleUrls: ['./form-visitante.css']
})
export class FormVisitante implements OnInit {

  nacionalidades: NacionalidadeVisitante[] = [];
  isEditMode = false;
  usuarioId: number | null = null;

  usuarioForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', Validators.required),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    nacionalidade: new FormControl<NacionalidadeVisitante | null>(null, Validators.required),
  });

  constructor(
    private usuarioService: UsuarioService,
    private nacionalidadeService: NacionalidadeService,
    private router: Router,
    private route: ActivatedRoute,
    private alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    this.carregarNacionalidades();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.usuarioId = +idParam;
      this.usuarioForm.get('senha')?.setValidators(null); // Senha opcional na edição
      this.carregarDadosVisitante(this.usuarioId);
    }
  }

  carregarNacionalidades(): void {
    this.nacionalidadeService.getAll().subscribe(resposta => {
      this.nacionalidades = resposta.content;
    });
  }

  carregarDadosVisitante(id: number): void {
    this.usuarioService.getById(id).subscribe(usuario => {
      this.usuarioForm.patchValue(usuario);
    });
  }

  // Função para o [compareWith] do select de nacionalidade
  compareNacionalidades(n1: NacionalidadeVisitante, n2: NacionalidadeVisitante): boolean {
    return n1 && n2 ? n1.idNacionalidade === n2.idNacionalidade : n1 === n2;
  }

  get form() { return this.usuarioForm.controls; }

  save(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }
    
    const dados = this.usuarioForm.getRawValue();
    const usuarioParaSalvar: Usuario = {
      id: this.usuarioId ?? undefined,
      nome: dados.nome!,
      email: dados.email!,
      senha: dados.senha!,
      papel: EPapel.VISITANTE, // Sempre cria como Visitante
      telefone: dados.telefone!,
      nacionalidade: dados.nacionalidade!
    };

    this.usuarioService.save(usuarioParaSalvar).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: `Visitante ${this.isEditMode ? 'atualizado' : 'cadastrado'} com sucesso!`
        });
        this.router.navigate(['/visitante/list']);
      },
      error: (erro) => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.ERRO,
          mensagem: 'Erro ao salvar visitante: ' + (erro.error.message || 'Tente novamente.')
        });
      }
    });
  }
}