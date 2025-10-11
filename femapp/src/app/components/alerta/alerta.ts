import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Alerta } from '../../models/Alerta';
import { AlertaService } from '../../services/alerta/alerta';
import { ETipoAlerta } from '../../models/ETipoAlerta';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerta.html',
  styleUrls: ['./alerta.css']
})
export class AlertaComponent implements OnInit, OnDestroy {
  alerta: Alerta | null = null;
  private subscription: Subscription;

  constructor(private alertaService: AlertaService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.alertaService.receberAlerta().subscribe(alerta => {
      this.alerta = alerta;
      // O alerta desaparecerá após 5 segundos
      setTimeout(() => this.alerta = null, 5000); 
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fecharAlerta(): void {
    this.alerta = null;
  }

  // Define a classe CSS com base no tipo de alerta
  getClasseAlerta(): string {
    if (!this.alerta) return '';
    
    switch (this.alerta.tipo) {
      case ETipoAlerta.SUCESSO:
        return 'alerta-sucesso';
      case ETipoAlerta.ERRO:
        return 'alerta-erro';
      case ETipoAlerta.INFO:
        return 'alerta-info';
      default:
        return '';
    }
  }
}