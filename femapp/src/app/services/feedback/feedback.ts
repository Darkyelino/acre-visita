import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Feedback } from '../../models/Feedback';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private readonly apiUrl = `${environment.API_URL}/feedback/`;

  constructor(private http: HttpClient) { }

  /**
   * Busca uma lista paginada de todos os feedbacks.
   * @param paginacao Objeto com as informações de página, tamanho e ordenação.
   * @param termoBusca (Opcional) Termo para futuras buscas no texto do feedback.
   */
  get(paginacao: RequisicaoPaginada, termoBusca?: string): Observable<RespostaPaginada<Feedback>> {
    let params = new HttpParams()
      .set('page', paginacao.page.toString())
      .set('size', paginacao.size.toString());
      
    if (termoBusca) {
      params = params.set('termoBusca', termoBusca);
    }

    paginacao.sort.forEach(campo => {
      params = params.append('sort', campo);
    });

    return this.http.get<RespostaPaginada<Feedback>>(this.apiUrl, { params });
  }

  /**
   * Busca um feedback específico pelo seu ID.
   * @param id O ID do feedback.
   */
  getById(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}${id}`);
  }

  /**
   * Salva um novo feedback (criar) ou atualiza um existente (editar).
   * @param feedback O objeto de feedback a ser salvo.
   */
  save(feedback: Feedback): Observable<Feedback> {
    if (feedback.idFeedback) {
      // Se o ID existe, é uma atualização (PUT)
      return this.http.put<Feedback>(`${this.apiUrl}${feedback.idFeedback}`, feedback);
    }
    // Se não há ID, é uma criação (POST)
    return this.http.post<Feedback>(this.apiUrl, feedback);
  }

  /**
   * Deleta (excluir) um feedback pelo seu ID.
   * @param id O ID do feedback a ser deletado.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}