import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Visita } from '../../models/Visita';
import { Usuario } from '../../models/Usuario';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';

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
   * MÉTODO ESPECIAL: Busca os USUÁRIOS que fizeram check-in em uma data específica.
   * Por padrão, a API usará a data de hoje se nenhuma for enviada.
   * @param paginacao Objeto com as informações de página e tamanho.
   * @returns Uma página de Usuários (e não de Visitas).
   */
  getVisitantesDoDia(paginacao: RequisicaoPaginada): Observable<RespostaPaginada<Usuario>> {
    const url = `${this.apiUrl}visitantes-do-dia`;
    
    let params = new HttpParams()
      .set('page', paginacao.page.toString())
      .set('size', paginacao.size.toString());

    paginacao.sort.forEach(campo => {
      params = params.append('sort', campo);
    });
      
    return this.http.get<RespostaPaginada<Usuario>>(url, { params });
  }
}