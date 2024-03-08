import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path:'' , redirectTo :"home" , pathMatch:"full"},
{path:"register",component:RegisterComponent},
{path:"login",component:LoginComponent},
{path:"home",canActivate:[authGuard],component:HomeComponent},
{path:"brands",canActivate:[authGuard],component:BrandsComponent},
{path:"products",canActivate:[authGuard],component:ProductsComponent},
{path:"cart",canActivate:[authGuard],component:CartComponent},
{path:"categories",canActivate:[authGuard],component:CategoriesComponent},
{path:"details",canActivate:[authGuard],component:DetailsComponent},
{path:"**",component:NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),HomeComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
