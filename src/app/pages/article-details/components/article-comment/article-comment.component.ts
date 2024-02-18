import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommentsFormComponent} from '@app/pages/article-details/components/comments-form/comments-form.component';
import {Article, Comment} from '@shared/types/main.types';
import {RouterLink} from '@angular/router';
import {ArticleMetaComponent} from '@app/pages/article-details/components/article-meta/article-meta.component';
import {User} from '@shared/types/auth.types';
import {CommentsListComponent} from '@app/pages/article-details/components/comments-list/comments-list.component';

@Component({
   selector: 'mc-article-comment',
   standalone: true,
   imports: [
      CommentsFormComponent,
      RouterLink,
      ArticleMetaComponent,
      CommentsListComponent,
   ],
   templateUrl: './article-comment.component.html',
   styleUrl: './article-comment.component.scss',
})
export class ArticleCommentComponent {
   @Input({required: true}) article: Article | undefined = undefined;
   @Input({required: true}) user: User | undefined = undefined;
   @Output() updatedArticle = new EventEmitter<Article>();
   comment: Comment | undefined = undefined;

   updateArticle(event: Article) {
      this.updatedArticle.emit(event);
   }

   updateComment(event: Comment) {
      this.comment = event;
   }
}
