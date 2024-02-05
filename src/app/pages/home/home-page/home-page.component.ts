import { Component, inject } from '@angular/core';
import { LoginNavComponent } from '../../auth/components/login-nav/login-nav.component';
import { FeedComponent } from '../components/feed/feed.component';
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

@Component({
  selector: 'mc-home-page',
  standalone: true,
  imports: [
    LoginNavComponent,
    FeedComponent,
    HomeNavComponent,
    FooterComponent,
    PaginationComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
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
              completeSignal(this.articleSignal, articles);
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
