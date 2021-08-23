import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:FormGroup ;
  message:string="";
  messageClass:string=""
  processing:boolean = false
  emailValid:boolean = true
  emailMsg:string=""
  usernameValid:boolean = true
  usernameMsg:string=""



  constructor(private formBuilder:FormBuilder,private authService:AuthService, private router:Router) {
    this.form = this.formBuilder.group({
      email:['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), this.ValidateEmail]],
      username:['',[ Validators.required, Validators.minLength(2), Validators.maxLength(30), this.validateUserName]],
      password:['',[ Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      confirm:['', Validators.required]
    },{validator: this.matchingPassword('password', 'confirm')})
   }

  ngOnInit(): void {
    
  }

  onRegisetrSubmit(){
    if(this.processing)
      return 
    this.processing = true
    this.disableForm()
    const user ={
      email: this.form.get('email')?.value,
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    }
    this.authService.registerUser(user).subscribe(
     ( data:any) => {
        if(!data.success){
          this.messageClass="alert alert-danger"
          this.message= data.message
          this.processing = false; 
          this.enableForm() 
        }else{
          this.messageClass="alert alert-success"
          this.message= data.message
          setTimeout(() =>{
            this.router.navigate(['/login'])
          })
        }
      }
    )
  }


  checkUsernameAvailable(){
    this.authService.isUsernameAvailable(this.form.get('username')?.value)
    .subscribe(
      (data)=>{
        if(!data.success){
          this.usernameValid= false
          this.usernameMsg=data.message
        }else{
          this.usernameValid= true
          this.usernameMsg=data.message
        }
      }
    )
  }

      checkEmailAvailabile(){
        this.authService.isEmailAvailable(this.form.get('email')?.value)
        .subscribe(
          (data)=>{
            console.log(data.message)
            if(!data.success){
              this.emailValid= false
              this.emailMsg=data.message
            }else{
              this.emailValid= true
              this.emailMsg=data.message
            }
          }
        )
      }

  disableForm(){

    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  enableForm(){
    
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();

  }

  ValidateEmail(controls:any){

    const regExp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    if(regExp.test(controls.value)) return null
    return {'validateEmail':true}
  }

  validateUserName(controls:any){
    const regExp =new RegExp(/^[a-zA-Z0-9]+$/)
    if(regExp.test(controls.value)) return null
    return {'validateUserName':true}
  }
  matchingPassword(password: any, confirm:any){
    return (group:FormGroup)=>{
      if(group.controls[password].value === group.controls[confirm].value)
      return null
      else return {'matchingPasswords':true}
    }
  }
  
}
