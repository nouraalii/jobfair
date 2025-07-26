import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { IUser } from '../../core/interface/iuser.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private readonly _AuthService = inject(AuthService)

  user: IUser = {
    username: '',
    email: '',
    password: ''
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router) {}

onSubmit() {
  this.successMessage = null;
  this.errorMessage = null;

  this._AuthService.register(this.user).subscribe({
    next: () => {
      this.successMessage = ' Account created successfully!';
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500); // small delay to show the message
    },
    error: (err) => {
      console.error('Signup error:', err);
      this.errorMessage = ' Failed to register. Please try again.';
    }
  });
}

}
