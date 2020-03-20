import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ItemListComponent,
    ItemSingleComponent,
    ItemDetailComponent,
    ItemComponent,
    ItemImagesComponent,
    ItemImagesSingleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
