import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Usuario } from '../../models/Usuario';
import { LoginRequest } from '../../models/LoginRequest';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';
import { EPapel } from '../../models/EPapel';

// Interface para representar o DTO do back-end
export interface UsuarioRequest {
  nome: string;
  email: string;
  senha?: string;
  papel: EPapel;
  telefone?: string;
  nacionalidadeId?: number;
  setorId?: number;
}


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl = `${environment.API_URL}/usuario`;

  constructor(private http: HttpClient) { }

  login(credenciais: LoginRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, credenciais);
  }

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

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  /**
   * Salva um novo usuário (POST) ou atualiza um existente (PUT).
   * @param usuario O objeto do usuário a ser salvo.
   */
  save(usuario: Usuario): Observable<Usuario> {
    
    // ======================= INÍCIO DA CORREÇÃO =======================
    // Mapeia o objeto do front-end para o formato esperado pelo DTO do back-end
    const requestPayload: UsuarioRequest = {
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      papel: usuario.papel,
      telefone: usuario.telefone,
      // Envia apenas o ID da nacionalidade, se existir
      nacionalidadeId: usuario.nacionalidade?.idNacionalidade,
      // Envia apenas o ID do setor, se existir
      setorId: usuario.setor?.idSetor
    };
    // ======================== FIM DA CORREÇÃO =========================

    if (usuario.id) {
      // Se o ID existe, é uma atualização (PUT)
      return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, requestPayload);
    }
    // Se não há ID, é uma criação (POST)
    return this.http.post<Usuario>(this.apiUrl, requestPayload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}