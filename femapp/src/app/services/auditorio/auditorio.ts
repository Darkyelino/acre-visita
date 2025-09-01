import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';
import { Auditorio } from '../../models/Auditorio';

@Injectable({
  providedIn: 'root'
})
export class AuditorioService {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.API_URL + '/auditorio/';

  get(termoBusca?: string, paginacao?: RequisicaoPaginada): Observable<RespostaPaginada<Auditorio>> {
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

    return this.http.get<RespostaPaginada<Auditorio>>(url);
  }

  getById(id: number): Observable<Auditorio> {
    let url = this.apiUrl + id;
    return this.http.get<Auditorio>(url);
  }

  save(objeto: Auditorio): Observable<Auditorio> {
    let url = this.apiUrl;
    if (objeto.idAuditorio) {
      return this.http.put<Auditorio>(url, objeto);
    } else {
      return this.http.post<Auditorio>(url, objeto);
    }
  }

  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }
}
