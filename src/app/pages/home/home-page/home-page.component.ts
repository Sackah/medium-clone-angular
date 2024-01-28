import {Component, inject} from '@angular/core';
import {TokenService} from "../../../shared/services/token.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../../shared/services/current-user.service";

@Component({
  selector: 'mc-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  tokenService = inject(TokenService);
  currentUserService = inject(CurrentUserService);
  router = inject(Router);
  handleLogout(){
    this.currentUserService.clearCurrentUser();
    this.tokenService.clear();
    this.router.navigateByUrl('/login').then();
  }
}
