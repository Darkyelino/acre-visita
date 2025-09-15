import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { EnderecoVisitante } from '../../models/EnderecoVisitante';

@Injectable({
  providedIn: 'root'
})
export class EnderecoVisitanteService {

  private readonly apiUrl = `${environment.API_URL}/enderecoVisitante/`;

  constructor(private http: HttpClient) { }

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
}