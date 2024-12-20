import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Client} from '../../models/client';
import {ClienteService} from '../../services/cliente.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './form.component.html'
})
export class FormComponent {

  client: Client;
  titulo: string = 'Crear Cliente';

  constructor(private clienteService: ClienteService, private router: Router) {
    this.client = new Client();
  }

  create(): void {
    this.clienteService.create(this.client).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire(
          'Nuevo Cliente',
          `Cliente ${cliente.name} creado con éxito`,
          'success'
        );
      }
    )
  }

}
