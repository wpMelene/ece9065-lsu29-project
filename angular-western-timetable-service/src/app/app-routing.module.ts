import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { SignupComponent } from './signup/signup.component';
import { VerificationComponent } from './verification/verification.component';
import { FunctionalityComponent } from './functionality/functionality.component'



const routes: Routes = [
  // { path: 'initial-login', component: InitialLoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verification', component: VerificationComponent },
  { path: 'functionality', component: FunctionalityComponent },
  { path: '**', component: InitialLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  // constructor(public router: Router) {

  // 　　}
 }
