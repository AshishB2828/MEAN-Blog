import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import { BlogPost } from '../models/blogPost.model';
import { BlogService } from 'src/app/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  messageClass:any
  message:any
  blog= new BlogPost()
  processing=false
  blogId:any
  loading=true

  constructor(private location:Location, 
              private blogService:BlogService,
              private activatedRoute: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.blogId = this.activatedRoute.snapshot.params.id
    if(this.blogId){
      this.blogService.getCurrentBlog(this.blogId).subscribe(
        data=>{
          if(!data.success){
            this.message= data.message
            this.messageClass ="alert alert-danger"
          }
          else{
            this.blog = data.blog
            this.loading =false
          }
        },
        error => {
         if(Number(error.status) !== 403)
         this.message= "Something went wrong. Try again"
          else
          this.message= "your not allowed to do this operation"
          this.messageClass ="alert alert-danger"
          }
      )
    }
  }

  updateBlogSubmit(){
    this.processing = true
    this.blogService.updateBlog(this.blog).subscribe(
      data=>{
        if(!data.success){
          this.message= data.message
          this.messageClass ="alert alert-danger"
          this.processing =false
        }else{
          this.messageClass ="alert alert-success"
          this.message= data.message
          setTimeout(()=>{
            this.location.back()
          },2000)

        }
      },
      error => {
        if(Number(error.status) !== 403)
        this.message= "Something went wrong. Try again"
         else
         this.message= "your not allowed to do this operation"
         this.messageClass ="alert alert-danger"
         }
    )
  }

  goBack(){
    this.location.back()
  }

}
