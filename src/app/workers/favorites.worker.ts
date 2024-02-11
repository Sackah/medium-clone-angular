import {inject, Inject, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FavoriteArticleService} from '@shared/services/favorite-article.service';
import {Subscription, take, tap} from 'rxjs';
import {
  completeSignal,
  errorSignal,
  pendSignal,
} from '@app/utils/signal-factory';
import {CurrentUserService} from '@shared/services/current-user.service';
import {Router} from '@angular/router';
import {Article} from '@shared/types/main.types';
import {User} from '../shared/types/auth.types';
import {EditArticleService} from '../pages/article-details/services/edit-article.service';

export class FavouriteArticleWorker {
  readonly http = Inject(HttpClient);
  private favoriteArticleService = inject(FavoriteArticleService);
  private subscriptions: Subscription[] = [];
  private readonly articleSignal;
  private readonly updaterFn;
  private currentUserService = inject(CurrentUserService);
  private router = inject(Router);
  private readonly editArticleService = inject(EditArticleService);

  constructor(
    articleSignal?: WritableSignal<any>,
    updaterFn?: (article: Article) => void
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
          this.articleSignal
            ? completeSignal(this.articleSignal, article)
            : null;
          this.updaterFn ? this.updaterFn(article) : null;
        },
        error: (err) => {
          this.articleSignal ? errorSignal(this.articleSignal, err) : null;
        },
      });

      this.subscriptions.push(sub);
    };

    this.currentUserService.user
      .pipe(
        take(1),
        tap(async (user) => {
          if (!user.data) {
            await this.router.navigateByUrl('/login');
          } else {
            continueExecution();
          }
        })
      )
      .subscribe();
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

  deleteArticle(slug: string, user: User | undefined) {
    this.articleSignal ? pendSignal(this.articleSignal) : null;

    const sub = this.editArticleService.delete(slug).subscribe({
      next: async (data) => {
        this.articleSignal ? completeSignal(this.articleSignal, data) : null;
        await this.router.navigateByUrl(`/profile/${user?.username}`);
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
