import {Component, Input, OnDestroy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Article} from '@shared/types/main.types';
import {formatDate} from '@app/utils/format-date';
import {newSignal} from '@app/utils/signal-factory';
import {FavouriteArticleWorker} from '@/app/workers/favorites.worker';

@Component({
   selector: 'mc-article-list',
   standalone: true,
   imports: [RouterLink],
   templateUrl: './article-list.component.html',
   styleUrls: [
      './article-list.component.scss',
      '../../../../shared/styles/taglist.styles.scss',
   ],
})
export class ArticleListComponent implements OnDestroy {
   @Input() articles: Article[] = [];
   articleSignal = newSignal<Article>();
   favoriteArticleWorker: FavouriteArticleWorker;

   constructor() {
      this.favoriteArticleWorker = new FavouriteArticleWorker(
         this.articleSignal
      );
   }

   formatDate(date: string) {
      return formatDate(date);
   }

   favoriteArticle(slug: string, isFavorited: boolean) {
      this.favoriteArticleWorker.favorite(slug, isFavorited, (article) => {
         this.updateArticles(article);
      });
   }

   ngOnDestroy() {
      this.favoriteArticleWorker.dispose();
   }

   private updateArticles(article: Article) {
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
}
