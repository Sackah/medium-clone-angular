import { Injectable } from '@angular/core';
import { MCService } from '../../../classes/mc-service';
import { AllArticles } from '../../../shared/types/article.types';
import { environment } from '../../../../environments/environment.development';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchArticlesService extends MCService {
  
  getAll(limit: number, offset: number) {
    return this.http
      .get<AllArticles>(
        `${environment.BaseUrl}/articles?limit=${limit}&offset=${offset}`,
        this.headers
      )
      .pipe(catchError((error) => this.onError(error)));
  }

  getFeed(limit: number, offset: number){
    return this.http
      .get<AllArticles>(
        `${environment.BaseUrl}/articles/feed?limit=${limit}&offset=${offset}`,
        this.headers
      )
      .pipe(catchError((error) => this.onError(error)));
  }

}
