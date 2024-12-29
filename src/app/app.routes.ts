import {Routes} from '@angular/router';
import {DirectivaComponent} from './directiva/directiva.component';
import {ClientsComponent} from './components/clients/clients.component';
import {FormComponent} from './components/form/form.component';
import {DetailsComponent} from './components/details/details.component';

export const routes: Routes = [
  {path: '', redirectTo: 'clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientsComponent},
  {path: 'clientes/page/:page', component: ClientsComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent},
];
