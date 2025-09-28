import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario';
import { AlertaService } from '../../../services/alerta/alerta';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-reset-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-senha.html',
  styleUrls: ['./reset-senha.css']
})
export class ResetSenha implements OnInit {
  isLoading = false;
  token: string | null = null;

  resetSenhaForm = new FormGroup({
    novaSenha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmarSenha: new FormControl('', [Validators.required])
  }, { validators: this.senhasCoincidem });

  constructor(
    private usuarioService: UsuarioService,
    private alertaService: AlertaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) {
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Token de redefinição inválido ou ausente.' });
      this.router.navigate(['/login']);
    }
  }

  get form() {
    return this.resetSenhaForm.controls;
  }

  // Validador customizado para verificar se as senhas são iguais
  senhasCoincidem(control: AbstractControl) {
    const senha = control.get('novaSenha')?.value;
    const confirmar = control.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhasNaoCoincidem: true };
  }

  onSubmit(): void {
    if (this.resetSenhaForm.invalid || !this.token) {
      this.resetSenhaForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const novaSenha = this.form.novaSenha.value!;

    this.usuarioService.resetarSenha(this.token, novaSenha).subscribe({
      next: () => {
        this.isLoading = false;
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Senha redefinida com sucesso! Você já pode fazer login.' });
        this.router.navigate(['/login']);
      },
      error: (erro) => {
        this.isLoading = false;
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: erro.error || 'Não foi possível redefinir a senha.' });
      }
    });
  }
}

