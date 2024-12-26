import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'paginator-nav',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginator: any = {};

  paginas: number[];
  desde: number;
  hasta: number;

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let paginatorUpdated = changes['paginator']

    if (paginatorUpdated.previousValue){
      this.initPaginator();
    }

  }

  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5);
    this.hasta = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);

    if (this.paginator.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginator.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }
  }

}
