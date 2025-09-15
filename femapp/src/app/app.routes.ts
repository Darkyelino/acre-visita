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
import { GerenciarVisita } from './components/visitas/gerenciar-visita/gerenciar-visita';
import { SugestaoFilmoteca } from './components/filmoteca/sugestao-filmoteca/sugestao-filmoteca';
import { Home } from './components/home/home/home';
import { MinhasVisitas } from './components/visitas/minhas-visitas/minhas-visitas';
import { FazerFeedback } from './components/feedback/fazer-feedback/fazer-feedback';
import { ViewFeedback } from './components/feedback/view-feedback/view-feedback';
import { ReservarAuditorio } from './components/auditorio/reservar-auditorio/reservar-auditorio';
import { ListFeedbacks } from './components/feedback/list-feedbacks/list-feedbacks';
import { GerenciarReservas } from './components/auditorio/gerenciar-reservas/gerenciar-reservas';
import { FormEnderecoVisitante } from './components/endereco-visitante/form-endereco-visitante/form-endereco-visitante';
import { ListEnderecoVisitante } from './components/endereco-visitante/list-endereco-visitante/list-endereco-visitante';

export const routes: Routes = [
    { path: '', children: [

          // Adicione a rota para a home
        { path: 'home', component: Home, canActivate: [authGuard] },

        // Visitantes
        { path: 'cadastro', component: CadastroVisitante },
        { path: 'minhas-visitas', component: MinhasVisitas, canActivate: [authGuard], data: { roles: [EPapel.VISITANTE]} },

        // Endereço Visitante
        { path: 'endereco/form', component: FormEnderecoVisitante, canActivate: [authGuard], data: { roles: [EPapel.VISITANTE]} },
        { path: 'endereco/list', component: ListEnderecoVisitante, canActivate: [authGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR, EPapel.ATENDENTE]} },

        // Feedbacks
        { path: 'feedback/fazer', component: FazerFeedback, canActivate: [authGuard], data: { roles: [EPapel.VISITANTE]} },
        { path: 'feedback/visualizar/:id', component: ViewFeedback, canActivate: [authGuard], data: { roles: [EPapel.VISITANTE]} },
        { path: 'feedback/listar', component: ListFeedbacks, canActivate: [authGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR, EPapel.ATENDENTE]} },

        // Usuários
        { path: 'login', component: LoginVisitante },

        // Visitas
        { path: 'visita/gerenciar', component: GerenciarVisita, canActivate: [authGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR, EPapel.ATENDENTE]} },
        { path: 'visita/fazer', component: FazerVisita, canActivate: [authGuard], data: { roles: [EPapel.VISITANTE]} },

        // Armários
        { path: 'armario', component: ArmarioList, canActivate: [authGuard] },
        
        // Filmoteca
        { path: 'filmoteca/sugestao', component: SugestaoFilmoteca, canActivate: [authGuard], data: { roles: [EPapel.VISITANTE]} },

        // Setores
        { path: 'setor/cadastro', component: CadastroSetor, canActivate: [authGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'setor/editar/:id', component: CadastroSetor, canActivate: [authGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'setor/list', component: ListSetor, canActivate: [authGuard], data: { roles: [EPapel.ADMINISTRADOR]} },

        // Auditórios
        { path: 'auditorio/cadastro', component: CadastroAuditorio, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]} },
        { path: 'auditorio/editar/:id', component: CadastroAuditorio, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]} },
        { path: 'auditorio/list', component: ListAuditorio, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]} },
        { path: 'auditorio/reservar', component: ReservarAuditorio, canActivate: [roleGuard], data: { roles: [EPapel.VISITANTE]} },
        { path: 'auditorio/gerenciar-reservas', component: GerenciarReservas, canActivate: [roleGuard], data: { roles: [EPapel.COORDENADOR, EPapel.ADMINISTRADOR]} },

        // Funcionários
        { path: 'cadastro-funcionario', component: CadastroFuncionario, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'editar-funcionario/:id', component: CadastroFuncionario, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'list-funcionarios', component: ListFuncionario, canActivate: [roleGuard], data: { roles: [EPapel.ADMINISTRADOR] }}
    ]},
];