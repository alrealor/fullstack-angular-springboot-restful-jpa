import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  userName: string
  welcomeMessageFromService: string

  constructor(
    private route: ActivatedRoute,
    private welcomeDataService: WelcomeDataService) { 
    this.userName = this.route.snapshot.params['userName']   
  }

  ngOnInit() {
    // console.log(this.userName)    
  }
  
  // Method to call the WelcomeDataService
  getWelcomeMessage(){
    this.welcomeDataService.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

    // Method to call the WelcomeDataService
    getWelcomeMessagePathVariable(){
      this.welcomeDataService.executeHelloWorldPathVariableService(this.userName).subscribe(
        response => this.handleSuccessfulResponse(response),
        error => this.handleErrorResponse(error)
      );
    }

  // Method to handle success response from WelcomeDataService
  handleSuccessfulResponse(response) {
    this.welcomeMessageFromService = response.message;
  }

  // Method to handle error response from WelcomeDataService
  handleErrorResponse(error){    
    this.welcomeMessageFromService = error.error.status + " - " + error.error.error + " - " + error.error.message;
  }

}
