import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorService } from '../../services/mentor.service';
import { Router, RouterModule, RouterLink } from '@angular/router';


@Component({
  selector: 'app-mentor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './mentor-dashboard.component.html',
  styleUrl: './mentor-dashboard.component.css'
})
export class MentorDashboardComponent implements OnInit {

  name = '';
  interns:any[] = [];

  constructor(
    private mentorService: MentorService, 
    private router: Router
  ){}

  ngOnInit(): void {
    this.name = localStorage.getItem('name') || 'Mentor';

    this.loadInterns();
  }

  loadInterns(){
    this.mentorService
      .getAllInterns()
      .subscribe({
        next:(response)=>{
          this.interns = response;
          console.log(this.interns);
        },

        error:(err)=>{
          console.log(err);
        }
      });
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    
    this.router.navigate(['/login']);
  }
}