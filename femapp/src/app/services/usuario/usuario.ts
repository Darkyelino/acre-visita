import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Usuario } from '../../models/Usuario';
import { LoginRequest } from '../../models/LoginRequest';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl = `${environment.API_URL}/usuario`;

  constructor(private http: HttpClient) { }

  /**
   * Autentica um usuário na API.
   * @param credenciais Objeto com email e senha.
   * @returns Um Observable com os dados do usuário logado.
   */
  login(credenciais: LoginRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, credenciais);
  }

  /**
   * Busca uma lista paginada de usuários, com filtro opcional por nome.
   * @param termoBusca O nome ou parte do nome a ser pesquisado.
   * @param paginacao Configurações de página, tamanho e ordenação.
   * @returns Uma página de Usuários.
   */
  get(termoBusca?: string, paginacao?: RequisicaoPaginada): Observable<RespostaPaginada<Usuario>> {
    let params = new HttpParams();

    if (termoBusca) {
      params = params.set('termoBusca', termoBusca);
    }

    if (paginacao) {
      params = params.set('page', paginacao.page.toString());
      params = params.set('size', paginacao.size.toString());
      paginacao.sort.forEach(campo => {
        params = params.append('sort', campo);
      });
    }

    return this.http.get<RespostaPaginada<Usuario>>(`${this.apiUrl}`, { params });
  }

  /**
   * Busca um usuário específico pelo seu ID.
   * @param id O ID do usuário.
   */
  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  /**
   * Salva um novo usuário (POST) ou atualiza um existente (PUT).
   * @param usuario O objeto do usuário a ser salvo.
   */
  save(usuario: Usuario): Observable<Usuario> {
    if (usuario.id) {
      // Se o ID existe, é uma atualização (PUT)
      return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
    }
    // Se não há ID, é uma criação (POST)
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  /**
   * Deleta um usuário pelo seu ID.
   * @param id O ID do usuário a ser deletado.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}