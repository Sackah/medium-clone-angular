import {Component, inject} from '@angular/core';
import {LoginNavComponent} from '../../auth/components/login-nav/login-nav.component';
import {HomeNavComponent} from '../components/home-nav/home-nav.component';
import {FooterComponent} from '../../../shared/components/footer/footer.component';
import {MCPage} from '../../../classes/mc-page';
import {PaginationComponent} from '../../../shared/components/pagination/pagination.component';
import {AllArticles} from '../../../shared/types/article.types';
import {completeSignal, errorSignal, newSignal, pendSignal,} from '../../../utils/signal-factory';
import {FeedHeaderComponent} from "../components/feed-header/feed-header.component";
import {ArticleListComponent} from "../components/article-list/article-list.component";
import {McSpinnerComponent} from "../../../shared/components/loaders/mc-spinner.component";
import {ErrorPageComponent} from "../../../shared/pages/error-page/error-page.component";
import { FetchArticlesService } from '../services/fetch-articles.service';

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
    ArticleListComponent,
    McSpinnerComponent,
    ErrorPageComponent
  ]
})
export class HomePageComponent extends MCPage {
  currentPage = 1;
  articleLimit = 10;
  articlesService = inject(FetchArticlesService);
  articleSignal = newSignal<AllArticles>();
  feedName: 'global' | 'personal' = 'global';

  constructor() {
    super();
    this.setTitle('Home');
  }

  changePage(page: number) {
    this.currentPage = page;
    this.fetchFeed(this.feedName)
  }

  changeFeed(feedName: typeof this.feedName) {
    this.feedName = feedName;
    this.fetchFeed(feedName);
  }

  fetchFeed(feedName = this.feedName) {
    pendSignal(this.articleSignal);
    const offsetConstant = this.currentPage * 10 - 10

    switch (feedName) {
      case 'global':
        const sub = this.articlesService
          .getAll(this.articleLimit, offsetConstant)
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
        const sub2 = this.articlesService
          .getFeed(this.articleLimit, offsetConstant)
          .subscribe({
            next: (articles) => {
              completeSignal(this.articleSignal, articles);
            },
            error: (error) => {
              errorSignal(this.articleSignal, error);
            },
          });
        this.subscriptions.push(sub2);
        break;
      default:
        break;
    }
  }
}
