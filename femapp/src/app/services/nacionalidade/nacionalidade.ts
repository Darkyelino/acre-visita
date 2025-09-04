import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';
import { NacionalidadeVisitante } from '../../models/NacionalidadeVisitante';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadeService {

  private readonly apiUrl = `${environment.API_URL}/nacionalidade-visitante/`;

  constructor(private http: HttpClient) { }

  /**
   * Busca uma lista paginada de nacionalidades.
   * @param paginacao Objeto com as informações de página, tamanho e ordenação.
   * @param termoBusca (Opcional) Termo para pesquisar no nome da nacionalidade.
   */
  get(paginacao: RequisicaoPaginada, termoBusca?: string): Observable<RespostaPaginada<NacionalidadeVisitante>> {
    let params = new HttpParams()
      .set('page', paginacao.page.toString())
      .set('size', paginacao.size.toString());
      
    if (termoBusca) {
      params = params.set('termoBusca', termoBusca);
    }

    paginacao.sort.forEach(campo => {
      params = params.append('sort', campo);
    });

    return this.http.get<RespostaPaginada<NacionalidadeVisitante>>(this.apiUrl, { params });
  }

  /**
   * Busca todas as nacionalidades (sem paginação), ideal para preencher formulários.
   */
  getAll(): Observable<RespostaPaginada<NacionalidadeVisitante>> {
    const params = new HttpParams().set('unpaged', 'true');
    return this.http.get<RespostaPaginada<NacionalidadeVisitante>>(this.apiUrl, { params });
  }

  /**
   * Busca uma nacionalidade específica pelo seu ID.
   * @param id O ID da nacionalidade.
   */
  getById(id: number): Observable<NacionalidadeVisitante> {
    return this.http.get<NacionalidadeVisitante>(`${this.apiUrl}${id}`);
  }

  /**
   * Salva uma nova nacionalidade (criar) ou atualiza uma existente (editar).
   * @param nacionalidade O objeto da nacionalidade a ser salvo.
   */
  save(nacionalidade: NacionalidadeVisitante): Observable<NacionalidadeVisitante> {
    if (nacionalidade.idNacionalidade) {
      return this.http.put<NacionalidadeVisitante>(`${this.apiUrl}${nacionalidade.idNacionalidade}`, nacionalidade);
    }
    return this.http.post<NacionalidadeVisitante>(this.apiUrl, nacionalidade);
  }

  /**
   * Deleta (excluir) uma nacionalidade pelo seu ID.
   * @param id O ID da nacionalidade a ser deletada.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}