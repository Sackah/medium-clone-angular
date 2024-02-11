import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {LoginUserDetails, LoginUserResponse} from '../../shared/types/auth.types';
import { MCService } from '../../classes/mc-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends MCService{

  constructor() {
    super();
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
