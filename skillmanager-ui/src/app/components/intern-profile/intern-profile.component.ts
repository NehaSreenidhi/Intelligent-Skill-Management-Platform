import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MentorService } from '../../services/mentor.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../interfaces/activity';

interface DayCell {
  dateStr: string;
  count: number;
  level: number;   // 0-3
  isEmpty: boolean; // outside current year
  isSpacer?: boolean;
}

interface MonthLabel {
  name: string;
  colStart: number;
}

@Component({
  selector: 'app-intern-profile',
  imports: [CommonModule],
  templateUrl: './intern-profile.component.html',
  styleUrl: './intern-profile.component.css'
})
export class InternProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private mentorService: MentorService,
    private activityService: ActivityService
  ) {}

  email: string = '';
  intern: any;
  activities: Activity[] = [];
  currentYear = new Date().getFullYear();

  // Heatmap data — rendered via *ngFor, not manual DOM
  dayCells: DayCell[] = [];
  monthLabels: MonthLabel[] = [];
  weekdayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  gridColumnTemplate: string = '';

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email') || '';

    this.loadActivity(this.email);

    this.mentorService.getInternProfile(this.email).subscribe({
      next: (data) => {
        this.intern = data;
        setTimeout(() => this.loadChart(), 100);
      },
      error: (err) => console.log(err)
    });
  }

  // ============================
  // ACTIVITY
  // ============================

  loadActivity(email: string): void {
    this.activityService.getActivity(email).subscribe({
      next: (data) => {
        this.activities = data;
        this.buildHeatmapData();
      },
      error: (err) => console.error('Error loading activity:', err)
    });
  }



    private buildHeatmapData(): void {
    const activityMap = new Map<string, number>();
    this.activities.forEach(a => activityMap.set(a.date, a.count));

    const currentYear = this.currentYear;
    const firstDayOfYear = new Date(currentYear, 0, 1);
    const startOffset = firstDayOfYear.getDay();

    // Build 53 week-columns
    const weeks: DayCell[][] = [];
    for (let week = 0; week < 53; week++) {
        const col: DayCell[] = [];
        for (let day = 0; day < 7; day++) {
        const date = new Date(currentYear, 0, 1);
        date.setDate(1 + week * 7 + day - startOffset);

        if (date.getFullYear() !== currentYear) {
            col.push({ dateStr: '', count: 0, level: 0, isEmpty: true });
            continue;
        }

        const dateStr = `${currentYear}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const count = activityMap.get(dateStr) || 0;

        let level = 0;
        if (count === 1) level = 1;
        else if (count === 2) level = 2;
        else if (count >= 3) level = 3;

        col.push({ dateStr, count, level, isEmpty: false });
        }
        weeks.push(col);
    }

    // Which week index each month starts on
    const monthStartWeek: number[] = [];
    for (let month = 0; month < 12; month++) {
        const firstDate = new Date(currentYear, month, 1);
        const dayOfYear = Math.floor(
        (firstDate.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24)
        );
        monthStartWeek.push(Math.floor((dayOfYear + startOffset) / 7));
    }

    // Assemble final columns, inserting a slim spacer column at each month boundary
    const spacerCol = (): DayCell[] =>
        Array.from({ length: 7 }, () => ({ dateStr: '', count: 0, level: 0, isEmpty: true, isSpacer: true }));

    const finalCells: DayCell[] = [];
    const colWidths: number[] = [];
    const monthLabels: MonthLabel[] = [];
    let colIndex = 0;

    weeks.forEach((weekCol, weekIndex) => {
        const monthAt = monthStartWeek.indexOf(weekIndex);

        if (monthAt !== -1 && weekIndex !== 0) {
        finalCells.push(...spacerCol());
        colWidths.push(4);
        colIndex++;
        }
        if (monthAt !== -1) {
        monthLabels.push({
            name: new Date(currentYear, monthAt, 1).toLocaleString('default', { month: 'short' }),
            colStart: colIndex + 1
        });
        }

        finalCells.push(...weekCol);
        colWidths.push(15);
        colIndex++;
    });

    this.dayCells = finalCells;
    this.monthLabels = monthLabels;
    this.gridColumnTemplate = colWidths.map(w => `${w}px`).join(' ');
    }

  // ============================
  // SKILLS CHART
  // ============================

  loadChart(): void {
    const labels = this.intern.skills.map((skill: any) => skill.skillName);

    const values = this.intern.skills.map((skill: any) => {
      switch (skill.skillLevel) {
        case 'BEGINNER': return 1;
        case 'INTERMEDIATE': return 2;
        case 'ADVANCED': return 3;
        default: return 0;
      }
    });

    new Chart('skillsChart', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{ data: values, hoverOffset: 15 }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
}