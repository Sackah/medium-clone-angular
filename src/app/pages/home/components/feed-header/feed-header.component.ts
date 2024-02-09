import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'mc-feed-header',
  standalone: true,
  imports: [],
  templateUrl: './feed-header.component.html',
  styleUrls: ['../../../../shared/styles/feed-headers.styles.scss']

})
export class FeedHeaderComponent {
  @Input() isLoggedIn = false;
  @Input() feedName: 'global' | 'personal' = 'global';
  @Output() feedChange = new EventEmitter<'global' | 'personal'>();

  ngOnInit() {
    this.feedChange.emit(this.feedName);
  }

  handleFeedChange(name: 'global' | 'personal') {
    this.feedChange.emit(name);
  }
}
