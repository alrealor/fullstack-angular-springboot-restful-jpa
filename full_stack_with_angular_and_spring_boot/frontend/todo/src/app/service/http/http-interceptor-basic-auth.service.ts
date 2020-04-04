import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthenticationService : BasicAuthenticationService) {}
  
  // Interceptor method to put the authorization header into request
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let basicAuthHeaderString = this.basicAuthenticationService.getAuthToken();

    // If user token already exists then add it to the request
    if(basicAuthHeaderString) {
      request = request.clone({
        setHeaders : {
          Authorization : basicAuthHeaderString
        }
      })
    }

    return next.handle(request);
  }




 

  
}
