import { HttpClient, HttpParams } from '@angular/common/http';
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

  private readonly apiUrl = `${environment.API_URL}/auditorio/`;

  constructor(private http: HttpClient) { }

  /**
   * Busca uma lista paginada de auditórios, com filtro opcional por nome.
   * @param termoBusca O nome ou parte do nome a ser pesquisado.
   * @param paginacao Configurações de página, tamanho e ordenação.
   * @returns Uma página de Auditórios.
   */
  get(termoBusca?: string, paginacao?: RequisicaoPaginada): Observable<RespostaPaginada<Auditorio>> {
    
    let params = new HttpParams();

    if (termoBusca) {
      params = params.set('termoBusca', termoBusca);
    }

    if (paginacao) {
      params = params.set('page', paginacao.page);
      params = params.set('size', paginacao.size);
      paginacao.sort.forEach(campo => {
        params = params.append('sort', campo);
      });
    } else {
      params = params.set('unpaged', 'true');
    }

    return this.http.get<RespostaPaginada<Auditorio>>(this.apiUrl, { params });
  }

  /**
   * Busca um auditório específico pelo seu ID.
   * @param id O ID do auditório.
   */
  getById(id: number): Observable<Auditorio> {
    return this.http.get<Auditorio>(`${this.apiUrl}${id}`);
  }

  /**
   * Salva um novo auditório (POST) ou atualiza um existente (PUT).
   * @param objeto O objeto do auditório a ser salvo.
   */
  save(objeto: Auditorio): Observable<Auditorio> {
    if (objeto.idAuditorio) {
      return this.http.put<Auditorio>(`${this.apiUrl}${objeto.idAuditorio}`, objeto);
    }
    return this.http.post<Auditorio>(this.apiUrl, objeto);
  }

  /**
   * Deleta um auditório pelo seu ID.
   * @param id O ID do auditório a ser deletado.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}