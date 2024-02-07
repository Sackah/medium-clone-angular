import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Article} from '../../../../shared/types/main.types';
import {formatDate} from "../../../../utils/format-date";
import {completeSignal, newSignal, pendSignal} from "../../../../utils/signal-factory";
import {FavoriteArticleService} from "../../services/favorite-article.service";

@Component({
  selector: 'mc-article-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  @Input() articles!: Article[];
  articleSignal = newSignal<{
    article: Article
  }>();
  favoriteArticleService = inject(FavoriteArticleService);

  formatDate(date: string) {
    return formatDate(date);
  }

  favorite(slug: string, index: number) {
    pendSignal(this.articleSignal);

    const sub = this.favoriteArticleService.favorite(slug).subscribe({
      next: (data) => {
        completeSignal(this.articleSignal, data);
        this.articles = {...this.articles, ...data.article};
      }
    })
  }
}
