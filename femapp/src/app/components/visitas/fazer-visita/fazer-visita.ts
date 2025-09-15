import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { AuthService } from '../../../services/auth/auth';
import { SetorService } from '../../../services/setor/setor';
import { VisitaService } from '../../../services/visita/visita';
import { Usuario } from '../../../models/Usuario';
import { Setor } from '../../../models/Setor';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { Visita } from '../../../models/Visita';
import { EStatus } from '../../../models/EStatus';

@Component({
  selector: 'app-fazer-visita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fazer-visita.html',
  styleUrls: ['./fazer-visita.css']
})
export class FazerVisita implements OnInit {

  usuarioLogado: Usuario | null = null;
  setores: Setor[] = [];
  isLoading = false;
  dataMinima: string;

  visitaForm = new FormGroup({
    setor: new FormControl<Setor | null>(null, Validators.required),
    dataAgendamento: new FormControl<string | null>(null),
    horaAgendamento: new FormControl<string | null>(null),
  });

  constructor(
    private authService: AuthService,
    private setorService: SetorService,
    private visitaService: VisitaService,
    private alertaService: AlertaService,
    private router: Router
  ) {
    this.dataMinima = new Date().toISOString().split('T')[0];
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

  get form() {
    return this.visitaForm.controls;
  }

  /**
   * ✅ MÉTODO CORRIGIDO
   * Registra uma entrada para o dia e hora ATUAIS com status PENDENTE.
   */
  registrarEntradaAgora(): void {
    if (this.form.setor.invalid) {
      this.form.setor.markAsTouched();
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Por favor, selecione um setor primeiro.'});
      return;
    }

    const novaVisita: Visita = {
      // CORREÇÃO 1: A data de entrada é nula, pois a visita ainda está pendente de aprovação.
      dataHoraEntrada: null,
      // CORREÇÃO 2: A data de agendamento é a data/hora ATUAL, respeitando o fuso horário.
      dataHoraAgendamento: new Date().toISOString(),
      // CORREÇÃO 3: O status inicial é PENDENTE.
      status: EStatus.PENDENTE,
      usuario: this.usuarioLogado!,
      local: this.form.setor.value!
    };

    this.salvarVisita(novaVisita, 'Solicitação de visita enviada! Aguarde a confirmação do atendente.');
  }

  /**
   * Agenda uma visita para a data e hora selecionadas.
   */
  agendarVisita(): void {
    if (this.form.setor.invalid || !this.form.dataAgendamento.value || !this.form.horaAgendamento.value) {
      this.visitaForm.markAllAsTouched();
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Para agendar, selecione o setor, a data e a hora.'});
      return;
    }

    const data = this.form.dataAgendamento.value!;
    const hora = this.form.horaAgendamento.value!;
    const dataHoraAgendamento = new Date(`${data}T${hora}`).toISOString();

    if (new Date(dataHoraAgendamento).getTime() < new Date().getTime()) {
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Não é possível agendar uma visita para uma data ou hora no passado.'});
      return;
    }

    const novaVisita: Visita = {
      dataHoraEntrada: null,
      dataHoraAgendamento: dataHoraAgendamento,
      status: EStatus.AGENDADA,
      usuario: this.usuarioLogado!,
      local: this.form.setor.value!
    };
    
    this.salvarVisita(novaVisita, 'Visita agendada com sucesso!');
  }

  private salvarVisita(visita: Visita, mensagemSucesso: string): void {
    this.isLoading = true;
    this.visitaService.save(visita).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: mensagemSucesso });
        this.router.navigate(['/minhas-visitas']);
      },
      error: (err) => {
        console.error("Erro ao salvar visita:", err);
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Ocorreu um erro. Tente novamente.' });
        this.isLoading = false;
      },
      complete: () => this.isLoading = false
    });
  }
}