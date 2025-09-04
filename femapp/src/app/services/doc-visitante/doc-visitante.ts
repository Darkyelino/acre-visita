import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DocVisitante } from '../../models/DocVisitante';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';

@Injectable({
  providedIn: 'root'
})
export class DocVisitanteService {

  private readonly apiUrl = `${environment.API_URL}/doc-visitante/`;

  constructor(private http: HttpClient) { }

  /**
   * Busca uma lista paginada de todos os documentos.
   * @param paginacao Objeto com as informações de página, tamanho e ordenação.
   */
  get(paginacao: RequisicaoPaginada): Observable<RespostaPaginada<DocVisitante>> {
    const params = new HttpParams()
      .set('page', paginacao.page.toString())
      .set('size', paginacao.size.toString());

    return this.http.get<RespostaPaginada<DocVisitante>>(this.apiUrl, { params });
  }

  /**
   * Busca um documento específico pelo seu próprio ID.
   * @param id O ID do documento.
   */
  getById(id: number): Observable<DocVisitante> {
    return this.http.get<DocVisitante>(`${this.apiUrl}${id}`);
  }

  /**
   * Busca um documento pelo ID do usuário associado.
   * Retorna 'null' se o usuário não tiver um documento (erro 404).
   * @param usuarioId O ID do usuário.
   */
  getByUsuarioId(usuarioId: number): Observable<DocVisitante | null> {
    return this.http.get<DocVisitante>(`${this.apiUrl}por-usuario/${usuarioId}`).pipe(
      catchError(error => {
        // Se a API retornar 404 (Não Encontrado), retornamos 'null' para o componente.
        if (error.status === 404) {
          return of(null);
        }
        // Para outros erros, nós os relançamos.
        throw error;
      })
    );
  }

  /**
   * Salva um novo documento (POST) ou atualiza um existente (PUT).
   * @param documento O objeto do documento a ser salvo.
   */
  save(documento: DocVisitante): Observable<DocVisitante> {
    if (documento.idDocumento) {
      // Se o ID existe, é uma atualização (editar)
      return this.http.put<DocVisitante>(`${this.apiUrl}${documento.idDocumento}`, documento);
    }
    // Se não há ID, é uma criação (salvar novo)
    return this.http.post<DocVisitante>(this.apiUrl, documento);
  }

  /**
   * Deleta (excluir) um documento pelo seu ID.
   * @param id O ID do documento a ser deletado.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}