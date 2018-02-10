import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginData = {};

  constructor(private authService: AuthService) {}

  post() {
    this.authService.loginUser(this.loginData);
  }
}
