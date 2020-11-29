import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  is_verified = false;

  constructor() { }

  ngOnInit(): void {
  }

  signup(username: String, email: String, password: String){
    return;
  }

  isVerified(){
        window.open('./verify.html', '_blank');
        this.is_verified = true;
  }



}
