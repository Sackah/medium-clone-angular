import {createActionGroup, props} from '@ngrx/store';
import {BackendErrors} from '../../../shared/types/auth.types';
import {EditArticleDetails, NewArticleDetails, NewArticleResponse,} from '../../../shared/types/editor.types';

export const articleActions = createActionGroup({
  source: 'edit',
  events: {
    Post: props<NewArticleDetails>(),
    PostSuccess: props<NewArticleResponse>(),
    PostFailure: props<BackendErrors>(),
    Edit: props<EditArticleDetails>(),
    EditSuccess: props<NewArticleResponse>(),
    EditFailure: props<BackendErrors>(),
  },
});
