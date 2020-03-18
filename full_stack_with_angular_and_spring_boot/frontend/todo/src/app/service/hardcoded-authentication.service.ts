import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(userName: string, password: string) {
    if(userName !== 'Ryu' || password !== '123') {
      return false;
    } else {
      sessionStorage.setItem('userAuth', userName);
      return true;
    }
  }

  isUserLoggedIn() {
    return sessionStorage.getItem('userAuth') !== null
  }

  logout() {
    sessionStorage.removeItem('userAuth');
  }

}
