// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth';

export const authGuard: CanActivateFn = (route, state) => {
  
  console.log('🛡️ O AuthGuard está sendo executado!'); 
  
  const authService = inject(AuthService);
  const router = inject(Router);

  // ✅ ADICIONE ESTAS DUAS LINHAS PARA VER A DECISÃO:
  console.log('O serviço de autenticação diz que isLoggedIn é:', authService.isLoggedIn);
  console.log('Usuário logado segundo o serviço:', authService.loggedUser);

  if (authService.isLoggedIn) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};