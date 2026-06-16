import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MentorService } from '../../services/mentor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intern-profile',
  imports: [CommonModule],
  templateUrl: './intern-profile.component.html',
  styleUrl: './intern-profile.component.css'
})
export class InternProfileComponent {

    constructor(
        private route: ActivatedRoute,
        private mentorService: MentorService
    ){}

    email:string='';
    intern: any;

    ngOnInit(): void {

        this.email =
        this.route.snapshot.paramMap.get('email') || '';

        console.log(this.email);

        this.mentorService
        .getInternProfile(this.email)
        .subscribe({
            next: (data) => {

            console.log(data);

            this.intern = data;
            },

            error: (err) => {
            console.log(err);
            }
        });
    }
}
