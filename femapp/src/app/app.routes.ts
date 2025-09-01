import { Routes } from '@angular/router';
import { EnderecoVisitanteForm } from './components/endereco-visitante/endereco-visitante-form/endereco-visitante-form';
import { CadastroVisitante } from './components/visitante/cadastro-visitante/cadastro-visitante';
import { LoginVisitante } from './components/visitante/login-visitante/login-visitante';
import { AuditorioReserva } from './components/auditorio/auditorio-reserva/auditorio-reserva';
import { AuditorioConfirmacao } from './components/auditorio/auditorio-confirmacao/auditorio-confirmacao/auditorio-confirmacao';

export const routes: Routes = [
    { path: '', children: [
        { path: 'enderecoVisitante/form', component: EnderecoVisitanteForm },
        { path: 'visitante/cadastro', component: CadastroVisitante },
        { path: 'visitante/login', component: LoginVisitante },
        { path: 'auditorio/reserva', component: AuditorioReserva },
        { path: 'auditorio/confirmacao', component: AuditorioConfirmacao },
        { path: 'login', component: LoginVisitante }
    ]},
];