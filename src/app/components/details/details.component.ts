import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../../models/client';
import {ClienteService} from '../../services/cliente.service';
import Swal from 'sweetalert2';
import {DatePipe, NgStyle} from '@angular/common';
import {HttpEventType} from '@angular/common/http';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'details-client',
  standalone: true,
  imports: [
    DatePipe,
    NgStyle
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  @Input() cliente: Client;
  titulo: string = 'Detalle del cliente';
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private clientService: ClienteService, public modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  selectPicture(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);

    if (this.fotoSeleccionada.type.indexOf('image') < 0) {

      Swal.fire(
        'Error seleccionar imagen: ',
        'El archivo debe ser del tipo imagen',
        'error'
      );

      this.fotoSeleccionada = null;

    }

  }

  submitPicture() {

    if (!this.fotoSeleccionada) {
      Swal.fire(
        'Error debe de seleccionar una foto',
        'Se debe de seleccionar una foto',
        'error'
      );
    } else {

      this.clientService.submitPicture(this.fotoSeleccionada, this.cliente.id).subscribe(
        event => {
          // this.cliente = cliente;

          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as Client;

            this.modalService.notificarUpload.emit(this.cliente);

            Swal.fire(
              'La foto se ha subido completamente!',
              response.message,
              'success'
            );

          }
        }
      )
    }

  }

  closeModal(): void {
    this.modalService.closeModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
