import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InternProfileService {
  private apiUrl = 'http://localhost:8080/intern';
  constructor(private http: HttpClient) { }

  updateProfile(data:any):Observable<any>{
    return this.http.put(
      `${this.apiUrl}/profile-settings`,
      data
    );
  }
}
