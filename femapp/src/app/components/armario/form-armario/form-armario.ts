import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { ArmarioService } from '../../../services/armario/armario';
import { UsuarioService } from '../../../services/usuario/usuario';
import { AlertaService } from '../../../services/alerta/alerta';

import { Armario } from '../../../models/Armario';
import { Usuario } from '../../../models/Usuario';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { RequisicaoPaginada } from '../../../models/RequisicaoPaginada';
import { EPapel } from '../../../models/EPapel';

@Component({
  selector: 'app-form-armario',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './form-armario.html',
  styleUrl: './form-armario.css'
})
export class FormArmario implements OnInit, OnDestroy {

  armario: Armario | null = null;
  todosVisitantes: Usuario[] = [];
  visitantesFiltrados$!: Observable<Usuario[]>;
  isLoading = true;
  isDropdownOpen = false;
  private destroy$ = new Subject<void>();

  armarioForm = new FormGroup({
    numeracao: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    setor: new FormControl({ value: '', disabled: true }),
    usuario: new FormControl<Usuario | null>(null)
  });
  
  // Novo FormControl para o campo de busca
  visitanteSearchCtrl = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private armarioService: ArmarioService,
    private usuarioService: UsuarioService,
    private alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    const armarioId = this.route.snapshot.paramMap.get('id');
    if (armarioId) {
      this.carregarDados(Number(armarioId));
    } else {
      this.router.navigate(['/armario/list']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  carregarDados(id: number): void {
    this.isLoading = true;
    const paginacao = new RequisicaoPaginada();
    paginacao.size = 2000;

    forkJoin({
      armario: this.armarioService.getById(id),
      visitantes: this.usuarioService.get(undefined, paginacao)
    }).subscribe({
      next: ({ armario, visitantes }) => {
        this.armario = armario;
        this.todosVisitantes = visitantes.content.filter(u => u.papel === EPapel.VISITANTE);
        
        const visitanteAtual = this.todosVisitantes.find(v => v.id === armario.usuario?.id) || null;
        
        this.armarioForm.patchValue({
          numeracao: armario.numeracao,
          setor: armario.setor.nomeSetor,
          usuario: visitanteAtual
        });
        
        if (visitanteAtual) {
          this.visitanteSearchCtrl.setValue(visitanteAtual.nome);
        }

        this.setupFiltroVisitantes();
        this.isLoading = false;
      },
      error: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Dados não encontrados.' });
        this.router.navigate(['/armario/list']);
      }
    });
  }

  private setupFiltroVisitantes(): void {
    this.visitantesFiltrados$ = this.visitanteSearchCtrl.valueChanges.pipe(
      takeUntil(this.destroy$),
      startWith(''),
      map(value => this._filterVisitantes(value || ''))
    );
  }

  private _filterVisitantes(value: string): Usuario[] {
    const filterValue = value.toLowerCase();
    return this.todosVisitantes.filter(visitante => 
      visitante.nome.toLowerCase().includes(filterValue)
    );
  }

  selecionarVisitante(visitante: Usuario | null): void {
    this.armarioForm.get('usuario')?.setValue(visitante);
    this.visitanteSearchCtrl.setValue(visitante ? visitante.nome : '');
    this.isDropdownOpen = false;
  }

  compareUsuarios(u1: Usuario, u2: Usuario): boolean {
    return u1 && u2 ? u1.id === u2.id : u1 === u2;
  }

  save(): void {
    if (this.armarioForm.invalid || !this.armario) {
      return;
    }

    // ✅ CORREÇÃO: Construindo o objeto de forma explícita para garantir a integridade dos dados.
    // Usamos getRawValue() para ler todos os campos, incluindo os desabilitados,
    // mas garantimos que o objeto 'setor' original seja preservado.
    const formValues = this.armarioForm.getRawValue();

    const armarioAtualizado: Armario = {
      idArmario: this.armario.idArmario,
      setor: this.armario.setor, // Usa o objeto 'setor' original e completo, não o valor do campo desabilitado.
      numeracao: Number(formValues.numeracao!),
      usuario: formValues.usuario as Usuario | null
    };

    this.armarioService.save(armarioAtualizado).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.SUCESSO, mensagem: 'Armário atualizado com sucesso!' });
        this.router.navigate(['/armario/list']);
      },
      error: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao atualizar o armário.' });
      }
    });
  }
}

