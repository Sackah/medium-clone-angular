import {Component, Input} from '@angular/core';
import {CommentsFormComponent} from "@app/pages/article-details/components/comments-form/comments-form.component";
import {Article} from "@shared/types/main.types";
import {RouterLink} from "@angular/router";
import {ArticleMetaComponent} from "@app/pages/article-details/components/article-meta/article-meta.component";
import {User} from "@shared/types/auth.types";

@Component({
  selector: 'mc-article-comment',
  standalone: true,
  imports: [
    CommentsFormComponent,
    RouterLink,
    ArticleMetaComponent
  ],
  templateUrl: './article-comment.component.html',
  styleUrl: './article-comment.component.scss'
})
export class ArticleCommentComponent {
  @Input() article: Article | undefined = undefined;
  @Input() user: User | undefined = undefined;
}
