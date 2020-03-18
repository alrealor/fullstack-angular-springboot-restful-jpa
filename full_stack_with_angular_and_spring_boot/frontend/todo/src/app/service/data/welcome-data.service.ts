import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>('http://localhost:8088/hello-world-bean');
  }

  executeHelloWorldPathVariableService(name:string) {
    return this.http.get<HelloWorldBean>(`http://localhost:8088/hello-world-bean/path-variable/${name}`);
  }  
}

export class HelloWorldBean {
  constructor(public message:string){}
}
