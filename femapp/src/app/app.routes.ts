import { Routes } from '@angular/router';
import { CadastroVisitante } from './components/visitante/cadastro-visitante/cadastro-visitante';
import { LoginVisitante } from './components/visitante/login-visitante/login-visitante';
import { FazerVisita } from './components/visitas/fazer-visita/fazer-visita';

export const routes: Routes = [
    { path: '', children: [
        { path: 'visitante/cadastro', component: CadastroVisitante },
        { path: 'visitante/login', component: LoginVisitante },
        { path: 'login', component: LoginVisitante },
        { path: 'visitar', component: FazerVisita }
    ]},
];