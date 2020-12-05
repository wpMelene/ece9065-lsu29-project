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

  need_verified = false;
  temp_need_verification: string[] = [];

  constructor(private heroService: AccountService) { }

  ngOnInit(): void {
  }

  signup(username: String, email: String, password: String): any{
    username = username.trim();
    username = username.replace(/<[^>]+>/g, '');
    email = email.trim();
    email = email.replace(/<[^>]+>/g, '');
    email = email.toString();
    password = password.trim();
    password = password.replace(/<[^>]+>/g, '');

    if (!email) { this.messages.push("The email address cannot be null.");
                  return; }
    if (!password) { this.messages.push("The password cannot be null.");
                     return; }
    if (!username) { this.messages.push("The username cannot be null.");
                     return; }

    var re = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.toString());
    if(!re){
      this.messages.push("The email address is not in an appropriate format.");
      return;
    }

    if(username.length<6 || password.length<6){
      this.messages.push("The length of input is not allowed. Username and password should be longer than 6 characters.");
      return;
    }

    this.heroService.createAcount(username, email, password)
      .subscribe(hero=> {
        // this.messages.push(hero.toString());
        // if(hero.toString().length <=18){
        //   this.need_verified = true;
        if(typeof hero == "string"){
          this.messages.push(hero)}else{
            this.messages.push("Account Created");
            this.temp_need_verification.push(hero.email_attribute);
            this.need_verified = true;
        }
      });
  }

  isVerified(email: string){
        var re = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.toString());
        if(!re){
          this.messages.push("The email address is not in an appropriate format.");
          return;
        }

        var i: number;
        var found = false;
        for(i=0; i < this.temp_need_verification.length; i++){
          if(this.temp_need_verification[i] == email){
            found = true;
          }
        }
        if(found){
        window.open('./verify.html', '_blank');
        this.heroService.updateAccountAccess(email, true, "null", "null").subscribe(hero => {
          this.messages.push(hero.toString());
        });
      }else{
        this.messages.push("Verification not successful");
      }
  }
}
