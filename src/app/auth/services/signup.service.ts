import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SignUpUserDetails, SignUpUserResponse} from "../../shared/types/auth.types";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private http = inject(HttpClient);
  constructor() {}

  post(userDetails: SignUpUserDetails) {
    return this.http
      .post<SignUpUserResponse>(
        `${environment.BaseUrl}/users`,
        userDetails,
        this.headers
      )
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

}
