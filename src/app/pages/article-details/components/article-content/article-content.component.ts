import {Component, Input} from '@angular/core';
import {Article} from "@shared/types/main.types";

@Component({
  selector: 'mc-article-content',
  standalone: true,
  imports: [],
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss', '../../../../shared/styles/taglist.styles.scss']
})
export class ArticleContentComponent {
  @Input() article: Article | undefined = undefined;
}
