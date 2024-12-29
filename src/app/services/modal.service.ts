import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;

  private _notificarUpload = new EventEmitter<any>();

  constructor() {
  }

  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  set notificarUpload(value: EventEmitter<any>) {
    this._notificarUpload = value;
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }
}
