import {Injectable} from '@angular/core';
import {MCService} from '@app/classes/mc-service';
import {AllArticles} from '../types/article.types';
import {environment} from '@/environments/environment.development';
import {catchError} from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class FetchArticlesService extends MCService {
   constructor() {
      super();
   }

   getAll(limit: number, offset: number) {
      return this.http
         .get<AllArticles>(
            `${environment.BaseUrl}/articles?limit=${limit}&offset=${offset}`,
            this.headers
         )
         .pipe(catchError((error) => this.onError(error)));
   }

   getFeed(limit: number, offset: number) {
      return this.http
         .get<AllArticles>(
            `${environment.BaseUrl}/articles/feed?limit=${limit}&offset=${offset}`,
            this.headers
         )
         .pipe(catchError((error) => this.onError(error)));
   }

   getByUser(username: string, limit: number = 20, offset: number = 0) {
      return this.http
         .get<AllArticles>(
            `${environment.BaseUrl}/articles?author=${username}&limit=${limit}&offset=${offset}`,
            this.headers
         )
         .pipe(catchError((error) => this.onError(error)));
   }

   getByFavorited(username: string, limit: number = 20, offset: number = 0) {
      return this.http
         .get<AllArticles>(
            `${environment.BaseUrl}/articles?favorited=${username}&limit=${limit}&offset=${offset}`,
            this.headers
         )
         .pipe(catchError((error) => this.onError(error)));
   }

   getByTag(tag: string, limit: number = 20, offset: number = 0) {
      return this.http
         .get<AllArticles>(
            `${environment.BaseUrl}/articles?tag=${tag}&limit=${limit}&offset=${offset}`,
            this.headers
         )
         .pipe(catchError((error) => this.onError(error)));
   }
}
