import {Component, inject, Input} from '@angular/core';
import {User} from '../../../../shared/types/auth.types';
import {Article} from '../../../../shared/types/main.types';
import {formatDate} from '../../../../utils/format-date';
import {EditArticleService} from '../../services/edit-article.service';
import {Router} from '@angular/router';
import {FavouriteArticleWorker} from '../../../../classes/mc-favorite-worker';
import {newSignal} from "../../../../utils/signal-factory";

@Component({
  selector: 'mc-article-banner',
  standalone: true,
  imports: [],
  templateUrl: './article-banner.component.html',
  styleUrl: './article-banner.component.scss',
})
export class ArticleBannerComponent {
  @Input() user?: User;
  @Input() article?: Article;
  @Input() slug: string = '';
  router = inject(Router);
  editArticleService = inject(EditArticleService);
  favoriteArticleWorker: FavouriteArticleWorker;
  articleSignal = newSignal<Article>()

  constructor() {
    this.updateArticle = this.updateArticle.bind(this);
    this.favoriteArticleWorker = new FavouriteArticleWorker(this.articleSignal, this.updateArticle);
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
    this.article = article;
  }
}
