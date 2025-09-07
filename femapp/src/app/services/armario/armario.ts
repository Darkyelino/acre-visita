import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';
import { Armario } from '../../models/Armario';

@Injectable({
  providedIn: 'root'
})
export class ArmarioService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = environment.API_URL + '/armario/';

  get(termoBusca?: string, paginacao?: RequisicaoPaginada): Observable<RespostaPaginada<Armario>> {
    let url = this.apiUrl;
    const params: string[] = [];

    if (termoBusca) {
      params.push(`termoBusca=${termoBusca}`);
    }

    if (paginacao) {
      params.push(`page=${paginacao.page}`);
      params.push(`size=${paginacao.size}`);
      if (paginacao.sort && paginacao.sort.length > 0) {
        paginacao.sort.forEach(campo => params.push(`sort=${campo}`));
      }
    } else {
      params.push('unpaged=true');
    }

    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    return this.http.get<RespostaPaginada<Armario>>(url);
  }

  getById(id: number): Observable<Armario> {
    return this.http.get<Armario>(this.apiUrl + id);
  }

  save(objeto: Armario): Observable<Armario> {
    if (objeto.idArmario) {
      // Atualiza um armário existente
      return this.http.put<Armario>(this.apiUrl, objeto);
    } else {
      // Cria um novo armário
      return this.http.post<Armario>(this.apiUrl, objeto);
    }
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + id);
  }
}