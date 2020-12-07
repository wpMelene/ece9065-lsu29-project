import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { SignupComponent } from './signup/signup.component';
import { FunctionalityComponent } from './functionality/functionality.component';
import { HttpClientModule } from '@angular/common/http';
import { VerificationComponent } from './verification/verification.component';




@NgModule({
  declarations: [
    AppComponent,
    InitialLoginComponent,
    SignupComponent,
    FunctionalityComponent,
    VerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [FunctionalityComponent, InitialLoginComponent, SignupComponent, VerificationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
