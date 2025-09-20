import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alerta } from '../../models/Alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  private controleAlerta: Subject<Alerta> = new Subject<Alerta>();

  constructor() { }

  enviarAlerta(alerta: Alerta): void {
    this.controleAlerta.next(alerta);
  }

  receberAlerta(): Observable<Alerta> {
    return this.controleAlerta.asObservable();
  }

}
