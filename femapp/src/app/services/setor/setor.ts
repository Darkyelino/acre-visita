import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { Setor } from '../../models/Setor';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  private readonly apiUrl = `${environment.API_URL}/setor/`;

  constructor(private http: HttpClient) { }

  /**
   * ✅ NOVO: Busca uma lista paginada de setores.
   * @param paginacao Objeto com as informações de página, tamanho e ordenação.
   * @param termoBusca (Opcional) Termo para pesquisar no nome do setor.
   */
  get(paginacao: RequisicaoPaginada, termoBusca?: string): Observable<RespostaPaginada<Setor>> {
    let params = new HttpParams()
      .set('page', paginacao.page.toString())
      .set('size', paginacao.size.toString());
      
    if (termoBusca) {
      params = params.set('termoBusca', termoBusca);
    }

    paginacao.sort.forEach(campo => {
      params = params.append('sort', campo);
    });

    return this.http.get<RespostaPaginada<Setor>>(this.apiUrl, { params });
  }

  /**
   * ✅ MELHORADO: Busca todos os setores (sem paginação) usando HttpParams.
   * Ideal para preencher formulários.
   */
  getAll(): Observable<RespostaPaginada<Setor>> {
    const params = new HttpParams().set('unpaged', 'true');
    return this.http.get<RespostaPaginada<Setor>>(this.apiUrl, { params });
  }

  /**
   * ✅ NOVO: Busca um setor específico pelo seu ID.
   * @param id O ID do setor.
   */
  getById(id: number): Observable<Setor> {
    return this.http.get<Setor>(`${this.apiUrl}${id}`);
  }

  /**
   * ✅ MELHORADO: Salva (cria ou edita) um setor com uma chamada PUT mais RESTful.
   * @param setor O objeto de setor a ser salvo.
   */
  save(setor: Setor): Observable<Setor> {
    if (setor.idSetor) {
      return this.http.put<Setor>(`${this.apiUrl}${setor.idSetor}`, setor);
    }
    return this.http.post<Setor>(this.apiUrl, setor);
  }

  /**
   * ✅ NOVO: Deleta (excluir) um setor pelo seu ID.
   * @param id O ID do setor a ser deletado.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}