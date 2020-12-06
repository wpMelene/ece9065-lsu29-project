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
  currently_login_as: any = {
    username_attribute: "",
    email_attribute:"",
    password_attribute:"",
    auth_attribute: false,              // is the email verified?
    activation_attribute: true,         // is the account deactivated by the admin?
    admin_attribute: false,             // is the account an admin or granted as an admin?
    course_created: 0
  };

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
        if(typeof hero == "string"){
          this.messages.push(hero)}else{
            this.messages.push("Login Sucessfully");
            this.currently_login_as.username_attribute = hero.username_attribute;
            this.currently_login_as.email_attribute = hero.email_attribute;
            this.currently_login_as.password_attribute = hero.password_attribute;
            this.currently_login_as.auth_attribute = hero.auth_attribute;                     // is the email verified?
            this.currently_login_as.activation_attribute = hero.activation_attribute;         // is the account deactivated by the admin?
            this.currently_login_as.admin_attribute = hero.admin_attribute;                   // is the account an admin or granted as an admin?
            this.currently_login_as.course_created = hero.course_created;
          }
          console.log(this.currently_login_as);
      });

  }

  goto(): void{
    window.open('/signup');
  }
}
