import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
              private autenticationService: HardcodedAuthenticationService) { 
    this.username = 'Ryu'
    this.password = ''
    this.errorMessage = 'Invalid credentials!'
    this.isInvalidLogin = false
  }

  ngOnInit() {
  }

  handleLogin() {
    console.log('user:' + this.username + ' / pass:' + this.password )
    if(this.autenticationService.authenticate(this.username, this.password)) {
      this.isInvalidLogin = false
      this.router.navigate(['welcome', this.username])
    } else {
      this.isInvalidLogin = true
    }
  }

}
