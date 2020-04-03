import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userName:string

  constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService
            , private basicAuthenticationService: BasicAuthenticationService) { 
    this.userName = 'nobody'
  }

  ngOnInit() {    
    if(this.basicAuthenticationService.isUserAuthenticated()){
      this.userName = this.basicAuthenticationService.getAuthUser();
    }
  }

}
