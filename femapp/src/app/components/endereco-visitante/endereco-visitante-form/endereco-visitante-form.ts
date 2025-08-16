import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EnderecoVisitanteService } from '../../../services/endereco-visitante/endereco-visitante';
import { AlertaService } from '../../../services/alerta/alerta.service';
import { EnderecoVisitante } from '../../../models/EnderecoVisitante';
import { ETipoAlerta } from '../../../models/ETipoAlerta';

@Component({
  selector: 'app-endereco-visitante-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './endereco-visitante-form.html',
  styleUrl: './endereco-visitante-form.css'
})
export class EnderecoVisitanteFormComponent implements OnInit {
  constructor(
    private servico: EnderecoVisitanteService,
    private router: Router,
    private route: ActivatedRoute,
    private servicoAlerta: AlertaService
  ) {}

  ngOnInit(): void {
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

  formEnderecoVisitante = new FormGroup({
    cepVisitante: new FormControl<string | null>(null, Validators.required),
    estadoVisitante: new FormControl<string | null>(null, Validators.required),
    cidadeVisitante: new FormControl<string | null>(null, Validators.required),
    bairroVisitante: new FormControl<string | null>(null, Validators.required),
    ruaVisitante: new FormControl<string | null>(null, Validators.required),
    numeroVisitante: new FormControl<string | null>(null, Validators.required)
  });

  get form() {
    return this.formEnderecoVisitante.controls;
  }

  registro: EnderecoVisitante = <EnderecoVisitante>{};

  save(): void {
    this.registro = Object.assign(this.registro, this.formEnderecoVisitante.value);
    this.servico.save(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/endereco-visitante']);
        this.servicoAlerta.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: 'Endereço salvo com sucesso!'
        });
      }
    });
  }
}
