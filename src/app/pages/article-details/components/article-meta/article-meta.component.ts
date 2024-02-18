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
import {FormatDate} from '@app/utils/format-date';
import {User} from '@shared/types/auth.types';
import {EditArticleService} from '@app/pages/article-details/services/edit-article.service';
import {FavouriteArticleWorker} from '@app/workers/favorites.worker';
import {FollowProfileWorker} from '@app/workers/followers.worker';
import {newSignal} from '@app/utils/signal-factory';

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
   protected readonly FormatDate = FormatDate;

   constructor() {
      this.favoriteArticleWorker = new FavouriteArticleWorker(
         this.articleSignal
      );
      this.followProfileWorker = new FollowProfileWorker(this.articleSignal);
   }

   favoriteArticle(slug: string, isFavorited: boolean) {
      this.favoriteArticleWorker.favorite(slug, isFavorited, (article) => {
         this.article = {...(this.article as Article), ...article};
         this.updatedArticle.emit(this.article);
      });
   }

   followProfile(username: string, isFollowing: boolean) {
      this.followProfileWorker.follow(username, isFollowing, (profile) => {
         this.article = {...(this.article as Article), author: profile};
         this.updatedArticle.emit(this.article);
      });
   }

   async editArticle() {
      if (this.article) {
         this.editArticleService.edit(this.article, this.slug);
         await this.router.navigateByUrl('/editor');
      }
   }

   deleteArticle(slug: string) {
      this.favoriteArticleWorker.deleteArticle(slug, this.user);
   }

   ngOnDestroy(): void {
      this.favoriteArticleWorker.dispose();
      this.followProfileWorker.dispose();
   }
}
