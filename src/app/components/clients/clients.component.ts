import {Component, OnInit} from '@angular/core';
import {Client} from '../../models/client';
import {NgForOf} from '@angular/common';
import {ClienteService} from '../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  constructor(private clienteService: ClienteService) {
  }

  clientes: Client[];

  titulo: string = 'Listado de clientes!';

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }
}
