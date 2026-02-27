import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = 'http://localhost:8081/api/admin'; 

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  addUser(user: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/add`, user, { responseType: 'text' });
  }

  updateUser(id: number, user: any): Observable<string> {
    return this.http.put(`${this.baseUrl}/approve/${id}`, user, { responseType: 'text' });
  }

  deleteUser(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
}