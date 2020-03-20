import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
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
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { ContentComponent } from './home/content/content.component';
import { FooterComponent } from './home/footer/footer.component';
import { ItemComponent } from './home/item/item.component';
import {ItemListComponent} from './home/item/item-list/item-list.component';
import {ItemSingleComponent} from './home/item/item-list/item-single/item-single.component';
import {ItemDetailComponent} from './home/item-detail/item-detail.component';
import { ItemImagesComponent } from './home/item-detail/item-images/item-images.component';
import { ItemImagesSingleComponent } from './home/item-detail/item-images/item-images-single/item-images-single.component';
import { CartComponent } from './home/cart/cart.component';

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
    ItemListComponent,
    ItemSingleComponent,
    ItemDetailComponent,
    ItemComponent,
    ItemImagesComponent,
    ItemImagesSingleComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
