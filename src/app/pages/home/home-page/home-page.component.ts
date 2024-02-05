import { Component, inject } from '@angular/core';
import { LoginNavComponent } from '../../auth/components/login-nav/login-nav.component';
import { HomeNavComponent } from '../components/home-nav/home-nav.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { MCPage } from '../../../classes/mc-page';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { AllArticlesService } from '../services/all-articles.service';
import { AllArticles } from '../../../shared/types/article.types';
import {
  completeSignal,
  errorSignal,
  newSignal,
  pendSignal,
} from '../../../utils/signal-factory';
import { FeedHeaderComponent } from "../components/feed-header/feed-header.component";
import { ArticleListComponent } from "../components/article-list/article-list.component";

@Component({
    selector: 'mc-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    imports: [
        LoginNavComponent,
        HomeNavComponent,
        FooterComponent,
        PaginationComponent,
        FeedHeaderComponent,
        ArticleListComponent
    ]
})
export class HomePageComponent extends MCPage {
  currentPage = 1;
  articleLimit = 10;
  allArticlesService = inject(AllArticlesService);
  articleSignal = newSignal<AllArticles>();

  constructor() {
    super();
    this.setTitle('Home');
  }

  changePage(page: number) {
    this.currentPage = page;
    console.log(page);
  }

  fetchFeed(feedName: 'global' | 'personal') {
    pendSignal(this.articleSignal);

    switch (feedName) {
      case 'global':
        const sub = this.allArticlesService
          .fetch(this.articleLimit, this.currentPage * 10 - 10)
          .subscribe({
            next: (articles) => {
              completeSignal<AllArticles>(this.articleSignal, articles);
            },
            error: (error) => {
              errorSignal(this.articleSignal, error);
            },
          });
        this.subscriptions.push(sub);
        break;
      case 'personal':
        break;
      default:
        break;
    }
  }
}
