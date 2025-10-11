import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth';
import { AlertaService } from '../../../services/alerta/alerta';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { LoginRequest } from '../../../models/LoginRequest';
import { HttpErrorResponse } from '@angular/common/http';

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
      // Adicione o `next` para redirecionar em caso de sucesso
      next: () => {
        this.router.navigate(['/']); // Navega para a página principal
      },
      // ✨ 2. Modifique o tratamento de erro
      error: (erro: HttpErrorResponse) => {
        let mensagem = 'Ocorreu um erro desconhecido.';
        
        if (erro.status === 403) {
          // Mensagem específica para usuário desativado
          mensagem = 'Seu usuário está desativado. Contate o suporte.';
        } else if (erro.status === 401) {
          // Mensagem para credenciais inválidas
          mensagem = 'Email ou senha inválidos. Tente novamente.';
        }
        
        console.error('Erro no login:', erro);
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.ERRO,
          mensagem: mensagem
        });
      }
    });
  }
}