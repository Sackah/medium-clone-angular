import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'mc-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Input() currentPage = 1;
  @Input() total: number = 0;
  @Input() limit = 10;
  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];

  ngOnInit() {
    const pagesCount = Math.ceil(this.total / this.limit);
    this.pages = this.range(1, pagesCount)
  }

  range(start: number, end: number) {
    return [...Array(end).keys()].map((i) => i + start);
  }
}
