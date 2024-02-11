import { FeedNames } from '@/app/shared/types/main.types';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mc-feed-header',
  standalone: true,
  imports: [],
  templateUrl: './feed-header.component.html',
  styleUrls: ['../../../../shared/styles/feed-headers.styles.scss'],
})
export class FeedHeaderComponent {
  @Input() isLoggedIn = false;
  @Input() feedName: Extract<FeedNames, 'global' | 'feed'> = 'global';
  @Output() feedChange = new EventEmitter<typeof this.feedName>();

  ngOnInit() {
    this.feedChange.emit(this.feedName);
  }

  handleFeedChange(name: typeof this.feedName) {
    this.feedChange.emit(name);
  }
}
