import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auditorio } from '../../../models/Auditorio';
import { Setor } from '../../../models/Setor';
import { AuditorioService } from '../../../services/auditorio/auditorio';
import { SetorService } from '../../../services/setor/setor';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-cadastro-auditorio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-auditorio.html',
  styleUrls: ['./cadastro-auditorio.css']
})
export class CadastroAuditorioComponent implements OnInit {

  auditorioForm = new FormGroup({
    nomeAuditorio: new FormControl('', Validators.required),
    localAuditorio: new FormControl<Setor | null>(null, Validators.required),
    disponibilidade: new FormControl(true, Validators.required)
  });
  
  setores: Setor[] = [];
  isEditMode = false;
  auditorioId: number | null = null;

  constructor(
    private auditorioService: AuditorioService,
    private setorService: SetorService,
    private alertaService: AlertaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarSetores();
    
    // Verifica se há um ID na URL para o modo de edição
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.auditorioId = +idParam;
      this.auditorioService.getById(this.auditorioId).subscribe(auditorio => {
        // Preenche o formulário com os dados do auditório
        this.auditorioForm.patchValue(auditorio);
      });
    }
  }

  carregarSetores(): void {
    this.setorService.getAll().subscribe(resposta => {
      this.setores = resposta.content;
    });
  }

  get form() {
    return this.auditorioForm.controls;
  }

  save(): void {
    if (this.auditorioForm.invalid) {
      this.auditorioForm.markAllAsTouched();
      return;
    }
    
    const auditorioParaSalvar: Auditorio = this.auditorioForm.getRawValue() as Auditorio;
    if (this.isEditMode) {
      auditorioParaSalvar.idAuditorio = this.auditorioId!;
    }

    this.auditorioService.save(auditorioParaSalvar).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: `Auditório ${this.isEditMode ? 'atualizado' : 'cadastrado'} com sucesso!`
        });
        this.router.navigate(['/']); // Navega para a home ou para uma lista de auditórios
      },
      error: () => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.ERRO,
          mensagem: 'Erro ao salvar o auditório. Tente novamente.'
        });
      }
    });
  }
}