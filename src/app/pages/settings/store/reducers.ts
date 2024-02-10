import {createFeature, createReducer, on} from '@ngrx/store';
import {UpdateUserState} from "@shared/types/update-user.types";
import {updateUserActions} from "./actions";

const initialState: UpdateUserState = {
  isSubmitting: false,
  errors: null,
  user: null
}

const updateUserFeature = createFeature({
  name: 'updateUser',
  reducer: createReducer(
    initialState,
    on(updateUserActions.update, (state) => ({...state, isSubmitting: true})),
    on(updateUserActions.updateSuccess, (state, action) => ({
      ...state,
      user: action.user,
      errors: null,
      isSubmitting: false
    })),
    on(updateUserActions.updateFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      errors: action,
    }))
  ),
});

export const {
  name: updateUserFeatureKey,
  reducer: updateUserReducer,
  selectErrors,
  selectIsSubmitting,
} = updateUserFeature;
