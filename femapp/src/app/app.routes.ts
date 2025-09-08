import { Routes } from '@angular/router';
import { CadastroVisitante } from './components/visitante/cadastro-visitante/cadastro-visitante';
import { LoginVisitante } from './components/visitante/login-visitante/login-visitante';
import { FazerVisita } from './components/visitas/fazer-visita/fazer-visita';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { ArmarioList } from './components/armario/armario-list/armario-list';
import { CadastroSetor } from './components/setor/cadastro-setor/cadastro-setor';
import { EPapel } from './models/EPapel';
import { CadastroAuditorio } from './components/auditorio/cadastro-auditorio/cadastro-auditorio';
import { CadastroFuncionario } from './components/funcionario/cadastro-funcionario/cadastro-funcionario';
import { ListFuncionario } from './components/funcionario/list-funcionario/list-funcionario';
import { ListAuditorio } from './components/auditorio/list-auditorio/list-auditorio';
import { ListSetor } from './components/setor/list-setor/list-setor';

export const routes: Routes = [
    { path: '', children: [
        // Visitantes
        { path: 'cadastro', component: CadastroVisitante },
        { path: 'login', component: LoginVisitante },

        { path: 'visitar', component: FazerVisita, canActivate: [authGuard] },
        { path: 'armario', component: ArmarioList, canActivate: [authGuard] },

        // Setores
        { path: 'setor/cadastro', component: CadastroSetor, canActivate: [authGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'setor/editar/:id', component: CadastroSetor, canActivate: [authGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'setor/list', component: ListSetor, canActivate: [authGuard], data: { roles: [EPapel.ADMINISTRADOR]} },

        // Auditórios
        { path: 'auditorio/cadastro', component: CadastroAuditorio, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]} },
        { path: 'auditorio/editar/:id', component: CadastroAuditorio, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]} },
        { path: 'list-auditorios', component: ListAuditorio, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]} },

        // Funcionários
        { path: 'cadastro-funcionario', component: CadastroFuncionario, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'editar-funcionario/:id', component: CadastroFuncionario, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'list-funcionarios', component: ListFuncionario, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR] }}
    ]},
];