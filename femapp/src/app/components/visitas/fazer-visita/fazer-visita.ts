import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertaService } from '../../../services/alerta/alerta';
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
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './fazer-visita.html',
  styleUrls: ['./fazer-visita.css']
})
export class FazerVisita implements OnInit {

  usuarioLogado: Usuario | null = null;
  setores: Setor[] = [];
  isLoading = false;
  dataMinima: string;
  usuarioAtivo = true;

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
    // Verifica se o usuário está ativo ao iniciar o componente
    if (this.usuarioLogado && this.usuarioLogado.ativo === false) {
      this.usuarioAtivo = false;
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Sua conta está desativada. Você не pode registrar ou agendar visitas.' });
      this.visitaForm.disable(); // Desativa o formulário
    }
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
   * Registra uma entrada para o dia e hora ATUAIS com status PENDENTE.
   */
  registrarEntradaAgora(): void {
    if (this.form.setor.invalid) {
      this.form.setor.markAsTouched();
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Por favor, selecione um setor primeiro.'});
      return;
    }

    // Helper function to format the date without timezone conversion
    const getLocalISOString = (date: Date): string => {
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const novaVisita: Visita = {
      dataHoraEntrada: null,
      // CORREÇÃO: Usa a data/hora local formatada, sem conversão para UTC.
      dataHoraAgendamento: getLocalISOString(new Date()),
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
    
    // CORREÇÃO: Combina a data e a hora diretamente, sem criar um objeto Date que seria convertido para UTC.
    // Adiciona segundos para formar uma string ISO 8601 válida que o LocalDateTime do Java pode analisar.
    const dataHoraAgendamento = `${data}T${hora}:00`;

    // A validação de data passada continua funcionando corretamente.
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
