import { Injectable } from '@angular/core';
import { MCService } from '../../classes/mc-service';
import { Article } from '../types/main.types';
import { environment } from '../../../environments/environment.development';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteArticleService extends MCService {
  favorite(slug: string) {
    return this.http
      .post<{ article: Article }>(
        `${environment.BaseUrl}/articles/${slug}/favorite`,
        {}
      )
      .pipe(
        map((data) => data.article),
        catchError((error) => this.onError(error))
      );
  }

  unfavorite(slug: string) {
    return this.http
      .delete<{ article: Article }>(
        `${environment.BaseUrl}/articles/${slug}/favorite`
      )
      .pipe(
        map((data) => data.article),
        catchError((error) => this.onError(error))
      );
  }
}
