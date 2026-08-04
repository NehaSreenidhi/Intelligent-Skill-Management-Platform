import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl = 'http://localhost:8080/activity';

  constructor(private http: HttpClient) {}

  getActivity(email: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/${email}`);
  }

}