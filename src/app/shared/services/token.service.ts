import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenName: string = "token";

  constructor() { }

  get(){
    let token;

     try {
       token = localStorage.getItem(this.tokenName)
       return token
     } catch (e){
       return undefined;
     }
  }

  set(token: string){
    localStorage.setItem(this.tokenName, token);
  }
}
