import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";
import {NewArticleDetails, NewArticleResponse} from "../../../shared/types/editor.types";

@Injectable({
  providedIn: 'root'
})
export class NewArticleService {
  private http = inject(HttpClient);

  constructor() {
  }

  /**
   * Returns standard headers
   * @returns {HttpHeaders}
   */
  private get headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
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
