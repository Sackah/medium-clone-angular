import {createFeature, createReducer, on} from '@ngrx/store';
import {LoginState} from '@shared/types/auth.types';
import {loginActions} from './actions';

const initialState: LoginState = {
  isSubmitting: false,
  errors: null,
  user: null,
};

const loginFeature = createFeature({
  name: 'login',
  reducer: createReducer(
    initialState,
    on(loginActions.login, (state) => ({...state, isSubmitting: true})),
    on(loginActions.loginSuccess, (state, action) => ({
      ...state,
      user: action.user,
      errors: null,
      isSubmitting: false
    })),
    on(loginActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      errors: action,
    }))
  ),
});

export const {
  name: loginFeatureKey,
  reducer: loginReducer,
  selectUser,
  selectErrors,
  selectIsSubmitting,
} = loginFeature;
