import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    MatButtonModule,  
    MatCardModule, 
    MatProgressSpinnerModule,
    MatInputModule,
    MatError
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
 isLoading = false;

 constructor(private authService: AuthService) {}

 onSignup(form: NgForm) {
  if(form.invalid) {
    return;
  }
  this.isLoading = true;
  this.authService.createUser(form.value.email, form.value.password);
 }
}
