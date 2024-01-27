import {Component, inject} from '@angular/core';
import {TokenService} from "../../../shared/services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'mc-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  tokenService = inject(TokenService);
  router = inject(Router);
  handleLogout(){
    this.tokenService.clear();
    this.router.navigateByUrl('/login').then();
  }
}
