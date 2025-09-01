import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Auditorio } from '../../../models/Auditorio';
import { ReservaAuditorio } from '../../../models/ReservaAuditorio';
import { Visitante } from '../../../models/Visitante';

import { AuditorioService } from '../../../services/auditorio/auditorio';
import { ReservaAuditorioService } from '../../../services/reserva-auditorio/reserva-auditorio';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-auditorio-reserva',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './auditorio-reserva.html',
  styleUrls: ['./auditorio-reserva.css']
})
export class AuditorioReserva implements OnInit {

  reservaForm!: FormGroup<{
    auditorio: FormControl<Auditorio | null>;
    nomeEvento: FormControl<string | null>;
    data: FormControl<string | null>;
    horaInicio: FormControl<string | null>;
    horaFim: FormControl<string | null>;
    observacoes: FormControl<string | null>;
  }>;

  auditoriosDisponiveis: Auditorio[] = [];
  visitanteLogado!: Visitante; // Simula o visitante logado

  constructor(
    private reservaService: ReservaAuditorioService,
    private auditorioService: AuditorioService,
    private alertaService: AlertaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reservaForm = new FormGroup({
      auditorio: new FormControl<Auditorio | null>(null, [Validators.required]),
      nomeEvento: new FormControl<string>('', [Validators.required]),
      data: new FormControl<string>('', [Validators.required]),
      horaInicio: new FormControl<string>('', [Validators.required]),
      horaFim: new FormControl<string>('', [Validators.required]),
      observacoes: new FormControl<string>('')
    });

    this.carregarAuditorios();
    
    // Em uma aplicação real, você obteria o visitante logado de um serviço de autenticação
    this.visitanteLogado = { idVisitante: 1, nomeVisitante: 'Ana Clara Silva', emailVisitante: 'ana.silva@email.com' } as Visitante;
  }

  get form() {
    return this.reservaForm.controls;
  }

  carregarAuditorios(): void {
    this.auditorioService.get().subscribe(resposta => {
      this.auditoriosDisponiveis = resposta.content.filter(a => a.disponibilidade);
    });
  }

  solicitarReserva(): void {
    this.reservaForm.markAllAsTouched();

    if (this.reservaForm.invalid) {
      return;
    }

    const formValues = this.reservaForm.value;

    const novaReserva: ReservaAuditorio = {
      nomeEvento: formValues.nomeEvento!,
      data: formValues.data!,
      horaInicio: formValues.horaInicio!,
      horaFim: formValues.horaFim!,
      observacoes: formValues.observacoes || null,
      status: 'PENDENTE',
      visitante: this.visitanteLogado,
      auditorio: formValues.auditorio!
    };

    this.reservaService.save(novaReserva).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: "Sua solicitação de reserva foi enviada com sucesso! Aguarde a confirmação."
        });
        this.router.navigate(['/']); // Redireciona para a home, por exemplo
      },
      error: (erro) => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.ERRO,
          mensagem: "Não foi possível enviar sua solicitação. Tente novamente."
        });
        console.error("Erro ao criar reserva:", erro);
      }
    });
  }
}
