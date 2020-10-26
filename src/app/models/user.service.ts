import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8081/api/v1/auth';

  constructor(private http: HttpClient) { }

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  updateUser(userId: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update-user/${userId}`, value);
  }

}
