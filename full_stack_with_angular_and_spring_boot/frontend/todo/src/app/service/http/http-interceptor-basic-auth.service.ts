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

    console.log("Inside Interceptor: HttpInterceptorBasicAuthService" );

    let basicAuthHeaderString = this.basicAuthenticationService.getAuthToken();
    console.log("interceptor.basicAuthHeaderString = " + basicAuthHeaderString);

    // If user is logged then add encoder headers to the request
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
