import {
   Component,
   EventEmitter,
   Input,
   OnChanges,
   OnInit,
   Output,
   SimpleChanges,
} from '@angular/core';

@Component({
   selector: 'mc-pagination',
   standalone: true,
   imports: [],
   templateUrl: './pagination.component.html',
   styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
   @Input({required: true}) currentPage = 1;
   @Input({required: true}) total: number = 0;
   @Input({required: true}) limit = 10;
   @Output() changePage = new EventEmitter<number>();

   pages: number[] = [];

   ngOnChanges(changes: SimpleChanges) {
      if (changes['total'] || changes['limit']) {
         const pagesCount = Math.ceil(this.total / this.limit);
         this.pages = this.range(1, pagesCount);
      }
   }

   range(start: number, end: number) {
      return [...Array(end).keys()].map((i) => i + start);
   }
}
