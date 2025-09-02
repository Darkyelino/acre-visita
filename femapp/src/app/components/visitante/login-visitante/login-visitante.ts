import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth'; // ✅ O serviço injetado é o mesmo
import { AlertaService } from '../../../services/alerta/alerta.service';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { LoginRequest } from '../../../models/LoginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-visitante.html', // Mantenha o nome do seu arquivo HTML
  styleUrls: ['./login-visitante.css'] // Mantenha o nome do seu arquivo CSS
})
export class LoginVisitante {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private alertaService: AlertaService,
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

    // A chamada aqui permanece IDÊNTICA. A complexidade foi abstraída para o AuthService.
    this.authService.login(credenciais).subscribe({
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