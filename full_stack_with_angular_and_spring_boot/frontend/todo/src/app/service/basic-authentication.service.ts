import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const USER_AUTH = 'userAuth'
export const TOKEN = 'token'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) {}

  // Methos to call atuhtentication web service
  executeBasicAuthenticationService(userName, password) {

    // Build an Encode string in base-64 for credentials
    let basicAuthHeaderString = 'Basic ' + window.btoa(userName + ':' + password);

    /* Build an authorization header in order to pass it to the webservice and can be
       handled an validated by spring security
    */
    let header = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    
    // Call GET "basicauth" RES webservice
    return this.http.get<BasicAuthenticationBean>(`${API_URL}/basicauth`, {headers: header})
          .pipe( // Make the next action
                map(
                  data => { // Response is successfully
                    // Add data to the session storage
                    sessionStorage.setItem(USER_AUTH, userName);
                    sessionStorage.setItem(TOKEN, basicAuthHeaderString);
                    return data;
                  }
                )
              )
    }
  
  // Get the session item "userAuth" (user name)
  getAuthUser() {
    return sessionStorage.getItem(USER_AUTH)
  }

  // Get the session item "token" (encode string base-64 for credentials)
  getAuthToken() {
    if (this.getAuthUser())      
      return sessionStorage.getItem(TOKEN)
  }  

  isUserAuthenticated(): boolean {
    return sessionStorage.getItem(USER_AUTH) !== null
  }

  logout() {
    sessionStorage.removeItem(USER_AUTH);
    sessionStorage.removeItem(TOKEN);
  }

}

// Bean class
export class BasicAuthenticationBean {
  constructor(message:string){}
}
