import {Component, inject, Input, OnDestroy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Article} from '../../../../shared/types/main.types';
import {formatDate} from "../../../../utils/format-date";
import {completeSignal, errorSignal, newSignal, pendSignal} from "../../../../utils/signal-factory";
import {FavoriteArticleService} from "../../services/favorite-article.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'mc-article-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent implements OnDestroy {
  @Input() articles!: Article[];
  articleSignal = newSignal<{
    article: Article
  }>();
  favoriteArticleService = inject(FavoriteArticleService);
  subscriptions: Subscription[] = [];

  formatDate(date: string) {
    return formatDate(date);
  }

  favorite(slug: string, isFavorited: boolean) {
    pendSignal(this.articleSignal)
    if (isFavorited) {
      this.unfavorite(slug);
      return;
    }
    const sub = this.favoriteArticleService.favorite(slug).subscribe({
      next: (data) => {
        completeSignal(this.articleSignal, data);
        this.updateArticles(data.article);
      },
      error: (err) => {
        errorSignal(this.articleSignal, err);
      }
    })
    this.subscriptions.push(sub)
  }

  unfavorite(slug: string) {
    const sub = this.favoriteArticleService.unfavorite(slug).subscribe({
      next: (data) => {
        completeSignal(this.articleSignal, data);
        this.updateArticles(data.article);
      },
      error: (err) => {
        errorSignal(this.articleSignal, err);
      }
    })
    this.subscriptions.push(sub);
  }

  public updateArticles(article: Article) {
    const index = this.articles.findIndex(art => art.slug === article.slug);
    if (index !== -1) {
      this.articles = [
        ...this.articles.slice(0, index),
        article,
        ...this.articles.slice(index + 1)
      ];
    } else {
      this.articles = [...this.articles, article];
    }
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 1) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
  }
}
