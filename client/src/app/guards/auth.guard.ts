import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  redirectUrl:string =''

  constructor(private authService: AuthService, private router: Router){

  }

  canActivate(routes: ActivatedRouteSnapshot ,state: RouterStateSnapshot){

    if(this.authService.loggedIn())
    return true;
    else{ 
      this.redirectUrl = state.url
      this.router.navigate(['/login'])
      return false};
  }
  
}
