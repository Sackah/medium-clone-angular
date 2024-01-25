import { createFeature, createReducer, on } from '@ngrx/store';
import { LoginState } from '../../../shared/types/auth.types';
import { login } from './actions';

const initialState: LoginState = {
  isSubmitting: false,
  errors: null,
  user: null,
};

const loginFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(login.login, (state, action) => ({ ...state, isSubmitting: true })),
    on(login.loginSuccess, (state, action) => ({
      ...state,
      user: action.user,
      errors: null,
    })),
    on(login.loginFailure, (state, action) => ({
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
