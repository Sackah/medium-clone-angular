import {Component, inject} from '@angular/core';
import {MCPage} from '@app/classes/mc-page';
import {HomeNavComponent} from '@app/pages/home/components/home-nav/home-nav.component';
import {FooterComponent} from '@shared/components/footer/footer.component';
import {ProfileBannerComponent} from '../components/profile-banner/profile-banner.component';
import {ProfileService} from '../services/profile.service';
import {Profile} from '@shared/types/main.types';
import {completeSignal, errorSignal, newSignal, pendSignal,} from '@app/utils/signal-factory';
import {ProfileFeedHeaderComponent} from '../components/profile-feed-header/profile-feed-header.component';
import {FetchArticlesService} from '@shared/services/fetch-articles.service';
import {AllArticles} from '@shared/types/article.types';
import {ArticleListComponent} from '@app/pages/home/components/article-list/article-list.component';
import {ErrorPageComponent} from '@shared/pages/error-page/error-page.component';
import {McSpinnerComponent} from '@shared/components/loaders/mc-spinner.component';

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
  userName: string = '';
  profileService = inject(ProfileService);
  profileSignal = newSignal<{ profile: Profile }>();
  currentProfile: Profile | undefined = undefined;
  feedName: 'favorites' | 'personal' | undefined = undefined;
  articleSignal = newSignal<AllArticles>();
  protected readonly Boolean = Boolean;
  private articlesService = inject(FetchArticlesService);

  constructor() {
    super();
    this.fetchRouteParameters();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.setTitle('Profile');
    this.fetchProfile(this.userName);
  }

  changeFeed(feedName: typeof this.feedName) {
    this.feedName = feedName;
    this.fetchFeed(feedName);
  }

  fetchProfile(username: string) {
    pendSignal(this.profileSignal);
    const sub = this.profileService.get(username).subscribe({
      next: (profile) => {
        this.currentProfile = profile.profile;
        completeSignal(this.profileSignal, profile);
        this.feedName = 'personal';
      },
      error: (err) => {
        errorSignal(this.profileSignal, err);
      },
    });
    this.subscriptions.push(sub);
  }

  fetchRouteParameters() {
    this.route.params.subscribe({
      next: (params) => {
        this.userName = params['userName'];
      },
    });
  }

  fetchFeed(feedName = this.feedName) {
    pendSignal(this.articleSignal);

    switch (feedName) {
      case 'personal':
        const sub1 = this.articlesService
          .getByUser(this.currentProfile?.username as string)
          .subscribe({
            next: (articles) => {
              completeSignal(this.articleSignal, articles);
            },
            error: (err) => {
              errorSignal(this.articleSignal, err);
            },
          });
        this.subscriptions.push(sub1);
        break;
      case 'favorites':
        const sub2 = this.articlesService
          .getByFavorited(this.currentProfile?.username as string)
          .subscribe({
            next: (articles) => {
              completeSignal(this.articleSignal, articles);
            },
            error: (err) => {
              errorSignal(this.articleSignal, err);
            },
          });
        this.subscriptions.push(sub2);
        break;
      default:
        break;
    }
  }
}
