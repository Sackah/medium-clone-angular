import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";
import {NewArticleResponse} from "../../../shared/types/editor.types";

@Injectable({
  providedIn: 'root'
})
export class FetchArticleService {
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

  get(articleSlug: string) {
    return this.http
      .get<NewArticleResponse>(
        `${environment.BaseUrl}/articles${articleSlug}`,
        this.headers
      )
  }
}
