import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
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
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  onLogin(){
    const loginData = {
      email : this.loginForm.value.email,
      password: this.loginForm.value.password,
      userType: 'Intern'
    };
    console.log(loginData);

    this.authService.login(loginData)
      .subscribe({
        next: (response : any) => {
          localStorage.setItem("token", response.token);
          console.log('Login Success');
          console.log(response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.log('Login Failed');
          console.error(error);
        }
      });
  }
}
