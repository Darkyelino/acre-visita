import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms'; // Adicione AbstractControl
import { Router } from '@angular/router';
import { SetorService } from '../../../services/setor/setor';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { AuthService } from '../../../services/auth/auth';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { Setor } from '../../../models/Setor';
import { EPapel } from '../../../models/EPapel';

@Component({
  selector: 'app-cadastro-setor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-setor.html',
  styleUrls: ['./cadastro-setor.css']
})
export class CadastroSetor implements OnInit {
  
  setorForm: FormGroup;
  temPermissao: boolean = false;

  constructor(
    private fb: FormBuilder,
    private setorService: SetorService,
    private router: Router,
    private alertaService: AlertaService,
    private authService: AuthService
  ) {
    this.setorForm = this.fb.group({
      nomeSetor: ['', [Validators.required, Validators.minLength(3)]],
      tipoSetor: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const usuario = this.authService.loggedUser;
    if (usuario && (usuario.papel === EPapel.ADMINISTRADOR || usuario.papel === EPapel.COORDENADOR)) {
      this.temPermissao = true;
    } else {
      this.temPermissao = false;
      this.setorForm.disable();
    }
  }

  get nomeSetor(): AbstractControl | null {
    return this.setorForm.get('nomeSetor');
  }

  get tipoSetor(): AbstractControl | null {
    return this.setorForm.get('tipoSetor');
  }

  save(): void {
    if (!this.temPermissao) {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: "Você não tem permissão para realizar esta ação." });
        return;
    }

    if (this.setorForm.invalid) {
      this.setorForm.markAllAsTouched();
      return;
    }

    const novoSetor = this.setorForm.getRawValue() as Setor;

    this.setorService.save(novoSetor).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: "Setor cadastrado com sucesso!"
        });
        this.router.navigate(['/']);
      },
      error: (erro) => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.ERRO,
          mensagem: "Erro ao cadastrar setor. Tente novamente."
        });
        console.error(erro);
      }
    });
  }
}