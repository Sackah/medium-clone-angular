import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';
import {articleActions} from './actions';
import {NewArticleService} from '../services/new-article.service';
import {HttpErrorResponse} from '@angular/common/http';
import {EditArticleService} from "../../article-details/services/edit-article.service";

export const newArticleEffects = createEffect(
  (
    actions$ = inject(Actions),
    newArticleService = inject(NewArticleService)
  ) => {
    return actions$.pipe(
      ofType(articleActions.post),
      switchMap((article) => {
        return newArticleService.post(article).pipe(
          map((response) => {
            return articleActions.postSuccess(response);
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 0) {
              return of(
                articleActions.postFailure({
                  Network: ['Error. Check connectivity and try again'],
                })
              );
            }
            return of(articleActions.postFailure(error.error.errors));
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
      ofType(articleActions.postSuccess),
      tap({
        next: async (data) => {
          console.log(data);
          const route = `/${data.article.slug}`;
          await router.navigate(['/article', route]);
        },
      })
    );
  },
  {functional: true, dispatch: false}
);


export const editArticleEffects = createEffect(
  (
    actions$ = inject(Actions),
    editArticleService = inject(EditArticleService)
  ) => {
    return actions$.pipe(
      ofType(articleActions.edit),
      switchMap((article) => {
        return editArticleService.post(article).pipe(
          map((response) => {
            return articleActions.editSuccess(response);
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 0) {
              return of(
                articleActions.editFailure({
                  Network: ['Error. Check connectivity and try again'],
                })
              );
            }
            return of(articleActions.editFailure(error.error.errors));
          })
        );
      })
    );
  },
  {functional: true}
);

export const redirectAfterEdit = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(articleActions.editSuccess),
      tap({
        next: async (data) => {
          console.log(data);
          const route = `/${data.article.slug}`;
          await router.navigate(['/article', route]);
        },
      })
    );
  },
  {functional: true, dispatch: false}
);
