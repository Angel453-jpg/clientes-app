import {Component, OnInit} from '@angular/core';
import {Cliente} from '../../models/cliente';
import {NgForOf} from '@angular/common';
import {ClienteService} from '../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  constructor(private clienteService: ClienteService) {
  }

  clientes: Cliente[];

  titulo: string = 'Listado de clientes!';

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }
}
