import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from 'src/app/authentication/service/user.service';



interface User {
  id: number | null;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number | null;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {



  users: User[] = [{ id: null, firstName: "loading...", lastName: "loading...", email: "loading...", phoneNumber: null }]
  


  request = {
    page: 0,
    size: 10, 
    criteria: "firstName",
    direction: "asc",
    searchTerm: "",
  }
  


  constructor (private service: UserService, private router: Router) {}

  ngOnInit(): void {
    this.service.getLoggedInUser().subscribe(user => {
      console.log("this is the user inside the ngOnInit")
      console.log(user)
      if (!user) {
        this.router.navigate(['/signin'])
        return
      }
      this.searchAllUsers()
    }) 
    
  }


  searchAllUsers() {
    this.service.searchAllUsers(this.request).subscribe({
      next: (payload: {
        content: User[], totalPage: number, totalElements: number, pageNumber: number }) => {
        console.log(payload)
        this.users = payload.content
      },
      error: error => {
        console.log(error)
      }
    });
  }



  handleClickSort(criteria: string, direction: string) {
    this.request.criteria = criteria
    this.request.direction = direction
    this.request.page = 0
    this.request.searchTerm= ""
    this.searchAllUsers()
  }
  navigateToAddUser() {
    
    this.router.navigate(['/admin/auth/add']);
  }


}
