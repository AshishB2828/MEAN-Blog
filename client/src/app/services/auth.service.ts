import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http'
import { map } from "rxjs/operators"; 
import { Observable } from 'rxjs';
import { RegResponse } from '../components/models/regRes.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  domain: string = "http://localhost:8000"
  authToken:string = ""
  user:string = ""

  constructor(private http:HttpClient) { }

  registerUser(user:any):Observable<any>{

    return this.http.post(`${this.domain}/auth/register`, user)
    
  }
  isUsernameAvailable(username:any):Observable<any>{

    return this.http.get(`${this.domain}/auth/checkusername/${username}`)
    
  }
  isEmailAvailable(email:any):Observable<any>{
    console.log(email)
    return this.http.get(`${this.domain}/auth/checkemail/${email}`, )
    
  }

  login(user:any):Observable<any>{
    return this.http.post(`${this.domain}/auth/login`, user)
  }

  storeUserData(token:any, user:any){
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }
}
