import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {newArticleActions} from "./actions";
import {NewArticleService} from "../services/new-article.service";
import {HttpErrorResponse} from "@angular/common/http";

export const newArticleEffects = createEffect(
  (
    actions$ = inject(Actions),
    newArticleService = inject(NewArticleService),
  ) => {
    return actions$.pipe(
      ofType(newArticleActions.post),
      switchMap((article) => {
        return newArticleService.post(article).pipe(
          map((response) => {
            return newArticleActions.postSuccess(response);
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 0) {
              return of(
                newArticleActions.postFailure({
                  Network: ["Error. Check connectivity and try again"]
                })
              )
            }
            return of(
              newArticleActions.postFailure(error.error.errors)
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const redirectAfterPost = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(newArticleActions.postSuccess),
      tap({
        next: async (data) => {
          console.log(data);
          const route = `/${data.article.slug}`;
          await router.navigate(['/article', route]);
        }
      })
    );
  },
  {functional: true, dispatch: false}
);
