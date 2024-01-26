import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { LoginUserDetails, LoginUserResponse} from '../../shared/types/auth.types';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  constructor() {}

  post(userDetails: LoginUserDetails) {
    return this.http
      .post<LoginUserResponse>(
        `${environment.BaseUrl}/users/login`,
        userDetails,
        this.headers
      )
      // .pipe(catchError((error) => this.onError(error)));
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

  /**
   * Handles the HTTP error response.
   * @param error The HTTP error response.
   * @returns An observable of the error.
   */
  private onError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(error.error);
      return throwError(
        () => new Error('Cannot connect to the server please try again')
      );
    } else {
      console.error(error.error);
      return throwError(() => new Error(`${error.error.message}`));
    }
  }
}
