import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Visitante } from '../../models/Visitante';
import { Router } from '@angular/router';

// Interface para a requisição de login
interface LoginRequest {
  email: string;
  senha: string;
}

// Interface para a resposta da API (espera-se um token JWT)
interface LoginResponse {
  token: string;
  usuario: Visitante; // Opcional: a API pode retornar os dados do usuário
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.API_URL + '/auth'; // Ajuste para o seu endpoint de autenticação
  private readonly TOKEN_KEY = 'auth_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.setSession(response))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  private setSession(authResult: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResult.token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
