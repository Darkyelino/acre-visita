import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { AuthService } from '../../../services/auth/auth';
import { EnderecoVisitanteService } from '../../../services/endereco-visitante/endereco-visitante';
import { Usuario } from '../../../models/Usuario';
import { EnderecoVisitante } from '../../../models/EnderecoVisitante';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-form-endereco-visitante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-endereco-visitante.html',
  styleUrls: ['./form-endereco-visitante.css']
})
export class FormEnderecoVisitante implements OnInit {

  enderecoForm: FormGroup;
  usuarioLogado: Usuario | null = null;
  enderecoExistente: EnderecoVisitante | null = null;
  isEditMode = false;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private enderecoService: EnderecoVisitanteService,
    private alertaService: AlertaService,
    private router: Router
  ) {
    this.enderecoForm = new FormGroup({
      cepVisitante: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]),
      estadoVisitante: new FormControl('', Validators.required),
      cidadeVisitante: new FormControl('', Validators.required),
      bairroVisitante: new FormControl('', Validators.required),
      ruaVisitante: new FormControl('', Validators.required),
      numeroVisitante: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.loggedUser;
    if (this.usuarioLogado) {
      // Simulação: busca o primeiro endereço associado ao usuário.
      // Em um cenário real, a API teria um endpoint /endereco/por-usuario/{id}
      this.enderecoService.getByUsuario(this.usuarioLogado.id!).subscribe({
        next: (enderecos) => {
          if (enderecos && enderecos.length > 0) {
            this.enderecoExistente = enderecos[0];
            this.isEditMode = true;
            this.enderecoForm.patchValue(this.enderecoExistente);
          }
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    } else {
      this.isLoading = false;
    }
  }
  
  // Getters para facilitar o acesso no template
  get cep() { return this.enderecoForm.get('cepVisitante'); }
  get estado() { return this.enderecoForm.get('estadoVisitante'); }
  get cidade() { return this.enderecoForm.get('cidadeVisitante'); }
  get bairro() { return this.enderecoForm.get('bairroVisitante'); }
  get rua() { return this.enderecoForm.get('ruaVisitante'); }
  get numero() { return this.enderecoForm.get('numeroVisitante'); }

  save(): void {
    if (this.enderecoForm.invalid || !this.usuarioLogado) {
      this.enderecoForm.markAllAsTouched();
      return;
    }

    const enderecoParaSalvar: any = { // Usamos 'any' para adicionar a propriedade 'usuario'
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
      error: () => {
        this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao salvar endereço.' });
      }
    });
  }
}