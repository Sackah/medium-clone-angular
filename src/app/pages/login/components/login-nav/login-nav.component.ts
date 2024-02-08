import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'mc-login-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './login-nav.component.html',
  styleUrls: ['../../../../shared/styles/nav.styles.scss']
})
export class LoginNavComponent {

}
