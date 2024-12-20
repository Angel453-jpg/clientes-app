import {Routes} from '@angular/router';
import {DirectivaComponent} from './directiva/directiva.component';
import {ClientsComponent} from './components/clients/clients.component';

export const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientsComponent},
];
