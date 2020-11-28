import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initiallogin',
  templateUrl: './initial-login.component.html',
  styleUrls: ['./initial-login.component.css']
})
export class InitialLoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  signin(email: String, password: String){
    return;
  }

  goto(){
    this.router.navigate(['/signup']);
  }

}
