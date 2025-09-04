import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Filmoteca } from '../../models/Filmoteca';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';

@Injectable({
  providedIn: 'root'
})
export class FilmotecaService {

  private readonly apiUrl = `${environment.API_URL}/filmoteca/`;

  constructor(private http: HttpClient) { }

  /**
   * Busca uma lista paginada de todas as sugestões da filmoteca.
   * @param paginacao Objeto com as informações de página, tamanho e ordenação.
   * @param termoBusca (Opcional) Termo para pesquisar no texto da sugestão.
   */
  get(paginacao: RequisicaoPaginada, termoBusca?: string): Observable<RespostaPaginada<Filmoteca>> {
    let params = new HttpParams()
      .set('page', paginacao.page.toString())
      .set('size', paginacao.size.toString());
      
    if (termoBusca) {
      params = params.set('termoBusca', termoBusca);
    }

    paginacao.sort.forEach(campo => {
      params = params.append('sort', campo);
    });

    return this.http.get<RespostaPaginada<Filmoteca>>(this.apiUrl, { params });
  }

  /**
   * Busca uma sugestão específica pelo seu ID.
   * @param id O ID da sugestão.
   */
  getById(id: number): Observable<Filmoteca> {
    return this.http.get<Filmoteca>(`${this.apiUrl}${id}`);
  }

  /**
   * Salva uma nova sugestão (criar) ou atualiza uma existente (editar).
   * @param sugestao O objeto da sugestão a ser salvo.
   */
  save(sugestao: Filmoteca): Observable<Filmoteca> {
    if (sugestao.idFilmoteca) {
      // Se o ID existe, é uma atualização (PUT)
      return this.http.put<Filmoteca>(`${this.apiUrl}${sugestao.idFilmoteca}`, sugestao);
    }
    // Se não há ID, é uma criação (POST)
    return this.http.post<Filmoteca>(this.apiUrl, sugestao);
  }

  /**
   * Deleta (excluir) uma sugestão pelo seu ID.
   * @param id O ID da sugestão a ser deletada.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}