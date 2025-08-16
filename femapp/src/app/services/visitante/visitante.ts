import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';
import { Visitante } from '../../models/Visitante';

@Injectable({
  providedIn: 'root'
})
export class VisitanteService {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.API_URL + '/visitante/';

  get(termoBusca?: string, paginacao?: RequisicaoPaginada): Observable<RespostaPaginada<Visitante>> {
    let url = this.apiUrl;
    const params: string[] = [];

    if (termoBusca) {
      params.push(`termoBusca=${termoBusca}`);
    }

    if (paginacao) {
      params.push(`page=${paginacao.page}`);
      params.push(`size=${paginacao.size}`);

      if (paginacao.sort && paginacao.sort.length > 0) {
        paginacao.sort.forEach(campo => {
          params.push(`sort=${campo}`);
        });
      }
    } else {
      params.push('unpaged=true');
    }

    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    return this.http.get<RespostaPaginada<Visitante>>(url);
  }

  getById(id: number): Observable<Visitante> {
    let url = this.apiUrl + id;
    return this.http.get<Visitante>(url);
  }

  save(objeto: Visitante): Observable<Visitante> {
    let url = this.apiUrl;
    if (objeto.idVisitante) {
      return this.http.put<Visitante>(url, objeto);
    } else {
      return this.http.post<Visitante>(url, objeto);
    }
  }

  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }
}
