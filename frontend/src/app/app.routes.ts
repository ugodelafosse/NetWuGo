import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const ROUTES: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent },
    { path: 'profile/:id', component: ProfileComponent }
  ];

