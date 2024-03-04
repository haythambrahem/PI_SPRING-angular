import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:8089/user'; // Mettez votre URL d'API ici
  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient) { }

  // Récupérer les données de profil de l'utilisateur
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
  
    // Check if token exists
    if (!token) {
     
      console.error('Token not found in local storage');
      return throwError('Token not found');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
  console.log("token",token)
    // Make HTTP request with headers
    return this.http.get<any>(`${this.baseUrl}/getCurrent`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Gestion des erreurs HTTP
  private handleError(error: any) {
    console.error('An error occurred:', error); // Log error in the console
    return throwError(error); // Throw an error to the caller
  }

  updateUser(userData: any): Observable<any> {
    const userId = this.getLoggedInUserId();
    if (userId) {
      return this.http.put(`${this.baseUrl}/update/${userId}`, userData);
    } else {
      return throwError('Update failed: User not logged in');
    }
  }

  getLoggedInUserId(): number {
    const loggedInUser = this.loggedInUserSubject.value;
    return loggedInUser ? loggedInUser.id : null;
  }




}
