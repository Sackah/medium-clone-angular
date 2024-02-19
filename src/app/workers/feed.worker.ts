import {WritableSignal, inject} from '@angular/core';
import {FetchArticlesService} from '../shared/services/fetch-articles.service';
import {FeedNames, GeneralFeedNames} from '../shared/types/main.types';
import {Subscription} from 'rxjs';
import {completeSignal, errorSignal, pendSignal} from '../utils/signal-factory';

export class FeedWorker {
   private readonly signal;
   private readonly articleService = inject(FetchArticlesService);
   private readonly subscriptions: Subscription[] = [];

   constructor(signal: WritableSignal<any>) {
      this.signal = signal;
   }

   fetchFeed(
      feedName: GeneralFeedNames,
      username?: string,
      limit = 20,
      offset = 0
   ) {
      pendSignal(this.signal);

      switch (feedName) {
         case 'personal':
            if (username) {
               this.subscriptions.push(
                  this.articleService
                     .getByUser(username, limit, offset)
                     .subscribe({
                        next: (articles) => {
                           completeSignal(this.signal, articles);
                        },
                        error: (err) => {
                           errorSignal(this.signal, err);
                        },
                     })
               );
            }
            break;
         case 'favorites':
            if (username) {
               this.subscriptions.push(
                  this.articleService
                     .getByFavorited(username, limit, offset)
                     .subscribe({
                        next: (articles) => {
                           completeSignal(this.signal, articles);
                        },
                        error: (err) => {
                           errorSignal(this.signal, err);
                        },
                     })
               );
            }
            break;
         case 'global':
            this.subscriptions.push(
               this.articleService.getAll(limit, offset).subscribe({
                  next: (articles) => {
                     completeSignal(this.signal, articles);
                  },
                  error: (error) => {
                     errorSignal(this.signal, error);
                  },
               })
            );
            break;
         case 'feed':
            this.subscriptions.push(
               this.articleService.getFeed(limit, offset).subscribe({
                  next: (articles) => {
                     completeSignal(this.signal, articles);
                  },
                  error: (error) => {
                     errorSignal(this.signal, error);
                  },
               })
            );
            break;
         default:
            break;
      }
   }

   public dispose() {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
   }
}
