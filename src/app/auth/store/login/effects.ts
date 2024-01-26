import {createEffect, Actions, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {loginActions} from "./actions";
import {LoginService} from "../../services/login.service";
import {TokenService} from "../../../shared/services/token.service";
import {HttpErrorResponse} from "@angular/common/http";

export const loginEffects = createEffect(
  (
    actions$ = inject(Actions),
    loginService = inject(LoginService),
    tokenService = inject(TokenService)
  )=>{
    return actions$.pipe(
      ofType(loginActions.login),
      switchMap((userDetails)=>{
        return loginService.post(userDetails).pipe(
          map((response)=>{
            tokenService.set(response.user.token);
            return loginActions.loginSuccess(response);
          }),
          catchError((error: HttpErrorResponse)=>{
            if(error.status === 0){
              return of(
                loginActions.loginFailure({
                  Network: ["Error. Check connectivity and try again"]
                })
              )
            }
            return of(
              loginActions.loginFailure(error.error.errors)
            );
          })
        );
      })
    );
  },
  {functional: true}
  );

export const redirectAfterLogin = createEffect(
   (actions$ = inject(Actions), router = inject(Router))=>{
    return actions$.pipe(
      ofType(loginActions.loginSuccess),
      tap({
        next: () => {
          router.navigateByUrl('/home').then().catch(e=>console.error(e));
        }
      })
    );
    },
    {functional: true, dispatch: false}
);
