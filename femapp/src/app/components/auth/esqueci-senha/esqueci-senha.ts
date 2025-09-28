import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario';
import { AlertaService } from '../../../services/alerta/alerta';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './esqueci-senha.html',
  styleUrls: ['./esqueci-senha.css']
})
export class EsqueciSenha {
  isLoading = false;
  emailEnviado = false;

  esqueciSenhaForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private usuarioService: UsuarioService,
    private alertaService: AlertaService
  ) {}

  get form() {
    return this.esqueciSenhaForm.controls;
  }

  onSubmit(): void {
    if (this.esqueciSenhaForm.invalid) {
      this.esqueciSenhaForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const email = this.form.email.value!;

    this.usuarioService.solicitarResetSenha(email).subscribe({
      next: () => {
        this.isLoading = false;
        this.emailEnviado = true; // Mostra a mensagem de sucesso
      },
      error: (erro) => {
        this.isLoading = false;
        // Mesmo em caso de erro, mostramos a tela de sucesso por segurança
        this.emailEnviado = true;
        console.error("Erro na solicitação de reset de senha:", erro);
      }
    });
  }
}
