import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
             private router: Router,
            private flashMessageService :FlashMessagesService) {

             }

  ngOnInit(): void {
  }
  onLogOut(){
    this.authService.logOut()
    this.flashMessageService.show("You are logged out",{cssClass:'alert-info'})
   
    this.router.navigate(['/']);
   
  }

  
}
