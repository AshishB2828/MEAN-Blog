import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../components/models/blogPost.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  domain: string = "http://localhost:8000"


  constructor(private http:HttpClient,private auth:AuthService ) { }

  createNewBlog(blog:any):Observable<any>{
    return this.http.post(`${this.domain}/blogs/newblog`, blog, {headers:this.auth.createAuthenticationHeader()})
  }

  getAllBlogs():Observable<any>{
    return this.http.get(`${this.domain}/blogs/all`, {headers:this.auth.createAuthenticationHeader()})
  }

  getCurrentBlog(id:any):Observable<any>{
    return this.http.get(`${this.domain}/blogs/current/${id}`, {headers:this.auth.createAuthenticationHeader()})
  }

  updateBlog(blog:BlogPost):Observable<any>{
    return this.http.put(`${this.domain}/blogs/update`, blog, {headers:this.auth.createAuthenticationHeader()})
  }
}
