import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InternProfileService } from '../../services/intern-profile.service';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent {

  profile = {
    email: '',
    phone:'',
    linkedin:'',
    github:'',
    leetcode:''
  };

  successMessage = '';

  constructor(
    private internService:InternProfileService
  ){}

  saveProfile()
  {
    this.profile.email =
      localStorage.getItem('email') || '';
      
    this.internService.updateProfile(
      this.profile
    ).subscribe({

      next:(res)=>{
        this.successMessage =
        'Profile updated successfully';
      },

      error:(err)=>{
        console.log(err);
      }

    });
  }

}