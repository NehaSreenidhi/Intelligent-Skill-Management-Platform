import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    userType: new FormControl('Intern')
  });

  onLogin(){
    const loginData = {
      email : this.loginForm.value.email,
      password: this.loginForm.value.password,
      userType: this.loginForm.value.userType
    };
    console.log(loginData);

    this.authService.login(loginData)
      .subscribe({
        next: (response : any) => {
          localStorage.setItem("token", response.token);
          localStorage.setItem(
            "userType",
            loginData.userType || "Intern"
          );
          console.log('Login Success');
          console.log(response);
          if(loginData.userType === 'Mentor')
          {
              this.router.navigate(['/mentor-dashboard']);
          }
          else{
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.log('Login Failed');
          console.error(error);
        }
      });
  }
}
