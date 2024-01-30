import {Component, Input} from '@angular/core';
import {User} from "../../../../shared/types/auth.types";
import {Article} from "../../../../shared/types/main.types";

@Component({
  selector: 'mc-article-banner',
  standalone: true,
  imports: [],
  templateUrl: './article-banner.component.html',
  styleUrl: './article-banner.component.scss'
})
export class ArticleBannerComponent {
  @Input() user?: User;
  @Input() article?: Article;
}
