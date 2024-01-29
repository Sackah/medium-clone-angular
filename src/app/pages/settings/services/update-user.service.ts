import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";
import {UpdateUserDetails, UpdateUserResponse} from "../../../shared/types/update-user.types";

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
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

  post(userDetails: UpdateUserDetails) {
    return this.http
      .put<UpdateUserResponse>(
        `${environment.BaseUrl}/user`,
        userDetails,
        this.headers
      )
  }
}
