import {Injectable} from '@angular/core';
import {environment} from "@/environments/environment.development";
import {NewArticleDetails, NewArticleResponse} from "@shared/types/editor.types";
import {MCService} from '@app/classes/mc-service';

@Injectable({
  providedIn: 'root'
})
export class NewArticleService extends MCService {

  constructor() {
    super();
  }

  post(article: NewArticleDetails) {
    return this.http
      .post<NewArticleResponse>(
        `${environment.BaseUrl}/articles`,
        article,
        this.headers
      )
  }

}
