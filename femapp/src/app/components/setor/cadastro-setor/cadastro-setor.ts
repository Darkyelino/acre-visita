import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SetorService } from '../../../services/setor/setor';
import { AlertaService } from '../../../services/alerta/alerta';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { Setor } from '../../../models/Setor';

@Component({
  selector: 'app-cadastro-setor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro-setor.html',
  styleUrls: ['./cadastro-setor.css']
})
export class CadastroSetor implements OnInit {
  
  setorForm: FormGroup;
  isEditMode = false;
  setorId: number | null = null;

  constructor(
    private setorService: SetorService,
    private router: Router,
    private alertaService: AlertaService,
    private route: ActivatedRoute
  ) {
    this.setorForm = new FormGroup({
      nomeSetor: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tipoSetor: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.setorId = +idParam;
      this.carregarDadosSetor(this.setorId);
    }
  }

  carregarDadosSetor(id: number): void {
    this.setorService.getById(id).subscribe(setor => {
      this.setorForm.patchValue(setor);
    });
  }

  get nomeSetor() { return this.setorForm.get('nomeSetor'); }
  get tipoSetor() { return this.setorForm.get('tipoSetor'); }

  save(): void {
    if (this.setorForm.invalid) {
      this.setorForm.markAllAsTouched();
      return;
    }

    const setorParaSalvar = this.setorForm.getRawValue() as Setor;
    if (this.isEditMode) {
      setorParaSalvar.idSetor = this.setorId!;
    }

    this.setorService.save(setorParaSalvar).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: `Setor ${this.isEditMode ? 'atualizado' : 'cadastrado'} com sucesso!`
        });
        this.router.navigate(['/setor/list']);
      },
      error: (erro) => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.ERRO,
          mensagem: "Erro ao cadastrar setor. Tente novamente."
        });
        console.error(erro);
      }
    });
  }
}