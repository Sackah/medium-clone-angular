import {createFeature, createReducer, on} from '@ngrx/store';
import {NewArticleState} from '@shared/types/editor.types';
import {articleActions} from './actions';

const initialState: NewArticleState = {
  isSubmitting: false,
  errors: null,
  article: null,
};

const newArticleFeature = createFeature({
  name: 'edit',
  reducer: createReducer(
    initialState,
    on(articleActions.post, (state) => ({...state, isSubmitting: true})),
    on(articleActions.postSuccess, (state, action) => ({
      ...state,
      article: action.article,
      errors: null,
      isSubmitting: false,
    })),
    on(articleActions.postFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      errors: action,
    })),
    on(articleActions.edit, (state) => ({...state, isSubmitting: true})),
    on(articleActions.editSuccess, (state, action) => ({
      ...state,
      article: action.article,
      errors: null,
      isSubmitting: false,
    })),
    on(articleActions.editFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      errors: action,
    })),
  ),
});

export const {
  name: newArticleFeatureKey,
  reducer: newArticleReducer,
  selectErrors,
  selectIsSubmitting,
} = newArticleFeature;
