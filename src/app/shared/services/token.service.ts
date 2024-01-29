import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenName: string = "token";
  private routeName: string = "lastRoute";

  constructor() {
  }

  get() {
    let token;

    try {
      token = localStorage.getItem(this.tokenName)
      return token
    } catch (e) {
      return undefined;
    }
  }

  set(token: string) {
    localStorage.setItem(this.tokenName, token);
  }

  clear() {
    localStorage.removeItem(this.tokenName);
  }

  setRoute(value: string) {
    localStorage.setItem(this.routeName, value);
  }

  getRoute() {
    let route;

    try {
      route = localStorage.getItem(this.routeName);
      return route
    } catch (e) {
      return undefined;
    }
  }

  clearRoute() {
    localStorage.removeItem(this.routeName);
  }

  clearAll() {
    this.clear();
    this.clearRoute();
  }
}
