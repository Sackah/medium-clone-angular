import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mc-feed-header',
  standalone: true,
  imports: [],
  templateUrl: './feed-header.component.html',
  styleUrl: './feed-header.component.scss',
})
export class FeedHeaderComponent {
  feedName: 'global' | 'personal' = 'global';
  @Output() feedChange = new EventEmitter<'global' | 'personal'>();

  ngOnInit() {
    this.feedChange.emit(this.feedName);
  }

  handleFeedChange(name: 'global' | 'personal') {
    this.feedName = name;
    this.feedChange.emit(name);
  }
}
