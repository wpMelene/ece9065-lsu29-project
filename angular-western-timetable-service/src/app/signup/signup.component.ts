import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionalityComponent } from '../functionality/functionality.component'
import { AccountService } from '../../app/account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  // How to create an instance:
  // const my_schedule = {"schedule_name_attribute": hero, 
  // "list_of_pairs": course_list_attribute};
  messages: string[] = [];

  is_verified = false;

  constructor(private heroService: AccountService) { }

  ngOnInit(): void {
  }

  signup(username: String, email: String, password: String): any{
    username = username.trim();
    username = username.replace(/<[^>]+>/g, '');
    email = email.trim();
    email = email.replace(/<[^>]+>/g, '');
    password = password.trim();
    password = password.replace(/<[^>]+>/g, '');

    if (!email) { return; }
    if (!password) { return; }

    this.heroService.createAcount(username, email, password)
      .subscribe(hero=> {
        this.messages.push(hero.toString());
      });
  }

  isVerified(){
        window.open('./verify.html', '_blank');
        this.is_verified = true;
  }
}
