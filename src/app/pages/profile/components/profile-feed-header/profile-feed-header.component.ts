import {Component, EventEmitter, Input, Output, SimpleChanges,} from '@angular/core';
import {Profile} from '@shared/types/main.types';

@Component({
  selector: 'mc-profile-feed-header',
  standalone: true,
  imports: [],
  templateUrl: './profile-feed-header.component.html',
  styleUrls: ['../../../../shared/styles/feed-headers.styles.scss'],
})
export class ProfileFeedHeaderComponent {
  @Input() isLoggedIn = false;
  @Input() profile!: Profile;
  @Input() feedName: 'favorites' | 'personal' | undefined = undefined;
  @Output() feedChange = new EventEmitter<'favorites' | 'personal'>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['feedName']) {
      this.handleFeedChange(this.feedName);
    }
  }

  handleFeedChange(name: typeof this.feedName) {
    this.feedChange.emit(name);
  }
}
