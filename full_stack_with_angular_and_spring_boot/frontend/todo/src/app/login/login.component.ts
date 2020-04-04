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

  userName: string
  userPass: string
  errorMessage: string
  isInvalidLogin: boolean
 
  // Dependency injection to inject Router so you can use as property of class
  constructor(private router: Router, 
              private hardcodedAutenticationService: HardcodedAuthenticationService,
              private basicAutenticationService: BasicAuthenticationService) { 
    this.userName = 'user'
    this.userPass = ''
    this.errorMessage = 'Invalid credentials!'
    this.isInvalidLogin = false
  }

  ngOnInit() {
  }

  // Method to handle JWT authentication through JWT webservice
  handleJWTAuthLogin() {
    this.basicAutenticationService.executeJWTAuthenticationService(this.userName, this.userPass)
      .subscribe(
        data => {
          this.isInvalidLogin = false
          this.router.navigate(['welcome', this.userName])
        },
        error => {
          this.isInvalidLogin = true
        }
      );
  }


  // Method to handle authentication in hardcoded way
  handleLogin() {    
    if(this.hardcodedAutenticationService.authenticate(this.userName, this.userPass)) {
      this.isInvalidLogin = false
      this.router.navigate(['welcome', this.userName])
    } else {
      this.isInvalidLogin = true
    }
  }
  

  // Method to handle basic authentication through webservice
  handleBasicAuthLogin() {
    this.basicAutenticationService.executeBasicAuthenticationService(this.userName, this.userPass)
      .subscribe(
        data => {
          this.isInvalidLogin = false
          this.router.navigate(['welcome', this.userName])
        },
        error => {
          this.isInvalidLogin = true
        }
      );
  }  

}
