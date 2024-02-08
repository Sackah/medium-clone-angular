import { Component, inject, Input, OnDestroy } from '@angular/core';
import { User } from '../../../../shared/types/auth.types';
import { Article, Profile } from '../../../../shared/types/main.types';
import { formatDate } from '../../../../utils/format-date';
import { EditArticleService } from '../../services/edit-article.service';
import { Router } from '@angular/router';
import { FavouriteArticleWorker } from '../../../../classes/mc-favorite-worker';
import {
  completeSignal,
  errorSignal,
  newSignal,
  pendSignal,
} from '../../../../utils/signal-factory';
import { FollowProfileWorker } from '../../../../classes/mc-follow-worker';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mc-article-banner',
  standalone: true,
  imports: [],
  templateUrl: './article-banner.component.html',
  styleUrl: './article-banner.component.scss',
})
export class ArticleBannerComponent implements OnDestroy {
  @Input() user?: User;
  @Input() article?: Article;
  @Input() slug: string = '';
  router = inject(Router);
  editArticleService = inject(EditArticleService);
  favoriteArticleWorker: FavouriteArticleWorker;
  followProfileWorker: FollowProfileWorker;
  articleSignal = newSignal<Article>();
  subsrcriptions: Subscription[] = [];

  constructor() {
    this.updateArticle = this.updateArticle.bind(this);
    this.favoriteArticleWorker = new FavouriteArticleWorker(
      this.articleSignal,
      this.updateArticle
    );
    this.followProfileWorker = new FollowProfileWorker(
      this.articleSignal,
      this.updateArticle
    );
  }

  formatDate(date: string | undefined) {
    if (date) {
      return formatDate(date);
    }
    return null;
  }

  async editArticle() {
    if (this.article) {
      this.editArticleService.edit(this.article, this.slug);
      await this.router.navigateByUrl('/editor');
    }
  }

  updateArticle(article?: Article, profile?: Profile) {
    if (profile) {
      this.article = { ...(this.article as Article), author: profile };
    } else if (article) {
      this.article = article;
    }
  }

  deleteArticle(slug: string) {
    pendSignal(this.articleSignal);

    const sub = this.editArticleService.delete(slug).subscribe({
      next: async (data) => {
        completeSignal(this.articleSignal, data);
        await this.router.navigateByUrl(`/profile/${this.user?.username}`);
      },
      error: (err) => {
        errorSignal(this.articleSignal, err);
      },
    });
    this.subsrcriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.favoriteArticleWorker.dispose();
    this.followProfileWorker.dispose();
  }
}
