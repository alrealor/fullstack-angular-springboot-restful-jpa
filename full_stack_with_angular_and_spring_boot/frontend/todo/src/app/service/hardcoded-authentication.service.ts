import { Injectable } from '@angular/core';

export const USER_AUTH = 'userAuth'
@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(userName: string, password: string) {
    if(userName !== 'Ryu' || password !== '123') {
      return false;
    } else {
      sessionStorage.setItem(USER_AUTH, userName);
      return true;
    }
  }

  isUserLoggedIn() {
    return sessionStorage.getItem(USER_AUTH) !== null
  }

  getLoggedUserName():string {
    return sessionStorage.getItem(USER_AUTH);
 }

  logout() {
    sessionStorage.removeItem(USER_AUTH);
  }



}
