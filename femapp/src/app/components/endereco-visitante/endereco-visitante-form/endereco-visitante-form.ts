import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EnderecoVisitanteService } from '../../../services/endereco-visitante/endereco-visitante';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { EnderecoVisitante } from '../../../models/EnderecoVisitante';
import { ETipoAlerta } from '../../../models/ETipoAlerta';
import { Visitante } from '../../../models/Visitante';
import { VisitanteService } from '../../../services/visitante/visitante';
import { of, catchError, throwError } from 'rxjs'; // Importação de operadores de RxJS

@Component({
  selector: 'app-endereco-visitante-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './endereco-visitante-form.html',
  styleUrl: './endereco-visitante-form.css'
})
export class EnderecoVisitanteForm implements OnInit {

  visitantes: Visitante[] = [];

  // O FormGroup agora inclui o controle 'visitante'.
  formEnderecoVisitante = new FormGroup({
    visitante: new FormControl<Visitante | null>(null, Validators.required),
    cepVisitante: new FormControl<string | null>(null, Validators.required),
    estadoVisitante: new FormControl<string | null>(null, Validators.required),
    cidadeVisitante: new FormControl<string | null>(null, Validators.required),
    bairroVisitante: new FormControl<string | null>(null, Validators.required),
    ruaVisitante: new FormControl<string | null>(null, Validators.required),
    numeroVisitante: new FormControl<string | null>(null, Validators.required)
  });
  
  // A propriedade 'registro' foi atualizada para incluir a entidade 'visitante'.
  registro: EnderecoVisitante = <EnderecoVisitante>{};

  constructor(
    private servico: EnderecoVisitanteService,
    private servicoVisitante: VisitanteService, // O serviço para buscar os visitantes
    private router: Router,
    private route: ActivatedRoute,
    private servicoAlerta: AlertaService
  ) {}

  ngOnInit(): void {
    // Carrega a lista de visitantes ao inicializar o componente.
    this.carregarVisitantes();

    // Verifica se há um ID nos parâmetros para carregar um endereço existente
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.getById(+id).subscribe({
        next: (resposta: EnderecoVisitante) => {
          this.registro = resposta;
          this.formEnderecoVisitante.patchValue(this.registro);
        }
      });
    }
  }

  // Método para obter os controles do formulário de forma mais fácil.
  get form() {
    return this.formEnderecoVisitante.controls;
  }

  // Método para carregar a lista de visitantes do back-end.
  carregarVisitantes(): void {
    // Implementação funcional que faz uma chamada real ao VisitanteService.
    this.servicoVisitante.get().pipe(
      // Adiciona um tratamento de erro para garantir a estabilidade do aplicativo
      catchError(error => {
        console.error('Erro ao carregar visitantes:', error);
        // Emite um alerta para o usuário sobre o erro
        this.servicoAlerta.enviarAlerta({
          tipo: ETipoAlerta.ERRO,
          mensagem: 'Erro ao carregar a lista de visitantes.'
        });
        // Retorna um observable com um array vazio para não quebrar a aplicação
        return of({ content: [], totalElements: 0, totalPages: 0 });
      })
    ).subscribe(data => {
      // Acessa a propriedade 'content' da resposta paginada
      this.visitantes = data.content;
    });
  }

  save(): void {
    if (this.formEnderecoVisitante.valid) {
      this.registro = Object.assign(this.registro, this.formEnderecoVisitante.value);
      this.servico.save(this.registro).subscribe({
        complete: () => {
          this.router.navigate(['/enderecoVisitante/form']);
          this.servicoAlerta.enviarAlerta({
            tipo: ETipoAlerta.SUCESSO,
            mensagem: 'Endereço salvo com sucesso!'
          });
        }
      });
    } else {
      this.formEnderecoVisitante.markAllAsTouched();
    }
  }
}
