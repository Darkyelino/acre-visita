import { Routes } from '@angular/router';
import { CadastroVisitante } from './components/visitante/cadastro-visitante/cadastro-visitante';
import { LoginVisitante } from './components/visitante/login-visitante/login-visitante';
import { FazerVisita } from './components/visitas/fazer-visita/fazer-visita';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
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
import { Perfil } from './components/home/perfil/perfil';
import { FormVisitante } from './components/visitante/form-visitante/form-visitante';
import { ListVisitante } from './components/visitante/list-visitante/list-visitante';
import { GerenciarDocumentos } from './components/doc-visitante/gerenciar-documentos/gerenciar-documentos';
import { GerenciaFilmoteca } from './components/filmoteca/gerencia-filmoteca/gerencia-filmoteca';
import { Graficos } from './components/relatorio/graficos/graficos';
import { FormDocumento } from './components/doc-visitante/form-documento/form-documento';
import { ViewReserva } from './components/auditorio/view-reserva/view-reserva';
import { AddArmario } from './components/armario/add-armario/add-armario';
import { FormArmario } from './components/armario/form-armario/form-armario';
import { ListArmario } from './components/armario/list-armario/list-armario';
import { GerenciarArmario } from './components/armario/gerenciar-armario/gerenciar-armario';

export const routes: Routes = [
    { path: '', children: [
        { path: '', redirectTo: '/home', pathMatch: 'full' },

        // Adicione a rota para a home
        { path: 'home', component: Home, canActivate: [authGuard] },
        { path: 'perfil', component: Perfil, canActivate: [authGuard] },

        // Visitantes
        { path: 'cadastro', component: CadastroVisitante },
        { path: 'minhas-visitas', component: MinhasVisitas, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.VISITANTE]} },

        // Documentos de Visitantes
        { path: 'documentos/list', component: GerenciarDocumentos, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR, EPapel.ATENDENTE]} },
        { path: 'documentos/form', component: FormDocumento, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR, EPapel.ATENDENTE]} },
        { path: 'documentos/editar/:id', component: FormDocumento, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR, EPapel.ATENDENTE]} },

        // Gerenciamento de Visitantes (Admin, Coordenador, Atendente)
        { path: 'visitante/form', component: FormVisitante, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR, EPapel.ATENDENTE]} },
        { path: 'visitante/list', component: ListVisitante, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR, EPapel.ATENDENTE]} },
        { path: 'visitante/editar/:id', component: FormVisitante, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR, EPapel.ATENDENTE]} },

        // Endereço Visitante
        { path: 'endereco/form', component: FormEnderecoVisitante, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.VISITANTE]} },
        { path: 'endereco/editar/:id', component: FormEnderecoVisitante, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.VISITANTE]} },
        { path: 'endereco/list', component: ListEnderecoVisitante, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR, EPapel.ATENDENTE]} },

        // Feedbacks
        { path: 'feedback/fazer', component: FazerFeedback, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.VISITANTE]} },
        { path: 'feedback/visualizar/:id', component: ViewFeedback, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.VISITANTE]} },
        { path: 'feedback/listar', component: ListFeedbacks, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]} },

        // Usuários
        { path: 'login', component: LoginVisitante },

        // Visitas
        { path: 'visita/gerenciar', component: GerenciarVisita, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR, EPapel.ATENDENTE]} },
        { path: 'visita/fazer', component: FazerVisita, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.VISITANTE]} },

        // Armários
        { path: 'armario/adicionar', component: AddArmario, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'armario/editar/:id', component: FormArmario, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'armario/list', component: ListArmario, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'armario/gerenciar', component: GerenciarArmario, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ATENDENTE]} },

        // Filmoteca
        { path: 'filmoteca/sugestao', component: SugestaoFilmoteca, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.VISITANTE]} },
        { path: 'filmoteca/gerenciar', component: GerenciaFilmoteca, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR, EPapel.ATENDENTE]} },

        // Setores
        { path: 'setor/cadastro', component: CadastroSetor, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'setor/editar/:id', component: CadastroSetor, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'setor/list', component: ListSetor, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },

        // Auditórios
        { path: 'auditorio/cadastro', component: CadastroAuditorio, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]} },
        { path: 'auditorio/editar/:id', component: CadastroAuditorio, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]} },
        { path: 'auditorio/list', component: ListAuditorio, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]} },
        { path: 'auditorio/reservar', component: ReservarAuditorio, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.VISITANTE]} },
        { path: 'auditorio/minhas-reservas', component: ViewReserva, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.VISITANTE]} },
        { path: 'auditorio/gerenciar-reservas', component: GerenciarReservas, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.COORDENADOR, EPapel.ADMINISTRADOR]} },

        // Funcionários
        { path: 'funcionario/cadastro', component: CadastroFuncionario, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'funcionario/editar/:id', component: CadastroFuncionario, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR]} },
        { path: 'funcionario/list', component: ListFuncionario, canActivate: [authGuard,roleGuard], data: { roles: [EPapel.ADMINISTRADOR] }},

        // Relatórios
        { path: 'relatorio/graficos', component: Graficos, canActivate: [authGuard, roleGuard], data: { roles: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]} }
        
    ]},
];