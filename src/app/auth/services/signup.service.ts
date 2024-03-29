import {Injectable} from '@angular/core';
import {SignUpUserDetails, SignUpUserResponse} from "@shared/types/auth.types";
import {environment} from "@/environments/environment.development";
import {MCService} from '@app/classes/mc-service';

@Injectable({
  providedIn: 'root'
})
export class SignupService extends MCService {

  constructor() {
    super();
  }

  post(userDetails: SignUpUserDetails) {
    return this.http
      .post<SignUpUserResponse>(
        `${environment.BaseUrl}/users`,
        userDetails,
        this.headers
      )
  }

}
