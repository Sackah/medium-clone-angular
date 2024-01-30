import {Component, inject, Input} from '@angular/core';
import {User} from "../../../../shared/types/auth.types";
import {Router} from "@angular/router";

@Component({
  selector: 'mc-profile-banner',
  standalone: true,
  imports: [],
  templateUrl: './profile-banner.component.html',
  styleUrl: './profile-banner.component.scss'
})
export class ProfileBannerComponent {
  @Input() user!: User;
  router = inject(Router);

  async navigate() {
    await this.router.navigateByUrl('/settings');
  }
}
