import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MentorService } from '../../services/mentor.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

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
            setTimeout(() => {
                this.loadChart();
            }, 100);
            },

            error: (err) => {
            console.log(err);
            }
        });
    }

    loadChart(){
        const labels =
            this.intern.skills.map(
            (skill:any) => skill.skillName
            );
        const values =
            this.intern.skills.map(
            (skill:any) => {
                switch(skill.skillLevel){
                case 'BEGINNER':
                    return 1;
                case 'INTERMEDIATE':
                    return 2;
                case 'ADVANCED':
                    return 3;
                default:
                    return 0;
                }
            });

        new Chart('skillsChart', {

        type:'doughnut',

        data:{

        labels:labels,

        datasets:[{

        data:values,

        hoverOffset:15

        }]

        },

        options:{

        responsive:true,

        maintainAspectRatio:false,

        plugins:{

        legend:{

        position:'bottom'

        }

        }

        }

        });
    }
}
