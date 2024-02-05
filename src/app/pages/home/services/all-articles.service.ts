import {Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { catchError } from 'rxjs';
import { AllArticles } from '../../../shared/types/article.types';
import { MCService } from '../../../classes/mc-service';

@Injectable({
  providedIn: 'root',
})
export class AllArticlesService extends MCService {

  fetch(limit: number, offset: number) {
    return this.http
      .get<AllArticles>(
        `${environment.BaseUrl}/articles?limit=${limit}&offset=${offset}`,
        this.headers
      )
      .pipe(catchError((error) => this.onError(error)));
  }

}
