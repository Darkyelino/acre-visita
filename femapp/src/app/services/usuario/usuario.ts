import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs'; // ✅ Importe o operador 'map'
import { environment } from '../../../environments/environment';
import { Usuario } from '../../models/Usuario';
import { LoginRequest } from '../../models/LoginRequest';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { RequisicaoPaginada } from '../../models/RequisicaoPaginada';
import { EPapel } from '../../models/EPapel';

// Interface para representar o DTO de requisição (enviado PARA o back-end)
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

  /**
   * ✅ MÉTODO PRIVADO PARA "RE-HIDRATAR" O USUÁRIO
   * Pega a resposta "achatada" da API e a transforma no modelo aninhado do front-end.
   */
  private rehydrateUsuario(userResponse: any): Usuario {
    const usuario: Usuario = { ...userResponse };

    // Se a resposta contiver 'setorId', cria o objeto 'setor' aninhado
    if (userResponse.setorId && userResponse.setorNome) {
      usuario.setor = {
        idSetor: userResponse.setorId,
        nomeSetor: userResponse.setorNome,
        tipoSetor: '' // tipoSetor não vem no DTO de resposta, mas o modelo precisa dele.
      };
    }

    // Faz o mesmo para nacionalidade, para garantir consistência
    if (userResponse.nacionalidadeId && userResponse.nacionalidadeNome) {
      usuario.nacionalidade = {
        idNacionalidade: userResponse.nacionalidadeId,
        nacionalidade: userResponse.nacionalidadeNome
      };
    }
    return usuario;
  }

  login(credenciais: LoginRequest): Observable<Usuario> {
    return this.http.post<any>(`${this.apiUrl}/login`, credenciais).pipe(
      map(response => this.rehydrateUsuario(response)) // ✅ Transforma a resposta
    );
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

    return this.http.get<RespostaPaginada<any>>(`${this.apiUrl}`, { params }).pipe(
      map(resposta => {
        // ✅ Transforma cada item dentro da lista paginada
        resposta.content = resposta.content.map(user => this.rehydrateUsuario(user));
        return resposta as RespostaPaginada<Usuario>;
      })
    );
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => this.rehydrateUsuario(response)) // ✅ Transforma a resposta
    );
  }

  save(usuario: Usuario): Observable<Usuario> {
    const requestPayload: UsuarioRequest = {
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      papel: usuario.papel,
      telefone: usuario.telefone,
      nacionalidadeId: usuario.nacionalidade?.idNacionalidade,
      setorId: usuario.setor?.idSetor
    };

    let responseObservable: Observable<any>;
    if (usuario.id) {
      responseObservable = this.http.put<any>(`${this.apiUrl}/${usuario.id}`, requestPayload);
    } else {
      responseObservable = this.http.post<any>(this.apiUrl, requestPayload);
    }
    
    // ✅ Transforma a resposta do save também
    return responseObservable.pipe(
      map(response => this.rehydrateUsuario(response))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}