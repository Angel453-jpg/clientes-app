import {Routes} from '@angular/router';
import {DirectivaComponent} from './directiva/directiva.component';
import {ClientesComponent} from './components/clientes/clientes.component';

export const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
];
