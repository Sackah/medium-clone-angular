import {Component, inject, Input} from '@angular/core';
import {User} from "../../../../shared/types/auth.types";
import {Article} from "../../../../shared/types/main.types";
import {formatDate} from "../../../../utils/format-date";
import {EditArticleService} from "../../services/edit-article.service";
import {Router} from "@angular/router";

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
  @Input() slug: string = '';
  router = inject(Router);
  editArticleService = inject(EditArticleService);

  formatDate(date: string | undefined) {
    if (date) {
      return formatDate(date);
    }
    return null
  }

  async handleEditArticle() {
    if (this.article) {
      this.editArticleService.edit(this.article, this.slug);
      await this.router.navigateByUrl('/editor');
    }
  }
}
