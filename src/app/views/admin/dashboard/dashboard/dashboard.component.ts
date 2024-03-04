import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/authentication/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: any[] = [];

  constructor( private service: UserService) { }
  ngOnInit(): void {
    this.service.getAllUsers().subscribe((users) => {
      console.log("users",users)
      this.users = users;
    });

      }
      
   
  search() {

      
  }
}
