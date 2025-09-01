import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Visitante } from '../../models/Visitante';
import { VisitanteService } from '../visitante/visitante';
import { LoginRequest } from '../../models/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // BehaviorSubject armazena o usuário logado e notifica os componentes que se inscreverem.
  private userSubject = new BehaviorSubject<Visitante | null>(null);
  public user$ = this.userSubject.asObservable(); // Acesso público observável

  constructor(
    private visitanteService: VisitanteService,
    private router: Router
  ) {
    // Ao iniciar o serviço, verifica se já existe um usuário no localStorage
    const savedUser = localStorage.getItem('loggedUser');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
  }

  login(credenciais: LoginRequest): Observable<Visitante> {
    return this.visitanteService.login(credenciais).pipe(
      tap(user => {
        // Se o login for bem-sucedido:
        localStorage.setItem('loggedUser', JSON.stringify(user)); // Salva no storage
        this.userSubject.next(user); // Atualiza o BehaviorSubject
        this.router.navigate(['/']); // Redireciona para a página principal
      })
    );
  }

  logout(): void {
    localStorage.removeItem('loggedUser'); // Remove do storage
    this.userSubject.next(null); // Atualiza o BehaviorSubject
    this.router.navigate(['/login']); // Redireciona para a página de login
  }

  get loggedUser(): Visitante | null {
    return this.userSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }
}