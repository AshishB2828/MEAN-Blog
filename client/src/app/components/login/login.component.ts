import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup ;
  message:string="";
  messageClass:string=""
  processing:boolean = false
  



  constructor(private formBuilder:FormBuilder,private authService:AuthService, private router:Router) {
    this.form = this.formBuilder.group({
      username:['',[ Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      password:['',[ Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    })
   }

  ngOnInit(): void {
    
  }

  onLoginSubmit(){
    this.processing =true;
    this.disableForm();
    const user ={
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    }
    this.authService.login(user).subscribe(
      data=> {
        if(!data.success){
          this.messageClass ="alert alert-danger";
          this.message = data.message
          this.processing = false
          this.enableForm()
        }else{
          this.messageClass = "alert alert-success"
          this.message = data.message
          this.authService.storeUserData(data.token, data.user)
          setTimeout(() =>{
            this.router.navigate(['/home']);
          })
        }
      },
      error=>{
        console.log(error);
      }
    )
  }


 

      

  disableForm(){
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm(){
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

  
}
