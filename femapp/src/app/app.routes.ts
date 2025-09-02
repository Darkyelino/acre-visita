import { Routes } from '@angular/router';
import { CadastroVisitante } from './components/visitante/cadastro-visitante/cadastro-visitante';
import { LoginVisitante } from './components/visitante/login-visitante/login-visitante';

export const routes: Routes = [
    { path: '', children: [
        { path: 'visitante/cadastro', component: CadastroVisitante },
        { path: 'visitante/login', component: LoginVisitante },
        { path: 'login', component: LoginVisitante }
    ]},
];