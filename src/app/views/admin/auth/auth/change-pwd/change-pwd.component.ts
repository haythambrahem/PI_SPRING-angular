import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePWDComponent {

  currentPassword: string="";
  newPassword: string="";
  confirmPassword: string="";

  constructor() { }

  changePassword(form: NgForm) {
    // Implement logic to change password
    console.log('Current Password:', this.currentPassword);
    console.log('New Password:', this.newPassword);
    console.log('Confirm Password:', this.confirmPassword);

    // Clear form fields after submission
    form.resetForm();
  }
}
