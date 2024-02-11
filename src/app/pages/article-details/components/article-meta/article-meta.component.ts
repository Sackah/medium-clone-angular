import {Component, inject, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Article, Profile} from "@shared/types/main.types";
import {formatDate} from "@app/utils/format-date";
import {User} from "@shared/types/auth.types";
import {EditArticleService} from "@app/pages/article-details/services/edit-article.service";
import {FavouriteArticleWorker} from "@app/workers/favorites.worker";
import {FollowProfileWorker} from "@app/workers/followers.worker";
import {completeSignal, errorSignal, newSignal, pendSignal} from "@app/utils/signal-factory";
import {Subscription} from "rxjs";

@Component({
  selector: 'mc-article-meta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-meta.component.html',
  styleUrl: './article-meta.component.scss'
})
export class ArticleMetaComponent {
  @Input() user?: User;
  @Input() lightBg: boolean = false;
  @Input() article?: Article;
  @Input() slug: string = '';
  router = inject(Router);
  editArticleService = inject(EditArticleService);
  favoriteArticleWorker: FavouriteArticleWorker;
  followProfileWorker: FollowProfileWorker;
  articleSignal = newSignal<Article>();
  subscriptions: Subscription[] = [];

  constructor() {
    this.updateArticle = this.updateArticle.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.favoriteArticleWorker = new FavouriteArticleWorker(
      this.articleSignal,
      this.updateArticle
    );
    this.followProfileWorker = new FollowProfileWorker(
      this.articleSignal,
      this.updateProfile
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

  updateArticle(article: Article) {
    this.article = {...(this.article as Article), ...article};
  }

  updateProfile(profile: Profile) {
    this.article = {...(this.article as Article), author: profile};
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
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.favoriteArticleWorker.dispose();
    this.followProfileWorker.dispose();
  }
}
