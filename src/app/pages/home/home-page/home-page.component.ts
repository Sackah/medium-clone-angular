import {Component, inject} from '@angular/core';
import {LoginNavComponent} from '../../login/components/login-nav/login-nav.component';
import {HomeNavComponent} from '../components/home-nav/home-nav.component';
import {FooterComponent} from '@shared/components/footer/footer.component';
import {MCPage} from '@app/classes/mc-page';
import {PaginationComponent} from '@shared/components/pagination/pagination.component';
import {AllArticles} from '@shared/types/article.types';
import {newSignal} from '../../../utils/signal-factory';
import {FeedHeaderComponent} from '../components/feed-header/feed-header.component';
import {ArticleListComponent} from '../components/article-list/article-list.component';
import {McSpinnerComponent} from '../../../shared/components/loaders/mc-spinner.component';
import {ErrorPageComponent} from '../../../shared/pages/error-page/error-page.component';
import {FetchArticlesService} from '../../../shared/services/fetch-articles.service';
import {FeedWorker} from '@/app/workers/feed.worker';
import {FeedNames} from '@/app/shared/types/main.types';

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
      ErrorPageComponent,
   ],
})
export class HomePageComponent extends MCPage {
   currentPage = 1;
   articleLimit = 10;
   articlesService = inject(FetchArticlesService);
   articleSignal = newSignal<AllArticles>();
   feedName: Extract<FeedNames, 'global' | 'feed'> = 'global';
   feedWorker: FeedWorker;
   protected readonly Boolean = Boolean;

   constructor() {
      super();
      this.setTitle('Home');
      this.feedWorker = new FeedWorker(this.articleSignal);
   }

   override ngOnInit() {
      super.ngOnInit();
      this.fetchFeed();
   }

   changePage(page: number) {
      this.currentPage = page;
      this.fetchFeed();
   }

   changeFeed(feedName: typeof this.feedName) {
      this.feedName = feedName;
      this.fetchFeed(feedName);
   }

   fetchFeed(feedName = this.feedName) {
      const offsetConstant = this.currentPage * 10 - 10;
      this.feedWorker.fetchFeed(
         feedName,
         undefined,
         this.articleLimit,
         offsetConstant
      );
   }

   override ngOnDestroy() {
      super.ngOnDestroy();
      this.feedWorker.dispose();
   }
}
