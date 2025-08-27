import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VisitanteService } from '../../../services/visitante/visitante'; // Ajuste o caminho se necessário
import { AlertaService } from '../../../services/alerta/alerta.service'; // Ajuste o caminho se necessário
import { Visitante } from '../../../models/Visitante';
import { NacionalidadeVisitante } from '../../../models/NacionalidadeVisitante'; // Importação necessária
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-cadastro-visitante',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    RouterLink, 
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-visitante.html',
  styleUrls: ['./cadastro-visitante.css'] // Corrigido para styleUrls
})
export class CadastroVisitante implements OnInit {

  // Agora é um array de objetos, para funcionar corretamente com o [ngValue]
  nacionalidades: NacionalidadeVisitante[] = []; 

  // O formulário agora espera um objeto NacionalidadeVisitante
  formVisitante = new FormGroup({
    nomeVisitante: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3)]),
    emailVisitante: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    telefoneVisitante: new FormControl<string | null>(null, Validators.required),
    senhaVisitante: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
    nacionalidadeVisitante: new FormControl<NacionalidadeVisitante | null>(null, Validators.required),
  });

  registro: Visitante = <Visitante>{};
  isEditMode: boolean = false;

  constructor(
    private servico: VisitanteService,
    // private nacionalidadeService: NacionalidadeService, // Você precisará de um serviço para buscar as nacionalidades
    private router: Router,
    private route: ActivatedRoute,
    private servicoAlerta: AlertaService
  ) {}

  ngOnInit(): void {
    // Simulação de busca de nacionalidades. O ideal é buscar via serviço.
    // Ex: this.nacionalidadeService.get().subscribe(dados => this.nacionalidades = dados);
    this.nacionalidades = [
      { idNacionalidade: 1, nacionalidade: 'Brasileira' },
      { idNacionalidade: 2, nacionalidade: 'Estrangeira' }
    ];

    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.servico.getById(+id).subscribe({
        next: (resposta: Visitante) => {
          this.registro = resposta;
          // O patchValue agora funciona corretamente com o objeto
          this.formVisitante.patchValue(this.registro); 
        }
      });
    }
  }

  // Atalho para acessar os controles do formulário no template
  get form() {
    return this.formVisitante.controls;
  }

  save(): void {
    if (this.formVisitante.invalid) {
      this.formVisitante.markAllAsTouched(); // Mostra erros se o form for inválido
      return;
    }
    
    // Mescla os dados do formulário com o registro existente (para o caso de edição)
    // CORREÇÃO: Usamos 'as Visitante' para afirmar ao TypeScript que, após a validação do formulário,
    // os valores não serão nulos e o objeto combinado corresponderá à interface Visitante.
    this.registro = { ...this.registro, ...this.formVisitante.value } as Visitante;

    this.servico.save(this.registro).subscribe({
      complete: () => {
        // Redireciona para uma página de sucesso ou lista
        this.router.navigate(['/login']); 
        this.servicoAlerta.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: `Visitante ${this.isEditMode ? 'atualizado' : 'cadastrado'} com sucesso!`
        });
      },
      error: (erro) => {
        this.servicoAlerta.enviarAlerta({
          tipo: ETipoAlerta.ERRO,
          mensagem: 'Erro ao salvar o visitante: ' + erro.message
        });
      }
    });
  }
}
