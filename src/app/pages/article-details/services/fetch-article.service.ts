import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";
import {NewArticleResponse} from "../../../shared/types/editor.types";
import {catchError, throwError} from "rxjs";

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
      .pipe(catchError((error) => this.onError(error)));
  }

  /**
   * Handles the HTTP error response.
   * @param error The HTTP error response.
   * @returns An observable of the error.
   */
  private onError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(error.error);
      return throwError(() => ({
        Network: ['Error. Check connectivity and try again']
      }));
    } else {
      console.error(error.error);
      return throwError(() => error.error.errors);
    }
  }
}
