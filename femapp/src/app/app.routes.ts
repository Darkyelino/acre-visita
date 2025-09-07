import { Routes } from '@angular/router';
import { CadastroVisitante } from './components/visitante/cadastro-visitante/cadastro-visitante';
import { LoginVisitante } from './components/visitante/login-visitante/login-visitante';
import { FazerVisita } from './components/visitas/fazer-visita/fazer-visita';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { ArmarioListComponent } from './components/armario/armario-list/armario-list';
import { CadastroSetorComponent } from './components/setor/cadastro-setor/cadastro-setor';
import { EPapel } from './models/EPapel';
import { CadastroAuditorioComponent } from './components/auditorio/cadastro-auditorio/cadastro-auditorio';
import { CadastroFuncionario } from './components/funcionario/cadastro-funcionario/cadastro-funcionario';
import { ListFuncionario } from './components/funcionario/list-funcionario/list-funcionario/list-funcionario';

export const routes: Routes = [
    { path: '', children: [
        { path: 'visitante/cadastro', component: CadastroVisitante },
        { path: 'login', component: LoginVisitante },
        { path: 'visitar', component: FazerVisita, canActivate: [authGuard] },
        { path: 'armario', component: ArmarioListComponent, canActivate: [authGuard] },
        { path: 'setor/cadastro', component: CadastroSetorComponent, canActivate: [authGuard]},
        { path: 'auditorio/cadastro', component: CadastroAuditorioComponent, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]} },
        { path: 'auditorio/editar/:id', component: CadastroAuditorioComponent, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]} },
        { path: 'cadastro-funcionario', component: CadastroFuncionario, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'editar-funcionario/:id', component: CadastroFuncionario, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'list-funcionarios', component: ListFuncionario, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR] }}
    ]},
];