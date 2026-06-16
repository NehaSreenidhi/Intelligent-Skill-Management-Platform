import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorService } from '../../services/mentor.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mentor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mentor-dashboard.component.html',
  styleUrl: './mentor-dashboard.component.css'
})
export class MentorDashboardComponent implements OnInit {

  interns:any[] = [];

  constructor(
    private mentorService: MentorService
  ){}

  ngOnInit(): void {

    this.mentorService.getAllInterns()
      .subscribe({
        next:(data)=>{

          console.log(data);

          this.interns = data;
        },

        error:(err)=>{
          console.log(err);
        }
      });

  }
}