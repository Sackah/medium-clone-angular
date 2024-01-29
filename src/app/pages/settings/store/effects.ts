import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {updateUserActions} from "./actions";
import {UpdateUserService} from "../services/update-user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CurrentUserService} from "../../../shared/services/current-user.service";

export const updateUserEffects = createEffect(
  (
    actions$ = inject(Actions),
    updateUserService = inject(UpdateUserService),
    currentUserService = inject(CurrentUserService)
  ) => {
    return actions$.pipe(
      ofType(updateUserActions.update),
      switchMap((userDetails) => {
        return updateUserService.post(userDetails).pipe(
          map((response) => {
            currentUserService.setCurrentUser(response.user);
            return updateUserActions.updateSuccess(response);
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 0) {
              return of(
                updateUserActions.updateFailure({
                  Network: ["Error. Check connectivity and try again"]
                })
              )
            }
            return of(
              updateUserActions.updateFailure(error.error.errors)
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const redirectAfterUpdate = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(updateUserActions.updateSuccess),
      tap({
        next: (data) => {
          const userRoute = `/${data.user.username}`;
          router.navigate(['/profile', userRoute]).then().catch(e => console.error(e));
        }
      })
    );
  },
  {functional: true, dispatch: false}
);
