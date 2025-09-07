import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RespostaPaginada } from '../../models/RespostaPaginada';
import { Setor } from '../../models/Setor';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = environment.API_URL + '/setor/';

  // Busca todos os setores sem paginação
  getAll(): Observable<RespostaPaginada<Setor>> {
    const url = this.apiUrl + '?unpaged=true';
    return this.http.get<RespostaPaginada<Setor>>(url);
  }

  // MÉTODO PARA SALVAR/ATUALIZAR
  save(setor: Setor): Observable<Setor> {
    if (setor.idSetor) {
      return this.http.put<Setor>(this.apiUrl, setor);
    }
    return this.http.post<Setor>(this.apiUrl, setor);
  }
}