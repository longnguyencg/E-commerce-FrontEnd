import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './user/register/register.component';
import {SocialLoginModule} from 'angularx-social-login';
import {SocialLoginComponent} from './user/social-login/social-login.component';
import {ItemComponent} from './home/item/item.component';
import {ItemDetailComponent} from './home/item-detail/item-detail.component';
import {CartComponent} from './home/cart/cart.component';



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login/social', component: SocialLoginComponent}
  {
    path: 'home', component: HomeComponent, children: [
      {path: '', component: ItemComponent},
      {path: 'detail/:id', component: ItemDetailComponent},
      {path: 'cart', component: CartComponent},
    ]
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
