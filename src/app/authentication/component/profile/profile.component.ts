import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private http: HttpClient, private service: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.service.getUserProfile().subscribe (data => {
      this.user = data
      console.log("thes is the response",data)
    } ); 
  }

  
 
  

  logout() {
    // Add logout functionality here
    // For example, clearing local storage and redirecting to login page
    localStorage.removeItem("user");

    // localStorage.removeItem("isLoggedIn");
    // localStorage.removeItem("userName");
    this.router.navigate(["/"]);
  }
  goBack() {
    this.router.navigate(["/admin"]);
  }
  
  updateProfile(){

    this.service.updateUser(this.user).subscribe(
      updatedUser => {
        console.log('User updated successfully:', updatedUser);
        // You can perform additional actions if needed
      },
      error => {
        console.error('Error updating user:', error);
        // Handle the error as needed
      }
    );

  }
  navigateToUpdate() {
    
    this.router.navigate(['/update']);
  }
}