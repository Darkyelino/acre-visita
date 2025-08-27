import { Routes } from '@angular/router';
import { EnderecoVisitanteForm } from './components/endereco-visitante/endereco-visitante-form/endereco-visitante-form';
import { CadastroVisitante } from './components/visitante/cadastro-visitante/cadastro-visitante';

export const routes: Routes = [
    { path: '', children: [
        { path: 'enderecoVisitante/form', component: EnderecoVisitanteForm },
        { path: 'visitante/form', component: CadastroVisitante },
    ]},
];