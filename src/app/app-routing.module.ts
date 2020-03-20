import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './user/register/register.component';
import {ItemComponent} from './home/item/item.component';
import {ItemDetailComponent} from './home/item-detail/item-detail.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {
    path: 'home', component: HomeComponent, children: [
      {path: '', component: ItemComponent},
      {path: ':id', component: ItemDetailComponent}
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
