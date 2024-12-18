import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-directiva',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];
  habilitar: boolean = true;

  setHabilitar(): void {
    this.habilitar = (this.habilitar != true);
  }

}
