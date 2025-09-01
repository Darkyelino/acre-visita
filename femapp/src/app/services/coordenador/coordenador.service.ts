import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordenador } from '../../models/Coordenador';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RespostaPaginada } from '../../models/RespostaPaginada';

@Injectable({
  providedIn: 'root'
})
export class CoordenadorService {

  private apiUrl: string = environment.API_URL + '/coordenador/';

  constructor(private http: HttpClient) { }

  getCoordenadores(): Observable<RespostaPaginada<Coordenador>> {
    const url = this.apiUrl + '?unpaged=true';
    return this.http.get<RespostaPaginada<Coordenador>>(url);
  }
}