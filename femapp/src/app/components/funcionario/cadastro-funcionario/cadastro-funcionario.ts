import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario';
import { SetorService } from '../../../services/setor/setor';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { Usuario } from '../../../models/Usuario';
import { Setor } from '../../../models/Setor';
import { EPapel } from '../../../models/EPapel';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-cadastro-funcionario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro-funcionario.html',
  styleUrls: ['./cadastro-funcionario.css']
})
export class CadastroFuncionario implements OnInit {

  funcionarioForm: FormGroup;
  setores: Setor[] = [];
  isEditMode = false;
  usuarioId: number | null = null;
  
  papeisDisponiveis = [
    { nome: 'Atendente', valor: EPapel.ATENDENTE },
    { nome: 'Coordenador', valor: EPapel.COORDENADOR }
  ];

  constructor(
    private usuarioService: UsuarioService,
    private setorService: SetorService,
    private alertaService: AlertaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.funcionarioForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
      papel: new FormControl<EPapel | null>(null, Validators.required),
      setor: new FormControl<Setor | null>(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.setorService.getAll().subscribe(resposta => {
      this.setores = resposta.content;
      
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.usuarioId = +idParam;
        // ✅ A senha deixa de ser obrigatória no formulário de edição
        this.funcionarioForm.controls['senha'].setValidators(null);
        this.funcionarioForm.controls['senha'].updateValueAndValidity();
        this.carregarDadosFuncionario(this.usuarioId);
      }
    });
  }

  get nome() { return this.funcionarioForm.get('nome'); }
  get email() { return this.funcionarioForm.get('email'); }
  get senha() { return this.funcionarioForm.get('senha'); }
  get papel() { return this.funcionarioForm.get('papel'); }
  get setor() { return this.funcionarioForm.get('setor'); }

  carregarDadosFuncionario(id: number): void {
    this.usuarioService.getById(id).subscribe(usuario => {
      this.funcionarioForm.patchValue(usuario);
    });
  }

  compareSetores(s1: Setor, s2: Setor): boolean {
    return s1 && s2 ? s1.idSetor === s2.idSetor : s1 === s2;
  }

  save(): void {
    if (this.funcionarioForm.invalid) {
      this.funcionarioForm.markAllAsTouched();
      return;
    }

    const dadosFormulario = this.funcionarioForm.getRawValue();
    const usuarioParaSalvar: Usuario = {
      id: this.usuarioId ?? undefined,
      nome: dadosFormulario.nome!,
      email: dadosFormulario.email!,
      papel: dadosFormulario.papel!,
      setor: dadosFormulario.setor!
    };

    if (!this.isEditMode) {
      usuarioParaSalvar.senha = dadosFormulario.senha!;
    }

    this.usuarioService.save(usuarioParaSalvar).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: `Funcionário ${this.isEditMode ? 'atualizado' : 'cadastrado'} com sucesso!`
        });
        this.router.navigate(['/list-funcionarios']);
      },
      error: (erro) => {
        let mensagemErro = 'Erro ao salvar funcionário.';
        if (erro.status === 500 && erro.error?.message?.includes('Duplicate entry')) {
          mensagemErro = 'Este endereço de e-mail já está em uso.';
        }
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: mensagemErro });
      }
    });
  }
}