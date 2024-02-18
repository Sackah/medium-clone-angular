import {Component, Input, OnDestroy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Article} from '@shared/types/main.types';
import {newSignal} from '@app/utils/signal-factory';
import {FavouriteArticleWorker} from '@app/workers/favorites.worker';
import {FormatDate} from '@/app/utils/format-date';

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
   @Input({required: true}) articles: Article[] = [];
   articleSignal = newSignal<Article>();
   favoriteArticleWorker: FavouriteArticleWorker;
   protected readonly FormatDate = FormatDate;

   constructor() {
      this.favoriteArticleWorker = new FavouriteArticleWorker(
         this.articleSignal
      );
   }

   favoriteArticle(slug: string, isFavorited: boolean) {
      this.favoriteArticleWorker.favorite(slug, isFavorited, (article) => {
         this.updateArticles(article);
      });
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

   ngOnDestroy() {
      this.favoriteArticleWorker.dispose();
   }
}
