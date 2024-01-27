import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { loginFeatureKey, loginReducer } from './auth/store/login/reducers';
import * as loginEffects from './auth/store/login/effects';
import {signUpFeatureKey, signUpReducer} from "./auth/store/signup/reducers";
import * as signUpEffects from './auth/store/signup/effects';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(loginFeatureKey, loginReducer),
    provideState(signUpFeatureKey, signUpReducer),
    provideEffects(loginEffects, signUpEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
