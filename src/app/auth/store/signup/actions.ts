import {createActionGroup, props} from '@ngrx/store';
import {BackendErrors, SignUpUserDetails, SignUpUserResponse} from '@shared/types/auth.types';

export const signUpActions = createActionGroup({
  source: 'signup',
  events: {
    SignUp: props<SignUpUserDetails>(),
    SignUpSuccess: props<SignUpUserResponse>(),
    SignUpFailure: props<BackendErrors>()
  }
})
