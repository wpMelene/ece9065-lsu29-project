import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionalityComponent } from '../functionality/functionality.component'
import { AccountService } from '../../app/account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-initiallogin',
  templateUrl: './initial-login.component.html',
  styleUrls: ['./initial-login.component.css']
})

export class InitialLoginComponent implements OnInit {

  // How to create an instance:
  // const my_schedule = {"schedule_name_attribute": hero, 
  // "list_of_pairs": course_list_attribute};
  messages: string[] = [];

  constructor(private router:Router,
              private heroService: AccountService,
              private functionality:FunctionalityComponent) { }

  ngOnInit(): void {
  }

  signin(email: String, password: String): any{
    email = email.trim();
    email = email.replace(/<[^>]+>/g, '');
    password = password.trim();
    password = password.replace(/<[^>]+>/g, '');

    if (!email) { return; }
    if (!password) { return; }

    this.heroService.loginAcount(email, password)
      .subscribe(hero=> {
        this.messages.push(hero.toString());
      });

  }

  goto(){
    this.router.navigate(['/signup']);
  }
}
