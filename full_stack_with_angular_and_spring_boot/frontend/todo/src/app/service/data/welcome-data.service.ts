import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean`);
  }

  /* Method that retrieves a message from a web service using header Authorization
  */
  executeHelloWorldPathVariableService(name:string) {

    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean/path-variable/${name}`);
  }  
}

export class HelloWorldBean {
  constructor(public message:string){}
}
