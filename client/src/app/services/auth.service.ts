import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  domain: string = "http://localhost:8000"
  authToken:any = ""
  user:any = ""
  options:any;
  username:any

  constructor(private http:HttpClient) { }

  createAuthenticationHeader(){
    this.getToken();
    
    return new HttpHeaders({
      authorization:'Bearer '+this.authToken,
      "Content-Type": "application/json; charset=UTF-8"
    })
  }

  private getToken(){
    this.authToken = localStorage.getItem('token')||''
    

  }

  registerUser(user:any):Observable<any>{

    return this.http.post(`${this.domain}/auth/register`, user)
    
  }
  isUsernameAvailable(username:any):Observable<any>{

    return this.http.get(`${this.domain}/auth/checkusername/${username}`)
    
  }
  isEmailAvailable(email:any):Observable<any>{
   
    return this.http.get(`${this.domain}/auth/checkemail/${email}`, )
    
  }

  login(user:any):Observable<any>{
    return this.http.post(`${this.domain}/auth/login`, user)
  }

  getProfile(id:any):Observable<any>{
   return this.http.get(`${this.domain}/user/profile/${id}`, {headers: this.createAuthenticationHeader()})
  }
  logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.authToken =null
    this.user =null
  }

  loggedIn(){
    
    let token = localStorage.getItem('token')
    if(!token) return false
    return true
  }
  storeUserData(token:any, user:any){
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }
}
