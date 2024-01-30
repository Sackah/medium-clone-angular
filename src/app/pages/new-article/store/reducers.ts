import {createFeature, createReducer, on} from '@ngrx/store';
import {NewArticleState} from "../../../shared/types/editor.types";
import {newArticleActions} from "./actions";

const initialState: NewArticleState = {
  isSubmitting: false,
  errors: null,
  article: null
}

const newArticleFeature = createFeature({
  name: 'edit',
  reducer: createReducer(
    initialState,
    on(newArticleActions.post, (state) => ({...state, isSubmitting: true})),
    on(newArticleActions.postSuccess, (state, action) => ({
      ...state,
      article: action.article,
      errors: null,
      isSubmitting: false
    })),
    on(newArticleActions.postFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      errors: action,
    }))
  ),
});

export const {
  name: newArticleFeatureKey,
  reducer: newArticleReducer,
  selectErrors,
  selectIsSubmitting
} = newArticleFeature;
