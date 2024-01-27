import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../types/auth.types";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {environment} from "../../../environments/environment.development";

/**
 * @class CurrentUserService - This service is the single source of truth for the current
 * user throughout the application.
 * @property user - An observable that resolves to the current user
 * @method fetchCurrentUser - A method to fetch the user from the server
 * @method setCurrentUser - A method for setting the current user when we get the user after
 * making an api call ex: login
 * @method clearCurrentUser - Method to remove the current user
 */
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private userDataSource = new BehaviorSubject<User | null>(null)
  user = this.userDataSource.asObservable();

  http = inject(HttpClient);
  tokenService = inject(TokenService);

  constructor() { }

  fetchCurrentUser(){
    const token = this.tokenService.get();
    if(token){
      this.http.get<User>(`${environment.BaseUrl}/user`).subscribe({
        next: (user)=>{
          this.userDataSource.next(user);
        },
        error: ()=>{
          this.userDataSource.next(null);
        }
      })
    } else {
      this.userDataSource.next(null);
    }
  }

  setCurrentUser(user: User){
    this.userDataSource.next(user);
  }

  clearCurrentUser(){
    this.userDataSource.next(null);
  }
}
