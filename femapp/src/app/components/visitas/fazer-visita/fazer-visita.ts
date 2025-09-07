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
  ) {}

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
   * Registra uma entrada imediata para o setor selecionado.
   */
  registrarEntradaAgora(): void {
    if (this.form.setor.invalid) {
      this.visitaForm.markAllAsTouched();
      return;
    }

    const novaVisita: Visita = {
      dataHoraEntrada: new Date().toISOString(), // Data e hora atuais
      dataHoraAgendamento: null,
      status: 'PENDENTE',
      usuario: this.usuarioLogado!,
      local: this.form.setor.value!
    };

    this.salvarVisita(novaVisita, 'Entrada registrada com sucesso! Tenha uma ótima visita.');
  }

  /**
   * Agenda uma visita para a data e hora selecionadas.
   */
  agendarVisita(): void {
    // Adiciona validadores para data e hora apenas para esta ação
    this.form.dataAgendamento.setValidators([Validators.required]);
    this.form.horaAgendamento.setValidators([Validators.required]);
    this.visitaForm.updateValueAndValidity();

    if (this.visitaForm.invalid) {
      this.visitaForm.markAllAsTouched();
      return;
    }

    const data = this.form.dataAgendamento.value!;
    const hora = this.form.horaAgendamento.value!;
    const dataHoraAgendamento = new Date(`${data}T${hora}`).toISOString();

    const novaVisita: Visita = {
      dataHoraEntrada: null,
      dataHoraAgendamento: dataHoraAgendamento,
      status: 'AGENDADA',
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
        this.router.navigate(['/visitar']); // Redireciona para a página principal
        this.isLoading = false;
      },
      error: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Ocorreu um erro. Tente novamente.' });
        this.isLoading = false;
      }
    });
  }
}