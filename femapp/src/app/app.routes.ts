import { Routes } from '@angular/router';
import { EnderecoVisitanteForm } from './components/endereco-visitante/endereco-visitante-form/endereco-visitante-form';

export const routes: Routes = [
    { path: '', children: [
        { path: 'enderecoVisitante/form', component: EnderecoVisitanteForm }
    ]},
];
