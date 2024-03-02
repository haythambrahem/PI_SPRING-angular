import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private baseUrl = 'http://localhost:8089';

  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http:HttpClient) { }

  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth`, loginData)
      .pipe(
        tap(user => this.loggedInUserSubject.next(user))
      );
  }
  setLoggedInUser(user: any): void {
    this.loggedInUserSubject.next(user);
  }

  getLoggedInUser(): Observable<any> {
    return this.loggedInUserSubject.asObservable();
  }
  getLoggedInUserId(): number {
    const loggedInUser = this.loggedInUserSubject.value;
    return loggedInUser ? loggedInUser.id : null;
  }
}
