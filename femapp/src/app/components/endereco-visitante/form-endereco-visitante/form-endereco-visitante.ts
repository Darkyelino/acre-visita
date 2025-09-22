import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { AlertaService } from '../../../services/alerta/alerta';
import { AuthService } from '../../../services/auth/auth';
import { EnderecoVisitanteService } from '../../../services/endereco-visitante/endereco-visitante';
import { Cep } from '../../../services/api/cep';
import { UsuarioService } from '../../../services/usuario/usuario'; // ✅ Importe o UsuarioService
import { Usuario } from '../../../models/Usuario';
import { EnderecoVisitante } from '../../../models/EnderecoVisitante';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-form-endereco-visitante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgxMaskDirective],
  templateUrl: './form-endereco-visitante.html',
  styleUrls: ['./form-endereco-visitante.css']
})
export class FormEnderecoVisitante implements OnInit {

  enderecoForm: FormGroup;
  // ✅ Esta variável guardará para qual usuário o endereço se destina
  usuarioAlvo: Usuario | null = null;
  isEditMode = false;
  enderecoId: number | null = null;
  isLoading = true;
  isBuscandoCep = false;

  constructor(
    private authService: AuthService,
    private enderecoService: EnderecoVisitanteService,
    private cepService: Cep,
    private alertaService: AlertaService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService // ✅ Injete o UsuarioService
  ) {
    this.enderecoForm = new FormGroup({
      cepVisitante: new FormControl('', [Validators.required]),
      estadoVisitante: new FormControl('', Validators.required),
      cidadeVisitante: new FormControl('', Validators.required),
      bairroVisitante: new FormControl('', Validators.required),
      ruaVisitante: new FormControl('', Validators.required),
      numeroVisitante: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    // Tenta pegar um 'usuarioId' dos parâmetros de consulta (quando um funcionário adiciona)
    const usuarioIdQueryParam = this.route.snapshot.queryParamMap.get('usuarioId');
    // Tenta pegar um 'id' dos parâmetros de rota (quando editando um endereço existente)
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) { // --- MODO DE EDIÇÃO ---
      this.isEditMode = true;
      this.enderecoId = +idParam;
      this.carregarDadosEndereco(this.enderecoId);
    } else if (usuarioIdQueryParam) { // --- MODO DE CRIAÇÃO (por funcionário) ---
      // Se um funcionário está criando, busca os dados do visitante alvo
      this.usuarioService.getById(+usuarioIdQueryParam).subscribe(usuario => {
        this.usuarioAlvo = usuario;
        this.isLoading = false;
      });
    } else { // --- MODO DE CRIAÇÃO (pelo próprio visitante) ---
      this.usuarioAlvo = this.authService.loggedUser;
      this.isLoading = false;
    }
  }
  
  carregarDadosEndereco(id: number): void {
    this.enderecoService.getById(id).subscribe({
      next: (endereco) => {
        this.usuarioAlvo = endereco.usuario; // O usuário alvo é o que já está no endereço
        this.enderecoForm.patchValue(endereco);
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }
  
  get cep() { return this.enderecoForm.get('cepVisitante'); }
  // ... outros getters

  buscarCep(): void {
    const cepValue = this.cep?.value;
    if (cepValue && this.cep?.valid) {
      this.isBuscandoCep = true;
      const cepNumerico = cepValue.replace(/\D/g, '');
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
    if (this.enderecoForm.invalid || !this.usuarioAlvo) {
      this.enderecoForm.markAllAsTouched();
      return;
    }

    // ✅ Monta o objeto para salvar usando o 'usuarioAlvo'
    const enderecoParaSalvar: any = {
      idEnderecoVisitante: this.enderecoId ?? undefined,
      ...this.enderecoForm.getRawValue(),
      usuario: this.usuarioAlvo // Associa ao usuário correto
    };

    this.enderecoService.save(enderecoParaSalvar).subscribe({
      next: () => {
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: `Endereço ${this.isEditMode ? 'atualizado' : 'cadastrado'} com sucesso!`
        });
        // Decide para onde voltar
        const rotaDeRetorno = this.authService.loggedUser?.papel === 'VISITANTE' ? '/perfil' : 'endereco/list';
        this.router.navigate([rotaDeRetorno]);
      },
      error: () => this.alertaService.enviarAlerta({ tipo: ETipoAlerta.ERRO, mensagem: 'Erro ao salvar endereço.' })
    });
  }
}