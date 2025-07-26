import { Routes } from '@angular/router';
import { BlankLayout } from './layouts/blank-layout/blank-layout';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';


export const routes: Routes = [
  {path:'', component:AuthLayout, children:[
    {path:'', redirectTo:'signup', pathMatch:'full'},
    {path:'signup', component:SignupComponent},
  ]},


  {path:'', component:BlankLayout, children:[
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    { path: 'products', component:ProductsComponent },
    { path: 'products-details/:id', component:ProductDetailsComponent },
    { path: 'cart', component:CartComponent},
  // { path: '**', redirectTo: 'products' },
  ]},

];
