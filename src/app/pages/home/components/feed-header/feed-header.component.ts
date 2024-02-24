import {TagsService} from '@/app/shared/services/tags.service';
import {FeedNames} from '@/app/shared/types/main.types';
import {
   Component,
   EventEmitter,
   Input,
   OnInit,
   Output,
   inject,
} from '@angular/core';

@Component({
   selector: 'mc-feed-header',
   standalone: true,
   imports: [],
   templateUrl: './feed-header.component.html',
   styleUrls: ['../../../../shared/styles/feed-headers.styles.scss'],
})
export class FeedHeaderComponent implements OnInit {
   @Input({required: true}) isLoggedIn = false;
   @Input({required: true}) feedName: Extract<FeedNames, 'global' | 'feed'> =
      'global';
   @Output() feedChange = new EventEmitter<typeof this.feedName>();
   tagsService = inject(TagsService);
   tagFilter = '';

   ngOnInit() {
      this.tagsService.tagFilter.subscribe((tag) => {
         if (Boolean(tag)) {
            this.feedName = '' as typeof this.feedName;
         }
         this.tagFilter = tag;
      });
   }

   handleFeedChange(name: typeof this.feedName) {
      this.tagsService.setTagFilter('');
      this.feedChange.emit(name);
   }
}
