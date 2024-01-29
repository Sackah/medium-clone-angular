import {provideState} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {loginFeatureKey, loginReducer} from './auth/store/login/reducers';
import * as loginEffects from './auth/store/login/effects';
import {signUpFeatureKey, signUpReducer} from "./auth/store/signup/reducers";
import * as signUpEffects from './auth/store/signup/effects';
import {updateUserFeatureKey, updateUserReducer} from "./pages/settings/store/reducers";
import * as updateUserEffects from './pages/settings/store/effects';

export const asyncConfig = [
  provideState(loginFeatureKey, loginReducer),
  provideState(signUpFeatureKey, signUpReducer),
  provideState(updateUserFeatureKey, updateUserReducer),
  provideEffects(loginEffects, signUpEffects, updateUserEffects),
]
