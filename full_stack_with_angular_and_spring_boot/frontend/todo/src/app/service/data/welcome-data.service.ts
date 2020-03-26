import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>('http://localhost:8088/hello-world-bean');
  }

  /* Method that retrieves a message from a web service using header Authorization
  */
  executeHelloWorldPathVariableService(name:string) {
    let header = new HttpHeaders({
      Authorization: this.crateBasicAuthenticationHttpHeader()
    });

    return this.http.get<HelloWorldBean>(`http://localhost:8088/hello-world-bean/path-variable/${name}`
                                      , {headers : header} );
  }  

  // Method that creates a windowsBase64 encoder
  crateBasicAuthenticationHttpHeader():string {
    let user = 'user';
    let password = 'pass';
    let basicAuthHeaderString = 'Basic ' + window.btoa(user + ':' + password); //Provide a WindowBase64 encoder
    return basicAuthHeaderString;
  }  
}



export class HelloWorldBean {
  constructor(public message:string){}
}
