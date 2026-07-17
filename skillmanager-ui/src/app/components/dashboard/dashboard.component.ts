import { Component, OnInit } from '@angular/core';
import { InternProfileService } from '../../services/intern-profile.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  skills:any[] = [];

  email:string = '';
  name:string = '';

  showAddModal = false;
  showModifyModal = false;

  constructor(
    private internService: InternProfileService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.email = localStorage.getItem('email') || '';

    this.loadProfile();
  }

  loadProfile(){
    this.internService
      .getProfile(this.email)
      .subscribe({
        next:(response:any)=>{

          this.name = response.name;
          this.skills = response.skills;
          console.log(this.skills);
        },
        error:(error)=>{
          console.error(error);
        }
      });
  }

  get advancedCount(): number {
    return this.skills.filter(
      s => s.skillLevel === 'ADVANCED'
    ).length;
  }

  get intermediateCount(): number {
    return this.skills.filter(
      s => s.skillLevel === 'INTERMEDIATE'
    ).length;
  }

  get beginnerCount(): number {
    return this.skills.filter(
      s => s.skillLevel === 'BEGINNER'
    ).length;
  }

  openAddSkillModal(){
    this.showAddModal = true;
  }

  closeAddSkillModal(){
    this.showAddModal = false;
  }

  openModifySkillModal(){
    this.showModifyModal = true;
  }

  closeModifySkillModal(){
    this.showModifyModal = false;
  }

  getSkillPercentage(level: string): number {
    switch(level){

      case 'BEGINNER':
        return 33;

      case 'INTERMEDIATE':
        return 66;

      case 'ADVANCED':
        return 100;

      default:
        return 0;
    }
  }

  getSkillColor(level: string): string {
    switch(level){

      case 'BEGINNER':
        return '#dc3545';   // red

      case 'INTERMEDIATE':
        return '#0dcaf0';   // blue

      case 'ADVANCED':
        return '#198754';   // green

      default:
        return '#6c757d';   // gray
    }
  }

  addSkillForm = new FormGroup({
    skillName: new FormControl('', Validators.required),

    skillLevel: new FormControl(
      'Beginner',
      Validators.required
    )
  });

  modifySkillForm = new FormGroup({
    existingSkill: new FormControl(
      '',
      Validators.required
    ),

    newSkillLevel: new FormControl(
      'Beginner',
      Validators.required
    )
  });

  addSkill(){
    const skillData = {
      email: this.email,
      skillName: this.addSkillForm.value.skillName,
      skillLevel: this.addSkillForm.value.skillLevel
    };

    console.log(skillData);
    this.internService
        .addSkill(skillData)
        .subscribe({
          next:(response)=>{
            alert("Skill Added Successfully");

            this.loadProfile();
            this.addSkillForm.reset();
            this.closeAddSkillModal();
          },

          error:(error)=>{
            console.error(error);
            alert("Failed to Add Skill");
          }
        });
  }

  modifySkill(){
    const skillData = {
      email: this.email,
      existingSkill:
        this.modifySkillForm.value.existingSkill,
      newSkillLevel:
        this.modifySkillForm.value.newSkillLevel
    };
    this.internService
        .updateSkill(skillData)
        .subscribe({

          next:(response)=>{
            alert("Skill Updated");
            this.loadProfile();
            this.closeModifySkillModal();
          },
          error:(error)=>{
            console.error(error);
            alert("Failed to Update Skill");
          }
        });
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
