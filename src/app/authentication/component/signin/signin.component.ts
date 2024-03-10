import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import {RedirectorService} from '../../service/redirector.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  email: string = '';
  password: string = '';

  constructor(private service: UserService, private router: Router, private redirect: RedirectorService) {}

  signin() {
    const bodyData = {
      email: this.email,
      password: this.password,
    };
  
    this.service.loginUser(bodyData).subscribe(
      (user: any) => {
        // Handle successful login
        this.redirect.redirectUser(user)
      },
      (error) => {
        // Handle errors here
        console.log("error happened while logging in")
        console.log(error)
      }
    );
  }

}
