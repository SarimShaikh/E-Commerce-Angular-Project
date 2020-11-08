import { Privileges } from './privileges';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';



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

    getPermissionsAll(): Observable<any>{
    return this.http.get(`${this.baseUrl}/user/privileges`);
  }
  getPermissionsByRoleName(roleName: string): Observable<any>{
  
    const params = new HttpParams().append('roleName', roleName);

    return this.http.get(`${this.baseUrl}/user/role-privileges`, { params });
  }

  assignPermissionsByRoleName(privileges: Privileges): Observable<string>{
    
    console.log(privileges);
    return this.http.post(`${this.baseUrl}/assign/privileges`, privileges, {responseType: 'text'});

  }

}
