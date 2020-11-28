import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { SignupComponent } from './signup/signup.component';




const routes: Routes = [
  { path: 'initial-login', component: InitialLoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  constructor(public router: Router) {

  　　}
 }
