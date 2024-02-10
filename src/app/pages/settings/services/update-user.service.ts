import {Injectable} from '@angular/core';
import {environment} from "@/environments/environment.development";
import {UpdateUserDetails, UpdateUserResponse} from "@shared/types/update-user.types";
import {MCService} from '@app/classes/mc-service';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService extends MCService {

  post(userDetails: UpdateUserDetails) {
    return this.http
      .put<UpdateUserResponse>(
        `${environment.BaseUrl}/user`,
        userDetails,
        this.headers
      )
  }

}
