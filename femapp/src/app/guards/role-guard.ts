import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth';
import { AlertaService } from '../services/alerta/alerta.service';
import { ETipoAlerta } from '../models/ETipoAlerta';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const alertaService = inject(AlertaService);

  // Pega as 'roles' permitidas da definição da rota (veremos no Passo 3)
  const allowedRoles = route.data['roles'] as string[];

  const user = authService.loggedUser;

  // 1. Verifica se o usuário está logado
  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Verifica se a 'role' do usuário está na lista de permitidas
  if (allowedRoles && allowedRoles.includes(user.papel)) {
    return true; // Acesso Permitido!
  }

  // 3. Se não tiver a permissão, mostra um alerta e redireciona
  alertaService.enviarAlerta({
    tipo: ETipoAlerta.ERRO,
    mensagem: 'Você não tem permissão para acessar esta página.'
  });
  router.navigate(['/']); // Redireciona para a página principal
  return false; // Acesso Bloqueado
};