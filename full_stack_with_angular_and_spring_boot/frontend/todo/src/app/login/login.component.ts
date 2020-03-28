import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string
  password: string
  errorMessage: string
  isInvalidLogin: boolean
 
  // Dependency injection to inject Router so you can use as property of class
  constructor(private router: Router, 
              private hardcodedAutenticationService: HardcodedAuthenticationService,
              private basicAutenticationService: BasicAuthenticationService) { 
    this.username = 'Ryu'
    this.password = ''
    this.errorMessage = 'Invalid credentials!'
    this.isInvalidLogin = false
  }

  ngOnInit() {
  }

  // Method to handle authentication in hardcoded way
  handleLogin() {    
    if(this.hardcodedAutenticationService.authenticate(this.username, this.password)) {
      this.isInvalidLogin = false
      this.router.navigate(['welcome', this.username])
    } else {
      this.isInvalidLogin = true
    }
  }

  // Method to handle basic authentication through webservice
  handleBasicAuthLogin() {
    this.basicAutenticationService.executeBasicAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.isInvalidLogin = false
          this.router.navigate(['welcome', this.username])
        },
        error => {
          this.isInvalidLogin = true
        }
      );
  }  

}
