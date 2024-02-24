import {TagsService} from '@/app/shared/services/tags.service';
import {AllTags} from '@/app/shared/types/tags.types';
import {
   completeSignal,
   errorSignal,
   newSignal,
   pendSignal,
} from '@/app/utils/signal-factory';
import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {McSpinnerComponent} from '../../../../shared/components/loaders/mc-spinner.component';
import {BackendErrorsComponent} from '../../../../shared/components/backend-errors/backend-errors.component';
import {CommonModule} from '@angular/common';

@Component({
   selector: 'mc-tags-list',
   standalone: true,
   templateUrl: './tags-list.component.html',
   styleUrls: [
      './tags-list.component.scss',
      '../../../../shared/styles/taglist.styles.scss',
   ],
   imports: [McSpinnerComponent, BackendErrorsComponent, CommonModule],
})
export class TagsListComponent implements OnInit, OnDestroy {
   tagsService = inject(TagsService);
   tagSignal = newSignal<AllTags>();
   destroyer$ = new Subject<void>();

   ngOnInit() {
      this.fetchTags();
   }

   fetchTags() {
      pendSignal(this.tagSignal);
      this.tagsService
         .getTags()
         .pipe(takeUntil(this.destroyer$))
         .subscribe({
            next: (tag) => {
               completeSignal(this.tagSignal, tag);
            },
            error: (err) => {
               errorSignal(this.tagSignal, err);
            },
         });
   }

   changeFilter(tagName: string) {
      this.tagsService.setTagFilter(tagName);
   }

   ngOnDestroy() {
      this.destroyer$.next();
   }
}
