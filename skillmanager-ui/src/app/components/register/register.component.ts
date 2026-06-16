import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerData = {
      name : '',
      email : '',
      password : ''
    };

    constructor(
      private authService : AuthService,
      private router : Router
    ){}
    onRegister(){
      this.authService.register(this.registerData)
        .subscribe({
          next : (response : any) => {
            console.log(response);
            alert("Registration Successful");
            this.router.navigate(['/login']);
          },

          error: (err : any) => {
            console.log(err);
            alert("Registration Failed");
          }
        });
    }
}
