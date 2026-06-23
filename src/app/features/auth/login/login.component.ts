import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model: LoginRequest = {
    email: '',
    password: ''
  };

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.authService.login(this.model).subscribe({
    next: (response) => {

    console.log('LOGIN OK');
    console.log(response);

    this.authService.saveToken(response.token);

    this.router.navigate(['/sitios']);
},
      error: () => {
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    });
  }
}