import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {NewArticleResponse} from "../../../shared/types/editor.types";
import {catchError, throwError} from "rxjs";
import { MCService } from '../../../classes/mc-service';

@Injectable({
  providedIn: 'root'
})
export class FetchArticleService extends MCService {

  get(articleSlug: string) {
    return this.http
      .get<NewArticleResponse>(
        `${environment.BaseUrl}/articles${articleSlug}`,
        this.headers
      )
      .pipe(catchError((error) => this.onError(error)));
  }

}
