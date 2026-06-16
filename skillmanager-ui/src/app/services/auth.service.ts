import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  login(loginData: any){
    console.log("Calling URL:", `${this.baseUrl}/login`);
    return this.http.post(
      `${this.baseUrl}/auth/login`,
      loginData
    );
  }

  register(registerData: any){
    return this.http.post<any>(
      `${this.baseUrl}/intern/register`,
      registerData
    );
  }

  resetPassword(data:any){
    return this.http.post(
      'http://localhost:8080/auth/reset-password',
      data,
      {
        responseType: 'text'
      }
    );
  }
}
