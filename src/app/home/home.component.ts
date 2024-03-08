import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CuttextPipe } from '../cuttext.pipe';
import { Category } from '../category';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  standalone:true,
  imports:[CommonModule,CuttextPipe,CarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

constructor(private _ProductService:ProductService){}

products:Product[] =[]
categories:Category [] = [];
  ngOnInit(): void {

    this._ProductService.getProducts().subscribe({
      next:(response)=>{
        this.products = response.data;
      }
    });

    this._ProductService.getCategories().subscribe({
      next:(response)=>
      {
      console.log(response.data)
        this.categories = response.data;
      },
    })
    localStorage.setItem("currentPage","/home")
  }
  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    navSpeed: 700,
    navText: ['', ''],
   items:1,
    nav: true
  }
}
