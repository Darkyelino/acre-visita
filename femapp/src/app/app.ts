import { Component, HostBinding } from '@angular/core';
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

  @HostBinding('class.sidebar-is-open') get sidebarOpen() {
    return this.isSidebarOpen;
  }
  
  constructor(private authService: AuthService) {
    this.usuarioLogado$ = this.authService.user$;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeSidebar();
  }

  temPermissaoAdmin(usuario: Usuario | null): boolean {
    if (!usuario) return false;
    return [EPapel.ADMINISTRADOR, EPapel.COORDENADOR].includes(usuario.papel);
  }
}