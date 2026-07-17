import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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
  results: any[] = [];

  constructor(
    private router: Router
  ){}

  searchInterns(){
    this.searched = true;
    console.log("Searched query : " , this.query);

    // Next Step:
    // Call Spring Boot
    // this.mentorService.searchInterns(this.query)
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
