import { Component, Input, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../../../shared/types/main.types';
import { formatDate } from '../../../../utils/format-date';
import { newSignal } from '../../../../utils/signal-factory';
import { FavouriteArticleWorker } from '../../../../classes/mc-favorites-worker';

@Component({
  selector: 'mc-article-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent implements OnDestroy {
  @Input() articles: Article[] = [];
  articleSignal = newSignal<Article>();
  favoriteArticleWorker: FavouriteArticleWorker;

  constructor() {
    this.updateArticles = this.updateArticles.bind(this);
    this.favoriteArticleWorker = new FavouriteArticleWorker(
      this.articleSignal,
      this.updateArticles
    );
  }

  formatDate(date: string) {
    return formatDate(date);
  }

  public updateArticles(article: Article) {
    const index = this.articles.findIndex((art) => art.slug === article.slug);
    if (index !== -1) {
      this.articles = [
        ...this.articles.slice(0, index),
        article,
        ...this.articles.slice(index + 1),
      ];
    } else {
      this.articles = [...this.articles, article];
    }
  }

  ngOnDestroy() {
    this.favoriteArticleWorker.dispose();
  }
}
