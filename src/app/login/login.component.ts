import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataShareService } from '../service/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder, private api:DataShareService, private router:Router ){}

  loginForm = this.fb.group({
    email:["", [Validators.required,Validators.email]],
    password:["", [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  login(){
    if(this.loginForm.valid){
      let user = this.loginForm.value
      this.api.loginApi(user).subscribe({
        next:(res:any)=>{
          console.log(res);
          sessionStorage.setItem("username",res.existingUser.username) 
          sessionStorage.setItem("token",res.token)
          alert('Login successful')
          this.router.navigateByUrl("")

          
        },
        error:(err:any)=>{
          console.log(err);   
          alert('Something went wrong')       
        } 
      })


    }
    else{
      alert('Invalid form')
    }
  }
}
