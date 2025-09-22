// src/app/components/filmoteca/sugestao-filmoteca/sugestao-filmoteca.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertaService } from '../../../services/alerta/alerta';
import { AuthService } from '../../../services/auth/auth';
import { SetorService } from '../../../services/setor/setor';
import { FilmotecaService } from '../../../services/filmoteca/filmoteca';
import { Usuario } from '../../../models/Usuario';
import { Setor } from '../../../models/Setor';
import { Filmoteca } from '../../../models/Filmoteca';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-sugestao-filmoteca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sugestao-filmoteca.html',
  styleUrls: ['./sugestao-filmoteca.css']
})
export class SugestaoFilmoteca implements OnInit {

  sugestaoForm: FormGroup;
  setores: Setor[] = [];
  usuarioLogado: Usuario | null = null;
  isLoading = false;

  constructor(
    private filmotecaService: FilmotecaService,
    private setorService: SetorService,
    private authService: AuthService,
    private alertaService: AlertaService,
    private router: Router
  ) {
    this.sugestaoForm = new FormGroup({
      setor: new FormControl<Setor | null>(null, Validators.required),
      sugestao: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.loggedUser;
    this.carregarSetores();
  }

  carregarSetores(): void {
    this.setorService.getAll().subscribe(resposta => {
      this.setores = resposta.content;
    });
  }

  get setor() { return this.sugestaoForm.get('setor'); }
  get sugestao() { return this.sugestaoForm.get('sugestao'); }

  save(): void {
    if (this.sugestaoForm.invalid || !this.usuarioLogado) {
      this.sugestaoForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const dadosForm = this.sugestaoForm.getRawValue();
    const novaSugestao: Filmoteca = {
      sugestao: dadosForm.sugestao!,
      setor: dadosForm.setor!,
      usuario: this.usuarioLogado
    };

    this.filmotecaService.save(novaSugestao).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Obrigado! Sua sugestão foi enviada.' });
        this.router.navigate(['/home']); // Navega para a página principal
        this.isLoading = false;
      },
      error: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao enviar sugestão.' });
        this.isLoading = false;
      }
    });
  }
}