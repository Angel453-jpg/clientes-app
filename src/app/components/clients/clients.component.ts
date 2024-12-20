import {Component, OnInit} from '@angular/core';
import {Client} from '../../models/client';
import {NgForOf} from '@angular/common';
import {ClienteService} from '../../services/cliente.service';
import {Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  constructor(private clienteService: ClienteService, private router: Router) {
  }

  clientes: Client[] = [];

  titulo: string = 'Listado de clientes!';

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Client): void {
    Swal.fire({
      title: "¿Está seguro?",
      text: `Seguro que desea eliminar al cliente ${cliente.name} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          () => {
            this.clientes = this.clientes.filter(client => client.id != client.id);
            this.router.navigate(['/clientes/form'], {skipLocationChange: true}).then(
              () => {
                this.router.navigate(['/clientes'], {state: {cliente: this.clientes}})
              }
            );
            Swal.fire({
              title: "Cliente Eliminado!",
              text: `Cliente ${cliente.name} eliminado con éxito`,
              icon: "success"
            });
          }
        )
      }
    });
  }

}
