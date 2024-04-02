import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddUserRequest } from 'src/app/views/admin/auth/auth/add-employee/add-employee/add-employee.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl  = "http://localhost:8089"; 
  
  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient) { }


  loginUser(loginData: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth`, loginData).pipe(
      tap(user => {
        localStorage.setItem("user", JSON.stringify(user))

        this.setLoggedInUser(user);
        
      })
    );
  }
  
  setLoggedInUser(user: any): void {
    this.loggedInUserSubject.next(user);
  }

  getLoggedInUser(): Observable<any> {
    return this.loggedInUserSubject.asObservable();
  }

  registerUser(userData: any): Observable<any> {
    // Assurez-vous de passer les données utilisateur (userData) à la méthode post
    return this.http.post(`${this.apiUrl}/auth/signup`, userData);
  }

  getLoggedInUserId(): number {
    const loggedInUser = this.loggedInUserSubject.value;
    return loggedInUser ? loggedInUser.id : null;
  }


  private getUserToken(): string {
    /* this.loggedInUserSubject.asObservable().subscribe(u => {
      token = u.token
    }); */
    const user = localStorage.getItem("user")
    if (user) {
      return JSON.parse(user).token
    }

    throw Error("no token")
    
  }


  searchAllUsers(request: { page: number, size: number, criteria: string, direction: string, searchTerm: string }): Observable<any> {
    
    const token = this.getUserToken()

    return this.http.get(`${this.apiUrl}/users/`, {
      params: {
        ...request
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        
      }
    })
  
  }



  addEmployee(request: AddUserRequest): Observable<any> {

    const token = this.getUserToken();

    return this.http.post(`${this.apiUrl}/user/create`, request, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      }
    })
  }
 
  searchByKeyword(request : {Keyword: string}) : Observable<any> {
    const token = this.getUserToken();
    return this.http.post(`${this.apiUrl}/user/search`, request, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      }
    })
  }

  updatePwd(userData: { currentPassword: string, newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/editPassword`, userData)
      .pipe(
        catchError((error: any) => {
          return throwError('Error updating password');
        })
      );
  }

  getEmployeeRatio(): Observable<any> {
    const token = this.getUserToken()
    return this.http.get(`${this.apiUrl}/user/task-status`, {
      headers: {
        "Content-Type": 'application/json',
        "Authorization" : `Bearer ${token}`,
      }
    })
  } 

  // user/user-task-status
  getGeneraleEmployesData(): Observable<any> {
    const token = this.getUserToken()
    return this.http.get(`${this.apiUrl}/user/user-task-status`, {
      headers: {
        "Content-Type": 'application/json',
        "Authorization" : `Bearer ${token}`,
      }
    })
  } 
  
  ///
  getSpeceficEmployesData(): Observable<any> {
    const token = this.getUserToken()
    return this.http.get(`${this.apiUrl}/user/tasks-by-status`, {
      headers: {
        "Content-Type": 'application/json',
        "Authorization" : `Bearer ${token}`,
      }
    })
  }


}
