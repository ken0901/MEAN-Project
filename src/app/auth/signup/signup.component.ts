import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

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
export class SignupComponent implements OnInit, OnDestroy {
 isLoading = false;
 private authauthStatusSub: Subscription;

 constructor(private authService: AuthService) {}

 ngOnInit(): void {
  this.authauthStatusSub =  this.authService.getAuthStatusListener().subscribe(
    authStatus => {
      this.isLoading = false;
    }
  );
 }

 onSignup(form: NgForm) {
  if(form.invalid) {
    return;
  }
  this.isLoading = true;
  this.authService.createUser(form.value.email, form.value.password);
 }

 ngOnDestroy(): void {
  this.authauthStatusSub.unsubscribe();    
 }
}
