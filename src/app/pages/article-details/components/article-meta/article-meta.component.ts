import {
   Component,
   EventEmitter,
   inject,
   Input,
   OnDestroy,
   Output,
} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Article, Profile} from '@shared/types/main.types';
import {formatDate} from '@app/utils/format-date';
import {User} from '@shared/types/auth.types';
import {EditArticleService} from '@app/pages/article-details/services/edit-article.service';
import {FavouriteArticleWorker} from '@app/workers/favorites.worker';
import {FollowProfileWorker} from '@app/workers/followers.worker';
import {
   completeSignal,
   errorSignal,
   newSignal,
   pendSignal,
} from '@app/utils/signal-factory';
import {Subscription} from 'rxjs';

@Component({
   selector: 'mc-article-meta',
   standalone: true,
   imports: [RouterLink],
   templateUrl: './article-meta.component.html',
   styleUrl: './article-meta.component.scss',
})
export class ArticleMetaComponent implements OnDestroy {
   @Input() user?: User;
   @Input() lightBg: boolean = false;
   @Input() article?: Article;
   @Input() slug: string = '';
   @Output() updatedArticle = new EventEmitter<Article>();
   router = inject(Router);
   editArticleService = inject(EditArticleService);
   favoriteArticleWorker: FavouriteArticleWorker;
   followProfileWorker: FollowProfileWorker;
   articleSignal = newSignal<Article>();
   subscriptions: Subscription[] = [];

   constructor() {
      this.favoriteArticleWorker = new FavouriteArticleWorker(
         this.articleSignal
      );
      this.followProfileWorker = new FollowProfileWorker(this.articleSignal);
   }

   formatDate(date: string | undefined) {
      if (date) {
         return formatDate(date);
      }
      return null;
   }

   async editArticle() {
      if (this.article) {
         this.editArticleService.edit(this.article, this.slug);
         await this.router.navigateByUrl('/editor');
      }
   }

   updateArticle(article: Article) {
      this.article = {...(this.article as Article), ...article};
      this.updatedArticle.emit(this.article);
   }

   updateProfile(profile: Profile) {
      this.article = {...(this.article as Article), author: profile};
      this.updatedArticle.emit(this.article);
   }

   deleteArticle(slug: string) {
      this.favoriteArticleWorker.deleteArticle(slug, this.user);
   }

   favoriteArticle(slug: string, isFavorited: boolean) {
      this.favoriteArticleWorker.favorite(slug, isFavorited, (articel) => {
         this.updateArticle(articel);
      });
   }

   followProfile(username: string, isFollowing: boolean) {
      this.followProfileWorker.follow(username, isFollowing, (profile) => {
         this.updateProfile(profile);
      });
   }

   ngOnDestroy(): void {
      this.favoriteArticleWorker.dispose();
      this.followProfileWorker.dispose();
   }
}
