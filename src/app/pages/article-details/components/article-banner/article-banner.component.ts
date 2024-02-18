import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '@shared/types/auth.types';
import {Article} from '@shared/types/main.types';
import {RouterLink} from '@angular/router';
import {ArticleMetaComponent} from '@app/pages/article-details/components/article-meta/article-meta.component';

@Component({
   selector: 'mc-article-banner',
   standalone: true,
   imports: [RouterLink, ArticleMetaComponent],
   templateUrl: './article-banner.component.html',
   styleUrl: './article-banner.component.scss',
})
export class ArticleBannerComponent {
   @Input({required: true}) user?: User;
   @Input({required: true}) article?: Article;
   @Input({required: true}) slug: string = '';
   @Output() updatedArticle = new EventEmitter<Article>();

   updateArticle(event: Article) {
      this.updatedArticle.emit(event);
   }
}
