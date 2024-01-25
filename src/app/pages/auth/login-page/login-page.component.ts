import { Component } from '@angular/core';
import {LoginNavComponent} from "../components/login-nav/login-nav.component";
import {LoginFormComponent} from "../components/login-form/login-form.component";

@Component({
  selector: 'mc-login-page',
  standalone: true,
  imports: [
    LoginNavComponent,
    LoginFormComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}
