import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RedirectorService {

  constructor(private userService: UserService, private router: Router) { }


  redirectUser(user: any): void {
    this.router.navigate(["admin/dashboard"]) 
  }





}
