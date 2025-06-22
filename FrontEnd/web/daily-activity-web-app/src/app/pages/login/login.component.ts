import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  error = '';
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (!email || !password) {
      this.error = 'Please enter both email and password';
      return;
    }

    this.authService
      .login(email, password)
      .then(() => this.router.navigate(['/log-activity']))
      .catch((err) => (this.error = err.message));
  }
}
