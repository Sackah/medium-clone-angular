import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
   selector: 'mc-pagination',
   standalone: true,
   imports: [],
   templateUrl: './pagination.component.html',
   styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
   @Input({required: true}) currentPage = 1;
   @Input({required: true}) total: number = 0;
   @Input({required: true}) limit = 10;
   @Output() changePage = new EventEmitter<number>();

   pages: number[] = [];

   ngOnInit() {
      const pagesCount = Math.ceil(this.total / this.limit);
      this.pages = this.range(1, pagesCount);
   }

   range(start: number, end: number) {
      return [...Array(end).keys()].map((i) => i + start);
   }
}
