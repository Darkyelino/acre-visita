import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { AuthService } from '../../../services/auth/auth';
import { VisitaService } from '../../../services/visita/visita';
import { FeedbackService } from '../../../services/feedback/feedback';
import { Usuario } from '../../../models/Usuario';
import { Visita } from '../../../models/Visita';
import { Feedback } from '../../../models/Feedback';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-fazer-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './fazer-feedback.html',
  styleUrls: ['./fazer-feedback.css']
})
export class FazerFeedback implements OnInit {

  feedbackForm: FormGroup;
  visita: Visita | null = null;
  usuarioLogado: Usuario | null = null;
  isLoading = true;
  
  constructor(
    private feedbackService: FeedbackService,
    private visitaService: VisitaService,
    private authService: AuthService,
    private alertaService: AlertaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.feedbackForm = new FormGroup({
      texto: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.loggedUser;
    
    // ✅ CORREÇÃO: Trocado 'paramMap' por 'queryParamMap' para ler o parâmetro da URL corretamente.
    const visitaId = this.route.snapshot.queryParamMap.get('visitaId');
    
    if (visitaId) {
      this.carregarVisita(+visitaId);
    } else {
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'ID da visita não encontrado na URL.' });
      this.isLoading = false;
    }
  }

  carregarVisita(id: number): void {
    this.visitaService.getById(id).subscribe({
      next: (visita) => {
        this.visita = visita;
        this.isLoading = false;
      },
      error: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Não foi possível carregar os dados da visita.' });
        this.isLoading = false;
      }
    });
  }

  get texto() { return this.feedbackForm.get('texto'); }

  save(): void {
    if (this.feedbackForm.invalid || !this.usuarioLogado || !this.visita) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    const novoFeedback: Feedback = {
      texto: this.feedbackForm.value.texto!,
      dataEnvio: new Date().toISOString(),
      usuario: this.usuarioLogado,
      visita: this.visita
    };

    this.feedbackService.save(novoFeedback).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Obrigado! Seu feedback foi enviado.' });
        this.router.navigate(['/minhas-visitas']);
      },
      error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao enviar feedback.' })
    });
  }
}