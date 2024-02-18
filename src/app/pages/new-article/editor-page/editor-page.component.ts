import {Component, inject} from '@angular/core';
import {HomeNavComponent} from '../../home/components/home-nav/home-nav.component';
import {FooterComponent} from '@shared/components/footer/footer.component';
import {EditorFormComponent} from '../components/editor-form/editor-form.component';
import {
   EditArticleDetails,
   NewArticleDetails,
   NewArticleState,
} from '@shared/types/editor.types';
import {MCPage} from '@app/classes/mc-page';
import {combineLatest, map, tap} from 'rxjs';
import {selectErrors, selectIsSubmitting} from '../store/reducers';
import {articleActions} from '../store/actions';
import {EditArticleService} from '../../article-details/services/edit-article.service';
import {Article} from '@shared/types/main.types';

@Component({
   selector: 'mc-editor-page',
   standalone: true,
   imports: [HomeNavComponent, FooterComponent, EditorFormComponent],
   templateUrl: './editor-page.component.html',
   styleUrl: './editor-page.component.scss',
})
export class EditorPageComponent extends MCPage {
   editArticleService = inject(EditArticleService);
   article: Article | null = null;
   public articleState: Omit<NewArticleState, 'article'> = {
      isSubmitting: false,
      errors: null,
   };
   private articleState$ = combineLatest([
      this.store.select(selectIsSubmitting),
      this.store.select(selectErrors),
   ]).pipe(
      tap(([isSubmitting, errors]) => {
         this.articleState.isSubmitting = isSubmitting;
         this.articleState.errors = errors;
      })
   );

   constructor() {
      super();
      this.setTitle('Editor');
   }

   override ngOnInit() {
      super.ngOnInit();
      this.setupEditService();
      this.subscriptions.push(this.articleState$.subscribe());
   }

   setupEditService() {
      const sub = this.editArticleService.data.subscribe({
         next: (article) => {
            if (article) {
               this.article = article;
            }
         },
      });

      this.subscriptions.push(sub);
   }

   /**
    *  If an article exists in this component, edit it, else post it.
    *  An article may exist in this component if it is passed by any of the subscribers
    *  of the editArticleService
    * */
   postArticle($event: NewArticleDetails | EditArticleDetails) {
      if (!this.article) {
         this.store.dispatch(articleActions.post($event as NewArticleDetails));
      } else {
         this.store.dispatch(articleActions.edit($event));
      }
   }

   override ngOnDestroy() {
      super.ngOnDestroy();
      if (this.article) {
         this.editArticleService.edit(null);
      }
   }
}
