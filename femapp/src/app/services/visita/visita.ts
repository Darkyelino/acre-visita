import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Visita } from '../../models/Visita';
import { Usuario } from '../../models/Usuario';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';
import { EStatus } from '../../models/EStatus';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  private readonly apiUrl = `${environment.API_URL}/visita/`;

  constructor(private http: HttpClient) { }

  /**
   * Busca uma lista paginada de visitas.
   * @param paginacao Objeto com as informações de página, tamanho e ordenação.
   * @param termoBusca (Opcional) Termo para futuras buscas.
   * @returns Uma página de Visitas.
   */
  get(paginacao: RequisicaoPaginada, termoBusca?: string): Observable<RespostaPaginada<Visita>> {
    let params = new HttpParams()
      .set('page', paginacao.page.toString())
      .set('size', paginacao.size.toString());
      
    if (termoBusca) {
      params = params.set('termoBusca', termoBusca);
    }

    paginacao.sort.forEach(campo => {
      params = params.append('sort', campo);
    });

    return this.http.get<RespostaPaginada<Visita>>(this.apiUrl, { params });
  }

  /**
   * Busca uma visita específica pelo seu ID.
   * @param id O ID da visita.
   */
  getById(id: number): Observable<Visita> {
    return this.http.get<Visita>(`${this.apiUrl}${id}`);
  }

  /**
   * Salva uma nova visita (criar) ou atualiza uma existente (editar).
   * @param visita O objeto da visita a ser salvo.
   */
  save(visita: Visita): Observable<Visita> {
    if (visita.idVisita) {
      // Se o ID existe, é uma atualização (PUT)
      return this.http.put<Visita>(`${this.apiUrl}${visita.idVisita}`, visita);
    }
    // Se não há ID, é uma criação (POST)
    return this.http.post<Visita>(this.apiUrl, visita);
  }

  /**
   * Deleta (excluir) uma visita pelo seu ID.
   * @param id O ID da visita a ser deletada.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  /**
   * MÉTODO ESPECIAL: Busca visitas de um setor específico que correspondam a uma lista de status.
   */
  getVisitasPorSetorEStatus(setorId: number, statuses: EStatus[], paginacao: RequisicaoPaginada): Observable<RespostaPaginada<Visita>> {
    const url = `${this.apiUrl}por-setor-e-status`;
    
    let params = new HttpParams()
      .set('setorId', setorId.toString())
      .set('page', paginacao.page.toString())
      .set('size', paginacao.size.toString());

    statuses.forEach(status => {
      params = params.append('statuses', status);
    });
      
    return this.http.get<RespostaPaginada<Visita>>(url, { params });
  }

  /**
   * Atualiza apenas o status de uma visita.
   */
  atualizarStatus(id: number, status: EStatus): Observable<Visita> {
    const url = `${this.apiUrl}${id}/status`;
    const params = new HttpParams().set('status', status);
    return this.http.patch<Visita>(url, {}, { params });
  }
}