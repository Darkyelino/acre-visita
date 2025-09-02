import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { NacionalidadeVisitante } from '../../models/NacionalidadeVisitante';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadeService {

  private readonly apiUrl = `${environment.API_URL}/nacionalidade-visitante/`;

  constructor(private http: HttpClient) { }

  /** Busca todas as nacionalidades (sem paginação), ideal para preencher formulários. */
  getAll(): Observable<RespostaPaginada<NacionalidadeVisitante>> {
    const params = new HttpParams().set('unpaged', 'true');
    return this.http.get<RespostaPaginada<NacionalidadeVisitante>>(this.apiUrl, { params });
  }
}