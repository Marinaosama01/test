import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient,private _Router:Router) {

  
    if(localStorage.getItem("currentPage") )
    {

    _Router.navigate([localStorage.getItem("currentPage")])

    }

   }

  userInfo:BehaviorSubject<any> = new BehaviorSubject(null);
  baseUrl:string="https://ecommerce.routemisr.com/api/v1/auth/";


  register(userData:object):Observable<any>{
   return this._HttpClient.post(this.baseUrl+`signup`,userData)
  }


  login(userData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl+`signin`,userData)
   }
 

   decodeUser():void{

    const encode = localStorage.getItem('etoken')

    if(encode !== null)
    {
      const decode = jwtDecode(encode);
      this.userInfo.next(decode) ;
       
    }


   }
}
