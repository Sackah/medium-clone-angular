import { inject, Inject, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavoriteArticleService } from '../pages/home/services/favorite-article.service';
import { filter, Subscription, take, tap } from 'rxjs';
import {
  completeSignal,
  errorSignal,
  pendSignal,
} from '../utils/signal-factory';
import { CurrentUserService } from '../shared/services/current-user.service';
import { Router } from '@angular/router';

export class FavouriteArticleWorker {
  readonly http = Inject(HttpClient);
  private favoriteArticleService = inject(FavoriteArticleService);
  private subscriptions: Subscription[] = [];
  private readonly articleSignal;
  private readonly updaterFn;
  private currentUserService = inject(CurrentUserService);
  private router = inject(Router);

  constructor(
    articleSignal?: WritableSignal<any>,
    updaterFn?: (data: any) => void
  ) {
    this.articleSignal = articleSignal;
    this.updaterFn = updaterFn;
  }

  favorite(slug: string, isFavorited: boolean) {
    this.articleSignal ? pendSignal(this.articleSignal) : null;
  
    if (isFavorited) {
      this.unfavorite(slug);
      return;
    }
  
    const continueExecution = () => {
      const sub = this.favoriteArticleService.favorite(slug).subscribe({
        next: (article) => {
          this.articleSignal ? completeSignal(this.articleSignal, article) : null;
          this.updaterFn ? this.updaterFn(article) : null;
        },
        error: (err) => {
          this.articleSignal ? errorSignal(this.articleSignal, err) : null;
        },
      });
  
      this.subscriptions.push(sub);
    };
  
    this.currentUserService.user.pipe(
      take(1), 
      tap((user) => {
        if (!user.data) {
          this.router.navigateByUrl('/login');
        } else {
          continueExecution();
        }
      })
    ).subscribe();
  }

  unfavorite(slug: string) {
    const sub = this.favoriteArticleService.unfavorite(slug).subscribe({
      next: (article) => {
        this.articleSignal ? completeSignal(this.articleSignal, article) : null;
        this.updaterFn ? this.updaterFn(article) : null;
      },
      error: (err) => {
        this.articleSignal ? errorSignal(this.articleSignal, err) : null;
      },
    });

    this.subscriptions.push(sub);
  }

  public dispose() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
