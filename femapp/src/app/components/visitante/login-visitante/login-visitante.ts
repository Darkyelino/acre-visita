import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { LoginRequest } from '../../../models/LoginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-visitante.html',
  styleUrls: ['./login-visitante.css'] // Use um CSS similar ao do seu cadastro
})
export class LoginVisitante {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private alertaService: AlertaService,
    private router: Router
  ) {}

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credenciais = this.loginForm.value as LoginRequest;

    this.authService.login(credenciais).subscribe({
      // O sucesso é tratado pelo `tap` no AuthService (redirecionamento)
      error: (erro) => {
        console.error('Erro no login:', erro);
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.ERRO,
          mensagem: erro.error || 'Credenciais inválidas. Tente novamente.'
        });
      }
    });
  }
}