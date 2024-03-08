import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  isLogin : boolean =false;



  constructor(private _Router:Router,private _AuthService:AuthService){}
  ngOnInit(): void {
    this._AuthService.userInfo.subscribe(()=>{
      if(this._AuthService.userInfo.getValue() == null)
    {
      this.isLogin =false;
    }
    else
    {
      this.isLogin =true;
    }
    })
  }


  logout():void
  {
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }
}
