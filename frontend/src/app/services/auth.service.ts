import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  messages = [];
  path = environment.path + '/auth';

  TOKEN_KEY = 'token';
  USER_NAME_KEY = 'user_name';

  constructor( private http: HttpClient ) {}

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get username() {
    return localStorage.getItem(this.USER_NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_NAME_KEY);
  }

  registerUser(registerData) {
    this.http.post<any>(this.path + '/register', registerData).subscribe(res => {
      this.saveToken(res.token);
    });
  }

  loginUser(loginData) {
    this.http.post<any>(this.path + '/login', loginData).subscribe(res => {
      this.saveToken(res.token);
      this.saveUsername(res.username);
    });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  saveUsername(username) {
    localStorage.setItem(this.USER_NAME_KEY, username);
  }
}
