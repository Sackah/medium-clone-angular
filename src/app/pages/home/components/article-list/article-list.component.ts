import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Article} from '../../../../shared/types/main.types';
import {formatDate} from "../../../../utils/format-date";

@Component({
  selector: 'mc-article-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  @Input() articles!: Article[];

  formatDate(date: string) {
    return formatDate(date);
  }
}
