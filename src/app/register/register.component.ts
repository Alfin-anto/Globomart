import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataShareService } from '../service/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder, private api:DataShareService, private router:Router){}

  registerForm = this.fb.group({
    username:["", [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email:["", [Validators.required,Validators.email]],
    password:["", [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })  

  register(){
    if(this.registerForm.valid){
      let user = this.registerForm.value 
      console.log(user);
      this.api.registerApi(user).subscribe({ 
        next:(res:any)=>{
          console.log(res);
          alert('registered successfully')
          this.router.navigateByUrl('user/login')         

        },
        error:(err:any)=>{
          console.log(err);          
        } 
      })
      
    }
    else{
      alert('invalid form ')
    }
  }

}
