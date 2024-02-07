import {Injectable} from '@angular/core';
import {MCService} from "../../../classes/mc-service";
import {environment} from "../../../../environments/environment.development";
import {catchError} from "rxjs";
import {Profile} from "../../../shared/types/main.types";

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends MCService {

  get(userName: string) {
    return this.http.get<{ profile: Profile }>(
      `${environment.BaseUrl}/profiles/${userName}`,
      this.headers
    )
      .pipe(catchError((error) => this.onError(error)));
  }

}
