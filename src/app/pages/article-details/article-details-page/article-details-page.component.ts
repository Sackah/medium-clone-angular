import {Component, inject} from '@angular/core';
import {MCPage} from '@app/classes/mc-page';
import {FetchArticleService} from '../services/fetch-article.service';
import {NewArticleResponse} from '@shared/types/editor.types';
import {completeSignal, errorSignal, newSignal, pendSignal,} from '@app/utils/signal-factory';
import {FooterComponent} from '@shared/components/footer/footer.component';
import {HomeNavComponent} from '../../home/components/home-nav/home-nav.component';
import {ProfileBannerComponent} from '../../profile/components/profile-banner/profile-banner.component';
import {ArticleBannerComponent} from '../components/article-banner/article-banner.component';
import {PageSpinnerComponent} from '@shared/components/loaders/page-spinner.component';
import {ErrorPageComponent} from '@shared/pages/error-page/error-page.component';
import {LoginNavComponent} from "../../login/components/login-nav/login-nav.component";
import {ArticleContentComponent} from "@app/pages/article-details/components/article-content/article-content.component";
import {ArticleCommentComponent} from "@app/pages/article-details/components/article-comment/article-comment.component";

@Component({
  selector: 'app-article-details-page',
  standalone: true,
  imports: [
    FooterComponent,
    HomeNavComponent,
    ProfileBannerComponent,
    ArticleBannerComponent,
    PageSpinnerComponent,
    ErrorPageComponent,
    LoginNavComponent,
    ArticleContentComponent,
    ArticleCommentComponent,
  ],
  templateUrl: './article-details-page.component.html',
  styleUrl: './article-details-page.component.scss',
})
export class ArticleDetailsPageComponent extends MCPage {
  articleService = inject(FetchArticleService);
  articleSig = newSignal<NewArticleResponse>();
  articleSlug!: string;

  constructor() {
    super();
    this.fetchRouteParameters();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.setTitle('Details');
    this.fetchArticle();
  }

  fetchArticle() {
    pendSignal(this.articleSig);
    const subscription = this.articleService.get(this.articleSlug).subscribe({
      next: (data) => {
        completeSignal(this.articleSig, data);
      },
      error: (err) => {
        errorSignal(this.articleSig, err);
      },
    });
    this.subscriptions.push(subscription);
  }

  fetchRouteParameters() {
    const subscription = this.route.params.subscribe({
      next: (params) => {
        this.articleSlug = params['articleSlug'];
      },
    });
    this.subscriptions.push(subscription);
  }
}
