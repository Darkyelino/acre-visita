import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth';
import { Usuario } from './models/Usuario';
import { Observable } from 'rxjs';
import { EPapel } from './models/EPapel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  usuarioLogado$: Observable<Usuario | null>;
  isSidebarOpen = false;
  userMenuOpen = false; // ✅ Variável para controlar o dropdown do usuário

  constructor(private authService: AuthService) {
    this.usuarioLogado$ = this.authService.user$;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
  
  // ✅ Métodos para controlar o dropdown do usuário
  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  closeUserMenu(): void {
    this.userMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeSidebar();
    this.closeUserMenu();
  }

  isVisitante(usuario: Usuario | null): boolean {
    return usuario?.papel === EPapel.VISITANTE;
  }

  isFuncionario(usuario: Usuario | null): boolean {
    if (!usuario) return false;
    return [EPapel.ATENDENTE, EPapel.COORDENADOR, EPapel.ADMINISTRADOR].includes(usuario.papel);
  }

  isCoordenadorOuAdmin(usuario: Usuario | null): boolean {
    if (!usuario) return false;
    return [EPapel.COORDENADOR, EPapel.ADMINISTRADOR].includes(usuario.papel);
  }
  
  isAdmin(usuario: Usuario | null): boolean {
    return usuario?.papel === EPapel.ADMINISTRADOR;
  }
}