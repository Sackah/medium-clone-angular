import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'mc-login-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './login-nav.component.html',
  styleUrl: './login-nav.component.scss'
})
export class LoginNavComponent {

}
