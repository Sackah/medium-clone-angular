import {Component, EventEmitter, Input, Output, SimpleChanges,} from '@angular/core';
import {FeedNames, Profile} from '@shared/types/main.types';

@Component({
  selector: 'mc-profile-feed-header',
  standalone: true,
  imports: [],
  templateUrl: './profile-feed-header.component.html',
  styleUrls: ['../../../../shared/styles/feed-headers.styles.scss'],
})
export class ProfileFeedHeaderComponent {
  @Input() isUser = false;
  @Input() profile: Profile | undefined = undefined;
  @Input() feedName: Extract<FeedNames, 'personal' | 'favorites'> | undefined =
    undefined;
  @Output() feedChange = new EventEmitter<typeof this.feedName>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['feedName']) {
      this.handleFeedChange(this.feedName);
    }
  }

  handleFeedChange(name: typeof this.feedName) {
    this.feedChange.emit(name);
  }
}
