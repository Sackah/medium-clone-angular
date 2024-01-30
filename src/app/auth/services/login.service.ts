import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {LoginUserDetails, LoginUserResponse} from '../../shared/types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
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

  post(userDetails: LoginUserDetails) {
    return this.http
      .post<LoginUserResponse>(
        `${environment.BaseUrl}/users/login`,
        userDetails,
        this.headers
      )
  }


}
