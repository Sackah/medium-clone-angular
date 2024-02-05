import { Component, Input } from '@angular/core';
import { AllArticles } from '../../../../shared/types/article.types';
import { RouterLink } from '@angular/router';
import { Article } from '../../../../shared/types/main.types';

@Component({
  selector: 'mc-article-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  @Input() articles!: Article[];
}
