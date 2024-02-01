import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {signUpActions} from "./actions";
import {SignupService} from "../../services/signup.service";
import {TokenService} from "../../../shared/services/token.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CurrentUserService} from "../../../shared/services/current-user.service";


export const signUpEffects = createEffect(
  (
    actions$ = inject(Actions),
    signUpService = inject(SignupService),
    tokenService = inject(TokenService),
    currentUserService = inject(CurrentUserService)
  ) => {
    return actions$.pipe(
      ofType(signUpActions.signUp),
      switchMap((userDetails) => {
        return signUpService.post(userDetails).pipe(
          map((response) => {
            tokenService.set(response.user.token);
            currentUserService.setCurrentUser(response.user);
            return signUpActions.signUpSuccess(response);
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 0) {
              return of(
                signUpActions.signUpFailure({
                  Network: ["Error. Check connectivity and try again"]
                })
              )
            } else if (error.status === 500) {
              return of(
                signUpActions.signUpFailure({
                  Server: ["Cannot be reached. Please try later"]
                })
              )
            }
            return of(
              signUpActions.signUpFailure(error.error.errors)
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const redirectAfterSignUp = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(signUpActions.signUpSuccess),
      tap({
        next: () => {
          router.navigateByUrl('/').then().catch(e => console.error(e));
        }
      })
    );
  },
  {functional: true, dispatch: false}
);
