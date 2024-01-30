import {createActionGroup, props} from '@ngrx/store';
import {BackendErrors} from "../../../shared/types/auth.types";
import {NewArticleDetails, NewArticleResponse} from "../../../shared/types/editor.types";

export const newArticleActions = createActionGroup({
  source: 'edit',
  events: {
    Post: props<NewArticleDetails>(),
    PostSuccess: props<NewArticleResponse>(),
    PostFailure: props<BackendErrors>(),
  }
})
