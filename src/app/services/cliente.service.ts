import {Injectable} from '@angular/core';
import {Cliente} from '../models/cliente';
import {CLIENTES} from '../clientes/clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() {
  }

  getClientes(): Cliente[] {
    return CLIENTES;
  }
}
