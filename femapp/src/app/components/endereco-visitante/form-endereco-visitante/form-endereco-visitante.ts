import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertaService } from '../../../services/alerta/alerta';
import { AuthService } from '../../../services/auth/auth';
import { EnderecoVisitanteService } from '../../../services/endereco-visitante/endereco-visitante';
import { Cep } from '../../../services/api/cep';
import { Usuario } from '../../../models/Usuario';
import { EnderecoVisitante } from '../../../models/EnderecoVisitante';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-form-endereco-visitante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgxMaskDirective],
  templateUrl: './form-endereco-visitante.html',
  styleUrls: ['./form-endereco-visitante.css']
})
export class FormEnderecoVisitante implements OnInit {

  enderecoForm: FormGroup;
  usuarioLogado: Usuario | null = null;
  enderecoExistente: EnderecoVisitante | null = null;
  isEditMode = false;
  isLoading = true;
  isBuscandoCep = false;

  constructor(
    private authService: AuthService,
    private enderecoService: EnderecoVisitanteService,
    private cepService: Cep,
    private alertaService: AlertaService,
    private router: Router
  ) {
    this.enderecoForm = new FormGroup({
      // ✅ CORREÇÃO: Removido o Validators.minLength(9).
      // A máscara já garante o formato, e o Validators.required garante que não está vazio.
      cepVisitante: new FormControl('', [Validators.required]),
      estadoVisitante: new FormControl('', Validators.required),
      cidadeVisitante: new FormControl('', Validators.required),
      bairroVisitante: new FormControl('', Validators.required),
      ruaVisitante: new FormControl('', Validators.required),
      numeroVisitante: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.loggedUser;
    this.isLoading = false;
  }
  
  get cep() { return this.enderecoForm.get('cepVisitante'); }
  // ... outros getters

  buscarCep(): void {
    const cepValue = this.cep?.value;
    // A condição de busca agora é mais flexível, checando apenas se o campo é válido (ou seja, preenchido)
    if (cepValue && this.cep?.valid) {
      this.isBuscandoCep = true;
      const cepNumerico = cepValue.replace(/\D/g, ''); // Remove qualquer coisa que não seja dígito

      this.cepService.consultarCep(cepNumerico).subscribe({
        next: (dados) => {
          if (dados.erro) {
            this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'CEP não encontrado.' });
            this.enderecoForm.patchValue({ ruaVisitante: '', bairroVisitante: '', cidadeVisitante: '', estadoVisitante: '' });
            return;
          }
          this.enderecoForm.patchValue({
            ruaVisitante: dados.logradouro,
            bairroVisitante: dados.bairro,
            cidadeVisitante: dados.localidade,
            estadoVisitante: dados.uf
          });
        },
        error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao consultar o CEP.' }),
        complete: () => this.isBuscandoCep = false
      });
    }
  }

  save(): void {
    // ... (seu método save continua igual)
    if (this.enderecoForm.invalid || !this.usuarioLogado) {
      this.enderecoForm.markAllAsTouched();
      return;
    }

    const enderecoParaSalvar: any = {
      ...this.enderecoForm.getRawValue(),
      usuario: this.usuarioLogado
    };

    if (this.isEditMode) {
      enderecoParaSalvar.idEnderecoVisitante = this.enderecoExistente!.idEnderecoVisitante;
    }

    this.enderecoService.save(enderecoParaSalvar).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: `Endereço ${this.isEditMode ? 'atualizado' : 'cadastrado'} com sucesso!`
        });
        this.router.navigate(['/home']);
      },
      error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao salvar endereço.' })
    });
  }
}