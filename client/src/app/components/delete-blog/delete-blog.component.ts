import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.css']
})
export class DeleteBlogComponent implements OnInit {

  message:any
  messageClass:any
  foundBlog:any;
  processing:any=false;
  BlogId:any

  constructor(private blogService: BlogService, private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.BlogId = this.activatedRoute.snapshot.params.id
  }

  deleteBlog(){
    this.processing = true
    this.blogService.deleteBlog(this.BlogId).subscribe(
      data => {
        if(!data.success){
          this.message = data.message
          this.messageClass ="alert alert-danger"
        }else{
          this.message = data.message
          this.messageClass ="alert alert-succes"
          setTimeout(() =>{
            this.router.navigate(['/blog'])
          },2000)
        }
      },
      (error)=>{
        if(error.status === 401)
        {
          this.message = "yor not allowed to this operation"
          this.messageClass ="alert alert-danger"
        }
        console.log(error)
      }
    )
  }



}
