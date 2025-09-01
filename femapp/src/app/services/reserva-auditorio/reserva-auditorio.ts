import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';
import { ReservaAuditorio } from '../../models/ReservaAuditorio';

@Injectable({
  providedIn: 'root'
})
export class ReservaAuditorioService {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.API_URL + '/reservas-auditorio/';

  /**
   * NOVO MÉTODO: Busca e filtra reservas de forma combinada.
   * Este método substitui a necessidade de ter um `get` e um `getByStatus` separados.
   * @param termoBusca Termo para pesquisar no nome do evento ou visitante (opcional).
   * @param status Status para filtrar as reservas (opcional).
   * @param paginacao Configurações de paginação (opcional).
   * @returns Um Observable com a resposta paginada.
   */
  buscarReservas(
    termoBusca?: string,
    status?: string,
    paginacao?: RequisicaoPaginada
  ): Observable<RespostaPaginada<ReservaAuditorio>> {
    let url = this.apiUrl + 'filtrar'; // Assumindo um endpoint de filtro mais genérico no backend
    const params: string[] = [];

    if (termoBusca) {
      params.push(`termo=${termoBusca}`);
    }

    if (status && status !== 'TODOS') { // Ignora o filtro se for 'TODOS'
      params.push(`status=${status}`);
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
      params.push('unpaged=true'); // Padrão para buscar todos os resultados
    }

    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    return this.http.get<RespostaPaginada<ReservaAuditorio>>(url);
  }

  getById(id: number): Observable<ReservaAuditorio> {
    let url = this.apiUrl + id;
    return this.http.get<ReservaAuditorio>(url);
  }

  save(objeto: ReservaAuditorio): Observable<ReservaAuditorio> {
    let url = this.apiUrl;
    if (objeto.idReserva) {
      return this.http.put<ReservaAuditorio>(url, objeto);
    } else {
      return this.http.post<ReservaAuditorio>(url, objeto);
    }
  }

  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }

  aprovar(id: number): Observable<ReservaAuditorio> {
    let url = `${this.apiUrl}${id}/aprovar`;
    return this.http.patch<ReservaAuditorio>(url, {});
  }

  recusar(id: number): Observable<ReservaAuditorio> {
    let url = `${this.apiUrl}${id}/recusar`;
    return this.http.patch<ReservaAuditorio>(url, {});
  }
}
