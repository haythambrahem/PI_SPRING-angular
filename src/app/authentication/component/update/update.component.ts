import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateService } from '../../service/update.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  user: any;

  constructor(private updateService: UpdateService, private router: Router) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.updateService.getUserProfile().subscribe(
      (data: any) => {
        this.user = data;
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
  updateProfile() {
    console.log("this is the user",this.user)

    this.updateService.updateUserProfile(this.user).subscribe(
      (data: any) => {
        console.log('Profile updated successfully:', data);
        this.router.navigate(['/profile']);
        this.getUserProfile(); // Redirect to the profile page after updating
      },
      (error: any) => {
        console.error('Error updating user profile:', error);
      }
    );
  }

}
