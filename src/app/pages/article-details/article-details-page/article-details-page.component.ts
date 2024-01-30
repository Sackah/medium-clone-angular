import {Component, inject} from '@angular/core';
import {McPage} from "../../../classes/mc-page";
import {FetchArticleService} from "../services/fetch-article.service";
import {NewArticleResponse} from "../../../shared/types/editor.types";
import {completeSignal, errorSignal, newSignal, pendSignal} from "../../../utils/signal-factory";
import {FooterComponent} from "../../../shared/components/footer/footer.component";
import {HomeNavComponent} from "../../home/components/home-nav/home-nav.component";
import {ProfileBannerComponent} from "../../profile/components/profile-banner/profile-banner.component";
import {ArticleBannerComponent} from "../components/article-banner/article-banner.component";

@Component({
  selector: 'app-article-details-page',
  standalone: true,
  imports: [
    FooterComponent,
    HomeNavComponent,
    ProfileBannerComponent,
    ArticleBannerComponent
  ],
  templateUrl: './article-details-page.component.html',
  styleUrl: './article-details-page.component.scss'
})
export class ArticleDetailsPageComponent extends McPage {
  articleService = inject(FetchArticleService);
  articleSig = newSignal<NewArticleResponse>();
  articleSlug!: string;

  constructor() {
    super();
    this.route.params.subscribe({
      next: (params) => {
        console.log(params['articleSlug']); //-> this in the format /whatever
        this.articleSlug = params['articleSlug'];
      }
    })
    this.setTitle("Details");
    this.fetchArticle();
  }

  fetchArticle() {
    pendSignal(this.articleSig);
    const subscription = this.articleService.get(this.articleSlug).subscribe({
      next: (data) => {
        completeSignal(this.articleSig, data);
        console.log(this.articleSig());
      },
      error: (err) => {
        errorSignal(this.articleSig, err);
      }
    })
  }
}
