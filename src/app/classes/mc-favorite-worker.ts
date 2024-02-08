import { inject, Inject, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavoriteArticleService } from '../pages/home/services/favorite-article.service';
import { Subscription } from 'rxjs';
import {
  completeSignal,
  errorSignal,
  pendSignal,
} from '../utils/signal-factory';

export class FavouriteArticleWorker {
  readonly http = Inject(HttpClient);
  private favoriteArticleService = inject(FavoriteArticleService);
  private subscriptions: Subscription[] = [];
  private readonly articleSignal;
  private readonly updaterFn;

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
