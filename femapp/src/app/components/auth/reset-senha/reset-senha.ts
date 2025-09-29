import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertaService } from '../../../services/alerta/alerta';
import { UsuarioService } from '../../../services/usuario/usuario';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

// Função validadora customizada
export function senhasCoincidem(control: AbstractControl): { [key: string]: boolean } | null {
  const senha = control.get('novaSenha');
  const confirmarSenha = control.get('confirmarSenha');
  if (senha && confirmarSenha && senha.value !== confirmarSenha.value) {
    return { 'senhasNaoCoincidem': true };
  }
  return null;
}

@Component({
  selector: 'app-reset-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-senha.html',
  styleUrls: ['./reset-senha.css']
})
export class ResetSenha implements OnInit {
  resetForm: FormGroup;
  token: string | null = null;
  isLoading = false;
  isTokenValid: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private alertaService: AlertaService
  ) {
    this.resetForm = new FormGroup({
      novaSenha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmarSenha: new FormControl('', [Validators.required])
    }, { validators: senhasCoincidem });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    if (!this.token) {
      this.isTokenValid = false;
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Token de redefinição inválido ou ausente.' });
    } else {
      this.isTokenValid = true; 
    }
  }

  get form() {
    return this.resetForm.controls;
  }

  onSubmit(): void {
    if (this.resetForm.invalid || !this.token) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { novaSenha } = this.resetForm.value;

    this.usuarioService.resetarSenha(this.token, novaSenha).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Senha redefinida com sucesso! Você já pode fazer o login.' });
        this.router.navigate(['/login']);
        this.isLoading = false;
      },
      error: (err) => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: err.error?.message || 'Erro ao redefinir a senha. O token pode ser inválido ou ter expirado.' });
        this.isLoading = false;
      }
    });
  }
}
