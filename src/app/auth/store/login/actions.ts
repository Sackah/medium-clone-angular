import { createActionGroup, props } from '@ngrx/store';
import {
  BackendErrors,
  LoginUserDetails,
  LoginUserResponse,
} from '../../../shared/types/auth.types';

export const loginActions = createActionGroup({
  source: 'auth',
  events: {
    Login: props<LoginUserDetails>(),
    LoginSuccess: props<LoginUserResponse>(),
    LoginFailure: props<BackendErrors>(),
  },
});
