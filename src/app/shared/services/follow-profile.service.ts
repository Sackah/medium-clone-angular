import { Injectable } from '@angular/core';
import { MCService } from '@app/classes/mc-service';
import { environment } from '@/environments/environment.development';
import { catchError, map } from 'rxjs';
import { Profile } from '../types/main.types';

@Injectable({
  providedIn: 'root',
})
export class FollowProfileService extends MCService {
  follow(username: string) {
    return this.http
      .post<{ profile: Profile }>(
        `${environment.BaseUrl}/profiles/${username}/follow`,
        {}
      )
      .pipe(
        map((data) => data.profile),
        catchError((error) => this.onError(error))
      );
  }

  unfollow(username: string) {
    return this.http
      .delete<{ profile: Profile }>(
        `${environment.BaseUrl}/profiles/${username}/follow`
      )
      .pipe(
        map((data) => data.profile),
        catchError((error) => this.onError(error))
      );
  }
}
