import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) {}

  // Methos to call atuhtentication web service
  executeBasicAuthenticationService(userName, password) {

    let basicAuthHeaderString = 'Basic ' + window.btoa(userName + ':' + password);

    let header = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });

    return this.http.get<BasicAuthenticationBean>(
      `http://localhost:8088/basicauth`,
      { headers: header }
    ).pipe( 
        map(
          data => {
            sessionStorage.setItem('userAuth', userName);
            return data;
          }
        )
      )
  }
  

  isUserLoggedIn() {
    return sessionStorage.getItem('userAuth') !== null
  }

  getLoggedUserName():string {
    return sessionStorage.getItem('userAuth');
 }

  logout() {
    sessionStorage.removeItem('userAuth');
  }

}

// Bean class
export class BasicAuthenticationBean {
  constructor(message:string){}
}
