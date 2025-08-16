import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';
import { EnderecoVisitante } from '../../models/EnderecoVisitante';

@Injectable({
  providedIn: 'root'
})
export class EnderecoVisitanteService {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.API_URL + '/endereco-visitante/';

  // ================= BUSCAR ENDEREÇOS (com busca e paginação) =================
  get(termoBusca?: string, paginacao?: RequisicaoPaginada): Observable<RespostaPaginada<EnderecoVisitante>> {
    let url = this.apiUrl;
    const params: string[] = [];

    // Adiciona termo de busca, se fornecido
    if (termoBusca) {
      params.push(`termoBusca=${termoBusca}`);
    }

    // Adiciona parâmetros de paginação, se fornecidos
    if (paginacao) {
      params.push(`page=${paginacao.page}`);
      params.push(`size=${paginacao.size}`);

      if (paginacao.sort && paginacao.sort.length > 0) {
        paginacao.sort.forEach(campo => {
          params.push(`sort=${campo}`);
        });
      }
    } else {
      // Caso não haja paginação, desabilita paginação no servidor
      params.push('unpaged=true');
    }

    // Monta URL final
    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    return this.http.get<RespostaPaginada<EnderecoVisitante>>(url);
  }

  // ================= BUSCAR POR ID =================
  getById(id: number): Observable<EnderecoVisitante> {
    let url = this.apiUrl + id;
    return this.http.get<EnderecoVisitante>(url);
  }

  // ================= SALVAR OU ATUALIZAR =================
  save(objeto: EnderecoVisitante): Observable<EnderecoVisitante> {
    let url = this.apiUrl;
    if (objeto.idEnderecoVisitante) {
      return this.http.put<EnderecoVisitante>(url, objeto);
    } else {
      return this.http.post<EnderecoVisitante>(url, objeto);
    }
  }

  // ================= DELETAR POR ID =================
  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }
}
