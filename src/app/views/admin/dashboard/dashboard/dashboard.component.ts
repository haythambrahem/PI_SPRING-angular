import { Component } from '@angular/core';
import { UserService } from 'src/app/authentication/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  users: any[] = [];

  constructor( private service: UserService) { }
 
      
}
