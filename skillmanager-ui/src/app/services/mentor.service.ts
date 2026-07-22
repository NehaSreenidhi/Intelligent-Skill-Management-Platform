import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  private apiUrl = 'http://localhost:8080/mentor';

  constructor(private http: HttpClient) {}

  getAllInterns(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/interns`
    );
  }

  getInternProfile(email:string)
  {
    return this.http.get(
      `${this.apiUrl}/profile/${email}`
    );
  }
  
  searchInterns(query: string): Observable<any[]> {
    return this.http.post<any[]>(
      `${this.apiUrl}/search-ai`,
      {
        query: query
      }
    );
  }
}