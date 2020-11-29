import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { SignupComponent } from './signup/signup.component';
import { FunctionalityComponent } from './functionality/functionality.component';



@NgModule({
  declarations: [
    AppComponent,
    InitialLoginComponent,
    SignupComponent,
    FunctionalityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
