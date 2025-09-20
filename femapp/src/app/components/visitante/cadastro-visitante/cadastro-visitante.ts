import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertaService } from '../../../services/alerta/alerta';
import { UsuarioService } from '../../../services/usuario/usuario';
import { NacionalidadeService } from '../../../services/nacionalidade/nacionalidade';
import { Usuario } from '../../../models/Usuario';
import { NacionalidadeVisitante } from '../../../models/NacionalidadeVisitante';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { EPapel } from '../../../models/EPapel';
import { NgxMaskDirective } from 'ngx-mask'; // ✅ 1. Importe a diretiva da máscara

@Component({
  selector: 'app-cadastro-visitante',
  standalone: true,
  imports: [ CommonModule, RouterLink, ReactiveFormsModule, NgxMaskDirective ], // ✅ 2. Adicione a diretiva aqui
  templateUrl: './cadastro-visitante.html',
  styleUrls: ['./cadastro-visitante.css']
})
export class CadastroVisitante implements OnInit {

  nacionalidades: NacionalidadeVisitante[] = []; 
  isEditMode: boolean = false;
  usuarioId: number | null = null;

  usuarioForm = new FormGroup({
    nome: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    // O validador de tamanho/formato não é mais necessário, a máscara cuida disso
    telefone: new FormControl<string>('', Validators.required),
    senha: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    nacionalidade: new FormControl<NacionalidadeVisitante | null>(null, Validators.required),
  });

  constructor(
    private usuarioService: UsuarioService,
    private nacionalidadeService: NacionalidadeService,
    private router: Router,
    private route: ActivatedRoute,
    private servicoAlerta: AlertaService
  ) {}

  ngOnInit(): void {
    this.carregarNacionalidades();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.usuarioId = +idParam;
      this.usuarioService.getById(this.usuarioId).subscribe(usuario => {
        this.usuarioForm.patchValue(usuario);
      });
    }
  }

  carregarNacionalidades(): void {
    this.nacionalidadeService.getAll().subscribe(resposta => {
      this.nacionalidades = resposta.content;
    });
  }

  get form() {
    return this.usuarioForm.controls;
  }

  save(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }
    
    const dadosFormulario = this.usuarioForm.getRawValue();

    const usuarioParaSalvar: Usuario = {
      id: this.usuarioId ?? undefined,
      nome: dadosFormulario.nome!,
      email: dadosFormulario.email!,
      senha: dadosFormulario.senha!,
      papel: EPapel.VISITANTE,
      telefone: dadosFormulario.telefone!,
      nacionalidade: dadosFormulario.nacionalidade!
    };

    this.usuarioService.save(usuarioParaSalvar).subscribe({
      next: () => {
        this.router.navigate(['/login']); 
        this.servicoAlerta.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: `Cadastro ${this.isEditMode ? 'atualizado' : 'realizado'} com sucesso!`
        });
      },
      error: (erro) => {
        this.servicoAlerta.enviarAlerta({
          tipo: ETipoAlerta.ERRO,
          mensagem: 'Erro ao salvar cadastro: ' + (erro.error.message || 'Tente novamente.')
        });
      }
    });
  }
}