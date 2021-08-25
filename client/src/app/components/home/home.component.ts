import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { BlogPost } from '../models/blogPost.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  messageClass:string=""
  message:string=""
  newPost:boolean =false
  loadingBlogs:boolean =false
  form:FormGroup
  totalLength:number =500;
  processing:boolean =false
  images:[]=[]
  blogPosts:Array<BlogPost> = []
  user:any=[]
  newComment:any=[]
  comment:any=""
  enabledComments:any=[]

  constructor(private formBuilder: FormBuilder,private blogService:BlogService,private authService:AuthService) { 
    this.form = this.formBuilder.group({
      title:['',[Validators.required]],
      body:['',[Validators.required]],
      images:''

    })
  }
  
  ngOnInit(): void {
    this.getAllBlogs()
    this.user =JSON.parse(localStorage.getItem('user') || '{}')
  }


  relaodForm(){
    this.loadingBlogs =true
    this.getAllBlogs()
    setTimeout(()=>{
      this.loadingBlogs = false;
    },4000)
  }

  getAllBlogs(){
    this.blogService.getAllBlogs().subscribe(
      data=>{
        this.blogPosts = data.blogs 
        console.log(this.blogPosts)
      },
      error=>console.log(error)
    )
  }
  likeBlog(id:any){
    this.blogService.likeBlog(id).subscribe(data=>{
      this.getAllBlogs()
    },
    error=>{
      console.log(error)
    })
  }
  dislikeBlog(id:any){
    this.blogService.disLikeBlog(id).subscribe(data=>{
      this.getAllBlogs()
    },
    error=>{
      console.log(error)
    })
  }
  createComment(id:any){
    console.log(id)
    this.processing =true
    this.blogService.postComment(id, this.comment).subscribe(
      data=>{
      this.getAllBlogs()
      const index =this.newComment.indexOf(id)
      this.newComment.splice(index,1)
      this.comment=""
      this.processing =false;
      if(this.enabledComments.indexOf(id)<0)
      this.expandComments(id)
    })
  }

  draftComment(id:any){
    this.newComment = []
    this.newComment.push(id)
  }

  expandComments(id:any){
    this.enabledComments.push(id)
  }
  cancelComment(id:any){
    this.newComment=this.newComment.filter((i:any) => id!==i)
    this.comment =""
  }

  collapseComments(id:any){
    this.enabledComments = this.enabledComments.filter((i:any) =>id!==i)
  }

  goBack(){
    location.reload()
  }
}
