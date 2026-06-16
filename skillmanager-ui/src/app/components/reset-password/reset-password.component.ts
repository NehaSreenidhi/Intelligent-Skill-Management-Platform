import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  resetForm = new FormGroup({

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    userType: new FormControl('Intern'),

    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),

    confirmPassword: new FormControl('', [
      Validators.required
    ])
  });

  resetPassword(){

    if(
      this.resetForm.value.newPassword !==
      this.resetForm.value.confirmPassword
    ){
      alert("Passwords do not match");
      return;
    }

    const data = {
      email: this.resetForm.value.email,
      userType: this.resetForm.value.userType,
      newPassword: this.resetForm.value.newPassword
    };

    console.log(data);

    this.authService
      .resetPassword(data)
      .subscribe({

        next:(response)=>{

          console.log(response);

          alert("Password Reset Successful");

          this.router.navigate(['/login']);
        },

        error:(error)=>{

          console.log(error);

          alert("Password Reset Failed");
        }
      });
  }
}