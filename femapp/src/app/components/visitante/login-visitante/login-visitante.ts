import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-visitante',
  standalone: true,
  // Adiciona os módulos necessários para formulários reativos e roteamento
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-visitante.html',
  styleUrls: ['./login-visitante.css']
})
export class LoginVisitante implements OnInit {

  // Adiciona uma tipagem específica ao FormGroup para resolver o erro de template estrito
  loginForm!: FormGroup<{
    email: FormControl<string | null>;
    senha: FormControl<string | null>;
  }>;

  // Injeta o FormBuilder para criar o formulário e o Router para navegação
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Inicializa o formulário com seus campos e validadores
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  // Getter para facilitar o acesso aos controles do formulário no template HTML
  get form() {
    return this.loginForm.controls;
  }

  // Função chamada quando o formulário é enviado
  login(): void {
    // Marca todos os campos como "tocados" para exibir mensagens de erro, se houver
    this.loginForm.markAllAsTouched();

    // Se o formulário for inválido, interrompe a execução
    if (this.loginForm.invalid) {
      return;
    }

    // Se o formulário for válido, aqui você chamaria seu serviço de autenticação
    console.log('Dados do formulário válidos:', this.loginForm.value);

    // Exemplo de como você chamaria um serviço de autenticação:
    // this.authService.login(this.loginForm.value).subscribe({
    //   next: () => this.router.navigate(['/dashboard']),
    //   error: (err) => console.error('Falha no login', err)
    // });
  }
}

