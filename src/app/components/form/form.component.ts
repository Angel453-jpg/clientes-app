import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Client} from '../../models/client';
import {ClienteService} from '../../services/cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {NgForOf, NgIf} from '@angular/common';
import {Region} from '../../models/region';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  client: Client;
  regions: Region[] = [];
  titulo: string = 'Crear Cliente';
  errores: string[] = [];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.client = new Client();
  }

  ngOnInit(): void {
    this.loadClient();
    this.clienteService.getRegiones().subscribe(
      regiones => this.regions = regiones
    );
  }

  loadClient(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getClient(id).subscribe(
          (client) => this.client = client
        )
      }
    })
  }

  onSubmit(): void {

    if (this.client.id > 0) {
      console.log(this.client);
      this.clienteService.update(this.client).subscribe({
        next:
          cliente => {
            this.router.navigate(['/clientes'])
            Swal.fire(
              'Cliente Actualizado',
              `El cliente ${cliente.name} fue actualizado correctamente!`,
              'success'
            );
          },
        error: (err) => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      })
    } else {
      console.log(this.client)
      this.clienteService.create(this.client).subscribe({
        next:
          cliente => {
            this.router.navigate(['/clientes'])
            Swal.fire(
              'Nuevo Cliente',
              `El cliente ${cliente.name} ha sido creado con éxito`,
              'success'
            )
          },
        error: (err) => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      })
    }
  }

  compareRegion(ob1: Region, ob2: Region): boolean {

    if (ob1 === undefined && ob2 === undefined) {
      return true;
    }

    return ob1 == null || ob2 == null ? false : ob1.id === ob2.id;
  }

}
