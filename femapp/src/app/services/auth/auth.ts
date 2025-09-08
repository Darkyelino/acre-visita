import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario } from '../../models/Usuario'; // ✅ ALTERADO para o novo modelo
import { UsuarioService } from '../usuario/usuario'; // ✅ ALTERADO para o novo serviço
import { LoginRequest } from '../../models/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ✅ Agora armazena um 'Usuario' ou nulo.
  private userSubject = new BehaviorSubject<Usuario | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private usuarioService: UsuarioService, // ✅ ALTERADO para o novo serviço
    private router: Router
  ) {
    const savedUser = localStorage.getItem('loggedUser');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
  }

  login(credenciais: LoginRequest): Observable<Usuario> {
    // ✅ Chama o método de login do novo serviço unificado
    return this.usuarioService.login(credenciais).pipe(
      tap(user => {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        this.userSubject.next(user);
        this.router.navigate(['/visita/fazer']); // Redireciona para a página de fazer visita após o login
      })
    );
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  get loggedUser(): Usuario | null {
    return this.userSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }
}