import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';
  constructor(private http: HttpClient) { }

  login(loginData: any){
    console.log("Calling URL:", `${this.baseUrl}/login`);
    return this.http.post(
      `${this.baseUrl}/login`,
      loginData
    );
  }
}
