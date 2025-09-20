import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertaService } from '../../../services/alerta/alerta';
import { AuthService } from '../../../services/auth/auth';
import { SetorService } from '../../../services/setor/setor';
import { AuditorioService } from '../../../services/auditorio/auditorio';
import { ReservaAuditorioService } from '../../../services/reserva-auditorio/reserva-auditorio';
import { Usuario } from '../../../models/Usuario';
import { Setor } from '../../../models/Setor';
import { Auditorio } from '../../../models/Auditorio';
import { ReservaAuditorio } from '../../../models/ReservaAuditorio';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-reservar-auditorio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservar-auditorio.html',
  styleUrls: ['./reservar-auditorio.css']
})
export class ReservarAuditorio implements OnInit {

  reservaForm: FormGroup;
  
  // Listas de dados
  setores: Setor[] = [];
  todosAuditorios: Auditorio[] = [];
  auditoriosFiltrados: Auditorio[] = [];
  reservasAprovadas: ReservaAuditorio[] = [];
  
  usuarioLogado: Usuario | null = null;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private setorService: SetorService,
    private auditorioService: AuditorioService,
    private reservaService: ReservaAuditorioService,
    private alertaService: AlertaService,
    private router: Router
  ) {
    this.reservaForm = new FormGroup({
      setor: new FormControl<Setor | null>(null, Validators.required),
      auditorio: new FormControl<Auditorio | null>({ value: null, disabled: true }, Validators.required),
      nomeEvento: new FormControl('', [Validators.required, Validators.minLength(5)]),
      data: new FormControl('', Validators.required),
      horaInicio: new FormControl('', Validators.required),
      horaFim: new FormControl('', Validators.required),
      observacoes: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.loggedUser;
    this.carregarDadosIniciais();
  }

  carregarDadosIniciais(): void {
    // Carrega todos os dados necessários em paralelo para mais performance
    forkJoin({
      setores: this.setorService.getAll(),
      auditorios: this.auditorioService.get(),
      reservas: this.reservaService.buscarReservas(undefined, 'APROVADA')
    }).subscribe({
      next: ({ setores, auditorios, reservas }) => {
        this.setores = setores.content;
        this.todosAuditorios = auditorios.content.filter(a => a.disponibilidade);
        this.reservasAprovadas = reservas.content;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onSetorChange(): void {
    const setorSelecionado = this.reservaForm.get('setor')?.value;
    this.reservaForm.get('auditorio')?.reset();
    
    if (setorSelecionado) {
      this.auditoriosFiltrados = this.todosAuditorios.filter(
        auditorio => auditorio.setor.idSetor === setorSelecionado.idSetor
      );
      this.reservaForm.get('auditorio')?.enable();
    } else {
      this.auditoriosFiltrados = [];
      this.reservaForm.get('auditorio')?.disable();
    }
  }

  verificarConflito(): boolean {
    const formValue = this.reservaForm.getRawValue();
    const novaData = formValue.data;
    const novoInicio = new Date(`${novaData}T${formValue.horaInicio}`).getTime();
    const novoFim = new Date(`${novaData}T${formValue.horaFim}`).getTime();
    const auditorioId = formValue.auditorio?.idAuditorio;

    if (!auditorioId || !novoInicio || !novoFim) return false;

    if (novoFim <= novoInicio) {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'A hora de término deve ser após a hora de início.' });
        return true;
    }

    const conflito = this.reservasAprovadas.find(reserva => {
        if (reserva.auditorio.idAuditorio !== auditorioId) {
            return false;
        }
        const inicioExistente = new Date(`${reserva.data}T${reserva.horaInicio}`).getTime();
        const fimExistente = new Date(`${reserva.data}T${reserva.horaFim}`).getTime();

        // Lógica de verificação de sobreposição de horários
        return (novoInicio < fimExistente) && (novoFim > inicioExistente);
    });

    if (conflito) {
      this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: `Este auditório já está reservado neste horário (Evento: ${conflito.nomeEvento}).` });
      return true;
    }

    return false;
  }

  save(): void {
    if (this.reservaForm.invalid || !this.usuarioLogado) {
      this.reservaForm.markAllAsTouched();
      return;
    }

    if (this.verificarConflito()) {
      return; // Para a execução se houver conflito
    }

    const dados = this.reservaForm.getRawValue();
    const novaReserva: ReservaAuditorio = {
      nomeEvento: dados.nomeEvento!,
      data: dados.data!,
      horaInicio: dados.horaInicio!,
      horaFim: dados.horaFim!,
      observacoes: dados.observacoes || null,
      status: 'PENDENTE',
      usuario: this.usuarioLogado,
      auditorio: dados.auditorio!
    };

    this.reservaService.save(novaReserva).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Solicitação de reserva enviada com sucesso! Aguarde a aprovação.' });
        this.router.navigate(['/home']);
      },
      error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao enviar solicitação.' })
    });
  }

  cancelar(): void {
    this.router.navigate(['/home']);
  }
}