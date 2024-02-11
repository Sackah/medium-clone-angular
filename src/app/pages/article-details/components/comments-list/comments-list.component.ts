import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mc-comments-list',
  standalone: true,
  imports: [],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.scss'
})
export class CommentsListComponent implements OnInit {
  @Input() comments: Comment[] = [];

  ngOnInit() {

  }
}
