import {Component, OnInit} from '@angular/core';
import {Client} from '../../models/client';
import {DatePipe, NgForOf, UpperCasePipe} from '@angular/common';
import {ClienteService} from '../../services/cliente.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
import {tap} from 'rxjs';
import {PaginatorComponent} from '../paginator/paginator.component';


@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    UpperCasePipe,
    DatePipe,
    PaginatorComponent
  ],
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  constructor(private clienteService: ClienteService, private router: Router, private activatedRouter: ActivatedRoute) {
  }

  clientes: Client[] = [];

  titulo: string = 'Listado de clientes!';

  paginator: any = {};

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(
      params => {
        let page: number = +params.get('page');

        if (!page) {
          page = 0;
        }

        this.clienteService.getClientes(page).pipe(
          tap(response => {
            console.log('ClientsComponent: tap 3');
            (response.content as Client[]).forEach(cliente => console.log(cliente.name));
          })
        )
          .subscribe(response => {
            this.clientes = response.content as Client[]
            this.paginator = response;
          });
      }
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
