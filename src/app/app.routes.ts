import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home/home-page/home-page.component";
import {LoginPageComponent} from "./pages/auth/login-page/login-page.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {SignupPageComponent} from "./pages/auth/signup-page/signup-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: SignupPageComponent
  }
];
