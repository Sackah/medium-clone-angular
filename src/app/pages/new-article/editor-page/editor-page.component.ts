import {Component} from '@angular/core';
import {HomeNavComponent} from "../../home/components/home-nav/home-nav.component";
import {FooterComponent} from "../../../shared/components/footer/footer.component";
import {EditorFormComponent} from "../components/editor-form/editor-form.component";
import {NewArticleDetails, NewArticleState} from "../../../shared/types/editor.types";
import {McPage} from "../../../classes/mc-page";
import {combineLatest} from "rxjs";
import {selectErrors, selectIsSubmitting} from "../store/reducers";
import {newArticleActions} from "../store/actions";

@Component({
  selector: 'mc-editor-page',
  standalone: true,
  imports: [
    HomeNavComponent,
    FooterComponent,
    EditorFormComponent
  ],
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.scss'
})
export class EditorPageComponent extends McPage {
  public articleState: Omit<NewArticleState, 'article'> = {
    isSubmitting: false,
    errors: null
  }
  private articleState$ = combineLatest([
    this.store.select(selectIsSubmitting),
    this.store.select(selectErrors)
  ])

  constructor() {
    super();
    this.setTitle("Editor")
  }

  override ngOnInit() {
    super.ngOnInit();
    const articleStateSubscription = this.articleState$.subscribe({
      next: (state) => {
        this.articleState.isSubmitting = state[0];
        this.articleState.errors = state[1];
      },
      error: (err) => {
        this.articleState.errors = err;
      }
    })

    this.subscriptions.push(articleStateSubscription);
  }

  postArticle($event: NewArticleDetails) {
    this.store.dispatch(newArticleActions.post($event));
  }
}
