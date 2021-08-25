import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { BlogPost } from '../models/blogPost.model';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
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
    this.user =JSON.parse(localStorage.getItem('user') || '{}')
    this.getAllBlogs(this.user._id)
  }

  newBlogForm(){
    this.newPost =true
  }

  relaodForm(){
    this.loadingBlogs =true
    this.getAllBlogs(this.user._id)
    setTimeout(()=>{
      this.loadingBlogs = false;
    },4000)
  }

  onBlogSubmit(){
    this.processing=true;
    this.disableForm()
    const blog ={
      title:this.form.get('title')?.value,
      body:this.form.get('body')?.value,
      images:[...this.images,this.form.get('images')?.value]
    }

    this.blogService.createNewBlog(blog).subscribe(
      (data:any)=>{
        if(!data.success){
          this.messageClass ="alert alert-danger"
          this.message = data.message;
          this.processing = false
        }else{
          this.messageClass ="alert alert-success"
          this.message = data.message;
          this.blogPosts = [data.blog,...this.blogPosts]
          console.log(this.blogPosts)
          setTimeout(()=>{
            this.processing = false
            this.newPost =false
            this.message=""
            this.form.reset();
            this.messageClass =""
            this.enableForm()
          }, 2000 )
        }
      }
    )
  }

  getAllBlogs(id:any){
    this.blogService.getAllBlogsById(id).subscribe(
      data=>{
        this.blogPosts = data.blogs 
        console.log(this.blogPosts)
      },
      error=>console.log(error)
    )
  }
  likeBlog(id:any){
    this.blogService.likeBlog(id).subscribe(data=>{
      this.getAllBlogs(this.user._id)
    },
    error=>{
      console.log(error)
    })
  }
  dislikeBlog(id:any){
    this.blogService.disLikeBlog(id).subscribe(data=>{
      this.getAllBlogs(this.user._id)
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
      this.getAllBlogs(this.user._id)
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

  enableForm(){
    this.form.get('title')?.enable()
    this.form.get('body')?.enable()
  }
  disableForm(){
    this.form.get('title')?.disable()
    this.form.get('body')?.disable()
  }

  goBack(){
    location.reload()
  }

  alphaNumericValidation(controls:any){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/)
    if(regExp.test(controls.value))
    return null
    else return {alphaNumericValidation:true}
    
  }
}
