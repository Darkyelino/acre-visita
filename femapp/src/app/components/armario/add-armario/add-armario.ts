import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { SetorService } from '../../../services/setor/setor';
import { ArmarioService } from '../../../services/armario/armario';
import { AlertaService } from '../../../services/alerta/alerta';

import { Setor } from '../../../models/Setor';
import { Armario } from '../../../models/Armario';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-add-armario',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add-armario.html',
  styleUrl: './add-armario.css'
})
export class AddArmario implements OnInit {

  setores: Setor[] = [];
  isLoading = false;

  armarioForm = new FormGroup({
    setor: new FormControl<Setor | null>(null, Validators.required),
    quantidade: new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(100)])
  });

  constructor(
    private setorService: SetorService,
    private armarioService: ArmarioService,
    private alertaService: AlertaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarSetores();
  }

  carregarSetores(): void {
    this.setorService.getAll().subscribe(response => {
      this.setores = response.content;
    });
  }

  get form() {
    return this.armarioForm.controls;
  }

  save(): void {
    if (this.armarioForm.invalid) {
      this.armarioForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { setor, quantidade } = this.armarioForm.getRawValue();

    // ✅ CORREÇÃO: The type now correctly omits only the optional idArmario.
    const novosArmarios: Omit<Armario, 'idArmario'>[] = [];
    for (let i = 0; i < quantidade!; i++) {
      novosArmarios.push({
        // ✅ CORREÇÃO: Added 'numeracao' with a placeholder value.
        // The backend should handle assigning the correct, final number.
        numeracao: 0, 
        setor: setor!,
        usuario: null
      });
    }
    
    // The save method now receives a valid Armario object (without the ID).
    const requisicoes = novosArmarios.map(armario => this.armarioService.save(armario as Armario));

    forkJoin(requisicoes).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: `${quantidade} armários foram adicionados com sucesso ao setor ${setor!.nomeSetor}!`
        });
        this.router.navigate(['/armario/list']);
      },
      error: (err) => {
        this.isLoading = false;
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.ERRO,
          mensagem: "Ocorreu um erro ao adicionar os armários. Tente novamente."
        });
        console.error(err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}

