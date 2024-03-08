import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
Router
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

constructor(private _AuthService:AuthService,private _Router:Router){}

errMsg:string ='';
isLoading:boolean=false;





registerForm:FormGroup = new FormGroup({
  name:new FormControl('',[Validators.required,Validators.minLength(3)]),
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.pattern(/^[A-z][0-9].{6}/)]),
  rePassword:new FormControl('',),
  phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}/)]),


} ,{validators:[this.confirmPassword]} as FormControlOptions);

confirmPassword(group:FormGroup):void{
  const password=group.get('password');
  const rePassword=group.get('rePassword');

  if( password?.value =='')
  {
    rePassword?.setErrors({required:true})
  }


  else if( password?.value != rePassword?.value)
  {
    rePassword?.setErrors({mismatch:true})
  }



}

handleForm():void
{
const userData = this.registerForm.value;
this.isLoading = true;
if(this.registerForm.valid == true)
{
this._AuthService.register(userData).subscribe({

  next:(response)=>{
    
    if(response.message == "success")
    {
      this.isLoading = false;
      this._Router.navigate(['/login'])
    }
    
    ;},
  error:(err)=>
  {
   this.errMsg = err.error.message;
   this.isLoading = false;

  }

});
}
}
}
