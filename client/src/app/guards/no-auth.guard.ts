import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router){

  }
  canActivate(){
    
    if(this.authService.loggedIn()){
      this.router.navigate(['/'])
      return false
    }else{
      return true
    }
  }
  
}
