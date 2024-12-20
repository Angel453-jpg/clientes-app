import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Client} from '../../models/client';
import {ClienteService} from '../../services/cliente.service';
import {Router} from '@angular/router';

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
      () => this.router.navigate(['/clientes'])
    )
  }

}
