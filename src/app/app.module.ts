import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './home/header/header.component';
import {ContentComponent} from './home/content/content.component';
import {FooterComponent} from './home/footer/footer.component';
import {SocialLoginComponent} from './user/social-login/social-login.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('34629895531-bjfceg08otcrvccd3q94bgnd2j2gaoim.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1114478768886523')
  }
]);

export function provideConfig() {
  return config;
}
import {ItemComponent} from './home/item/item.component';
import {ItemDetailComponent} from './home/item-detail/item-detail.component';
import {ItemImagesComponent} from './home/item-detail/item-images/item-images.component';
import {ItemImagesSingleComponent} from './home/item-detail/item-images/item-images-single/item-images-single.component';
import {CartComponent} from './home/cart/cart.component';
import { TrendingItemComponent } from './home/trending-item/trending-item.component';
import {UserService} from './user/user.service';
import { AdminComponent } from './admin/admin.component';
import { ItemDetailsComponent } from './admin/item-details/item-details.component';
import { ItemsComponent } from './admin/items/items.component';
import { ItemCreateComponent } from './admin/item-create/item-create.component';
import { ItemCategoryComponent } from './home/item-category/item-category.component';
import { RatingComponent } from './home/item-detail/rating/rating.component';
import { ProfileComponent } from './user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    SocialLoginComponent,
    ItemDetailComponent,
    ItemComponent,
    ItemImagesComponent,
    ItemImagesSingleComponent,
    CartComponent,
    TrendingItemComponent,
    AdminComponent,
    ItemDetailsComponent,
    ItemsComponent,
    ItemCreateComponent,
    ItemCategoryComponent,
    RatingComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    FormsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    FormsModule,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
