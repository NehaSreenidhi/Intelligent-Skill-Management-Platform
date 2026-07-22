import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MentorService } from '../../services/mentor.service';

@Component({
  selector: 'app-search-interns',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search-interns.component.html',
  styleUrl: './search-interns.component.css'
})
export class SearchInternsComponent {
  query = '';
  searched = false;
  loading = false;
  results: any[] = [];

  constructor(
    private router: Router,
    private mentorService: MentorService
  ){}

  searchInterns() {
    if (!this.query.trim()) {
      return;
    }

    this.loading = true;

    this.mentorService.searchInterns(this.query)
      .subscribe(
        (response: any[]) => {
          console.log(response);
          this.results = response;
          this.searched = true;
          this.loading = false;
        },
        (error) => {
          console.error(error);
          this.loading = false;
        }
      );
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
