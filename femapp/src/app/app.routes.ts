import { Routes } from '@angular/router';
import { CadastroVisitante } from './components/visitante/cadastro-visitante/cadastro-visitante';
import { LoginVisitante } from './components/visitante/login-visitante/login-visitante';
import { FazerVisita } from './components/visitas/fazer-visita/fazer-visita';
import { authGuard } from './guards/auth-guard';
import { ArmarioListComponent } from './components/armario/armario-list/armario-list';

export const routes: Routes = [
    { path: '', children: [
        { path: 'visitante/cadastro', component: CadastroVisitante },
        { path: 'login', component: LoginVisitante },
        { path: 'visitar', component: FazerVisita, canActivate: [authGuard] },
        { path: 'armario', component: ArmarioListComponent, canActivate: [authGuard] }
    ]},
];