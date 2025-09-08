import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auditorio } from '../../../models/Auditorio';
import { Setor } from '../../../models/Setor';
import { AuditorioService } from '../../../services/auditorio/auditorio';
import { SetorService } from '../../../services/setor/setor';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-cadastro-auditorio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro-auditorio.html',
  styleUrls: ['./cadastro-auditorio.css']
})
export class CadastroAuditorio implements OnInit {

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
    // Garante que os setores são carregados ANTES de tentar popular o formulário na edição
    this.setorService.getAll().subscribe(resposta => {
      this.setores = resposta.content;
      
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.auditorioId = +idParam;
        this.auditorioService.getById(this.auditorioId).subscribe(auditorio => {
          this.auditorioForm.patchValue(auditorio);
        });
      }
    });
  }

  get form() {
    return this.auditorioForm.controls;
  }

  /**
   * ✅ ADICIONADO: Função de comparação para o dropdown de setores.
   * Resolve o problema de o setor não ser selecionado no modo de edição.
   */
  compareSetores(s1: Setor, s2: Setor): boolean {
    return s1 && s2 ? s1.idSetor === s2.idSetor : s1 === s2;
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
        // ✅ CORRIGIDO: Redireciona para a lista de auditórios
        this.router.navigate(['/admin/auditorios']);
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