import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private service: UserService, private router: Router) {}

  signin() {
    let bodyData = {
      email: this.email,
      password: this.password,
    };
  
    this.service.loginUser(bodyData).subscribe(
      (user: any) => {
        // Handle successful login
        console.log('Logged-in User Details:', user);
        this.service.setLoggedInUser(user);
  
        // Redirect to preferences page
       this.router.navigateByUrl('/admin');
      },
      (error) => {
        // Handle errors here
        if (error.status === 404) {
          alert("Email does not exist");
        } else {
          alert("Incorrect Email and Password not match");
        }
      }
    );
  }

}
