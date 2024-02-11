import { Component, inject } from '@angular/core';
import { MCPage } from '@app/classes/mc-page';
import { HomeNavComponent } from '@app/pages/home/components/home-nav/home-nav.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { ProfileBannerComponent } from '../components/profile-banner/profile-banner.component';
import { FeedNames, Profile, Tag } from '@shared/types/main.types';
import {
  completeSignal,
  errorSignal,
  newSignal,
  pendSignal,
} from '@app/utils/signal-factory';
import { ProfileFeedHeaderComponent } from '../components/profile-feed-header/profile-feed-header.component';
import { FetchArticlesService } from '@shared/services/fetch-articles.service';
import { AllArticles } from '@shared/types/article.types';
import { ArticleListComponent } from '@app/pages/home/components/article-list/article-list.component';
import { ErrorPageComponent } from '@shared/pages/error-page/error-page.component';
import { McSpinnerComponent } from '@shared/components/loaders/mc-spinner.component';
import { ProfileWorker } from '@/app/workers/profile.worker';
import { FeedWorker } from '@/app/workers/feed.worker';

@Component({
  selector: 'mc-profile-page',
  standalone: true,
  imports: [
    HomeNavComponent,
    FooterComponent,
    ProfileBannerComponent,
    ProfileFeedHeaderComponent,
    ArticleListComponent,
    ErrorPageComponent,
    McSpinnerComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent extends MCPage {
  profileSignal = newSignal<{ profile: Profile }>();
  articleSignal = newSignal<AllArticles>();
  feedName: Extract<FeedNames, 'personal' | 'favorites'> | undefined =
    undefined;
  profileWorker: ProfileWorker;
  feedWorker: FeedWorker;
  protected readonly Boolean = Boolean;

  constructor() {
    super();
    this.profileWorker = new ProfileWorker(
      this.route,
      this.profileSignal,
      [this.articleSignal]
    );
    this.feedWorker = new FeedWorker(this.articleSignal);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.setTitle('Profile');
    this.fetchProfile();
  }

  changeFeed(feedName: typeof this.feedName) {
    this.feedName = feedName;
    this.fetchFeed(feedName);
  }

  fetchProfile() {
    this.profileWorker.fetchProfile(() => {
      this.feedName = 'personal';
      this.fetchFeed();
    });
  }

  fetchFeed(feedName = this.feedName) {
    const userName = this.profileSignal().data?.profile.username;

    if (feedName && userName) {
      this.feedWorker.fetchFeed(feedName, userName);
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.profileWorker.dispose();
    this.feedWorker.dispose();
  }
}
