import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl  = "http://localhost:8089"; 
  
  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient) { }

  /* getCurrent(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl +"user/getCurrent" }`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl +"user/all" }`);
  }

  editCurrent(id : String, value: any): Observable<Object>{
    return this.http.put<Object>(`${this.apiUrl +"user/editCurrent"}/${id}`,value);
  }

  editPassword(email : String, value: any): Observable<Object>{
    return this.http.put<Object>(`${this.apiUrl +"user/editPassword"}/${email}`,value);
  }

  signup(User?: User): Observable<Object>{
    return this.http.post<Object>(`${this.apiUrl +"auth/signup" }`,User)
  }

  signin(User?: User): Observable<Object>{
    return this.http.post<Object>(`${this.apiUrl +"auth/signin" }`,User)
  } */

  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth`, loginData).pipe(
      tap(user => {
        this.loggedInUserSubject.next(user);
        console.log("csds", user);
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
 
  /////////////////////////////

  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('token');
  
    // Check if token exists
    if (!token) {
     
      console.error('Token not found in local storage');
      return throwError('Token not found');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

      // Make HTTP request with headers
  return this.http.get<any>(`${this.apiUrl}/user/all`, { headers }).pipe(
    catchError(this.handleError)
  );
  }
  private handleError(error: any) {
    console.error('An error occurred:', error); // Log error in the console
    return throwError(error); // Throw an error to the caller
  }

}
