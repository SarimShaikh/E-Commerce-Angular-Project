import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from '../models/jwt-response';
import { AuthLoginInfo } from '../models/login-info';
import { SignUpInfo } from '../models/signup-info';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private loginUrl = 'http://localhost:8081/api/v1/auth/signin';
  private signupUrl = 'http://localhost:8081/api/v1/auth/signup';
 
  constructor(private http: HttpClient) {
  }
 
  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    console.log("----->",credentials);
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
 
  signUp(info: SignUpInfo): Observable<string> {
    console.log("------>",info);
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

 
}