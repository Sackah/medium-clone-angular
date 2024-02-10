import {createFeature, createReducer, on} from '@ngrx/store';
import {SignUpState} from '@shared/types/auth.types';
import {signUpActions} from './actions';

const initialState: SignUpState = {
  isSubmitting: false,
  errors: null,
  user: null,
}

const signUpFeature = createFeature({
  name: 'signup',
  reducer: createReducer(
    initialState,
    on(signUpActions.signUp, (state) => ({
      ...state,
      isSubmitting: true
    })),
    on(signUpActions.signUpSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      user: action.user,
    })),
    on(signUpActions.signUpFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      user: null,
      errors: action
    }))
  )
});

export const {
  name: signUpFeatureKey,
  reducer: signUpReducer,
  selectUser,
  selectErrors,
  selectIsSubmitting
} = signUpFeature;
