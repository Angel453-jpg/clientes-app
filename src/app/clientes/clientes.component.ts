import {Component} from '@angular/core';
import {Cliente} from '../models/cliente';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {

  clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'Angel',
      apellido: 'Meneses',
      email: 'angelin09ozoz@gmail.com',
      createAt: '2024-12-18'
    },
    {
      id: 2,
      nombre: 'Rafael',
      apellido: 'Adrian',
      email: 'rafael@gmail.com',
      createAt: '2024-12-18'
    },
    {
      id: 3,
      nombre: 'Felipa',
      apellido: 'González',
      email: 'felipa@gmail.com',
      createAt: '2024-12-18'
    },

  ];

  titulo: string = 'Listado de clientes!';

}
