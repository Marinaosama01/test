import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
})
export class LoginComponent {

  constructor(private _AuthService:AuthService,private _Router:Router){}

  errMsg:string ='';
  isLoading:boolean=false;
  
  loginForm:FormGroup = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-z][0-9].{6}/)]),
  } );
  
  
  
  handleForm():void
  {
  const userData = this.loginForm.value;
  this.isLoading = true;
  if(this.loginForm.valid == true)
  {
  this._AuthService.login(userData).subscribe({
    next:(response)=>{
      if(response.message == "success")
      {

        localStorage.setItem('etoken',response.token)
        this._AuthService.decodeUser();
        this.isLoading = false;
        this._Router.navigate(['/home'])
      };
    },
    error:(err)=>
    {
     this.errMsg = err.error.message;
     this.isLoading = false;
    }
  });
  }
  }
}
