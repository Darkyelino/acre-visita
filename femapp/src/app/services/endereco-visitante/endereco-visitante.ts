import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { EnderecoVisitante } from '../../models/EnderecoVisitante';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';

@Injectable({
  providedIn: 'root'
})
export class EnderecoVisitanteService {

  private readonly apiUrl = `${environment.API_URL}/enderecoVisitante/`;

  constructor(private http: HttpClient) { }

  /**
   * Busca uma lista paginada de endereços. Se a paginação não for fornecida,
   * busca todos os endereços (útil para o perfil do usuário).
   * @param paginacao (Opcional) Objeto com as informações de página e tamanho.
   * @param termoBusca (Opcional) Termo para pesquisar.
   */
  get(paginacao?: RequisicaoPaginada, termoBusca?: string): Observable<RespostaPaginada<EnderecoVisitante>> {
    let params = new HttpParams();
    
    if (termoBusca) {
      params = params.set('termoBusca', termoBusca);
    }
    
    if (paginacao) {
      params = params.set('page', paginacao.page.toString());
      params = params.set('size', paginacao.size.toString());
    } else {
      params = params.set('unpaged', 'true');
    }

    return this.http.get<RespostaPaginada<EnderecoVisitante>>(this.apiUrl, { params });
  }

  /**
   * Busca um endereço específico pelo seu ID.
   * @param id O ID do endereço.
   */
  getById(id: number): Observable<EnderecoVisitante> {
    return this.http.get<EnderecoVisitante>(`${this.apiUrl}${id}`);
  }

   /**
   * Busca os endereços de um usuário específico.
   * Assumindo que a API será estendida para suportar este filtro.
   * Por enquanto, este método pode não ser usado se cada usuário só tem um endereço.
   */
    getByUsuario(usuarioId: number): Observable<EnderecoVisitante[]> {
      const params = new HttpParams().set('usuarioId', usuarioId.toString());
      return this.http.get<EnderecoVisitante[]>(this.apiUrl, { params });
    }

  /**
   * Salva um novo endereço (POST) ou atualiza um existente (PUT).
   * @param endereco O objeto de endereço a ser salvo.
   */
  save(endereco: EnderecoVisitante): Observable<EnderecoVisitante> {
    if (endereco.idEnderecoVisitante) {
      // Atualização (PUT) com ID na URL
      return this.http.put<EnderecoVisitante>(`${this.apiUrl}${endereco.idEnderecoVisitante}`, endereco);
    }
    // Criação (POST)
    return this.http.post<EnderecoVisitante>(this.apiUrl, endereco);
  }
  
  /**
   * Deleta um endereço pelo seu ID.
   * @param id O ID do endereço a ser deletado.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}