import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, catchError, of, tap} from 'rxjs';
import {LoginUserResponse, User} from '../types/auth.types';
import {TokenService} from './token.service';
import {environment} from '@/environments/environment.development';
import {MCService} from '@app/classes/mc-service';

export interface UserData {
  data: User | null;
  isLoggedIn: boolean;
}

/**
 * @class CurrentUserService - This service is the single source of truth for the current
 * user throughout the application.
 */
@Injectable({
  providedIn: 'root',
})
export class CurrentUserService extends MCService {
  tokenService = inject(TokenService);
  private userDataSource = new BehaviorSubject<UserData>({
    data: null,
    isLoggedIn: false,
  });
  /**
   * @property user - An observable that resolves to the current user
   */
  user = this.userDataSource.asObservable();

  constructor() {
    super();
  }

  /**
   * @method fetchCurrentUser - A method to fetch the user from the server
   * @returns - An observable that resolves to the current user
   */
  fetchCurrentUser() {
    const token = this.tokenService.get();
    if (token) {
      return this.http.get<LoginUserResponse>(`${environment.BaseUrl}/user`).pipe(
        tap((res) => {
          this.userDataSource.next({
            data: res.user,
            isLoggedIn: true,
          });
        }),
        catchError(() => {
          this.userDataSource.next({
            data: null,
            isLoggedIn: false,
          });
          return of(null);
        })
      );
    } else {
      this.userDataSource.next({
        data: null,
        isLoggedIn: false,
      });
      return of(null);
    }
  }

  /**
   * @method setCurrentUser - A method for setting the current user when we get the user after
   * making an api call ex: login
   * @param user
   */
  setCurrentUser(user: User) {
    this.userDataSource.next({
      data: user,
      isLoggedIn: true,
    });
  }

  /**
   * @method clearCurrentUser - Method to remove the current user
   * @returns void
   */
  clearCurrentUser() {
    this.userDataSource.next({
      data: null,
      isLoggedIn: false,
    });
  }
}
