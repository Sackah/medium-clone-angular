import {Component, inject, Input} from '@angular/core';
import {Router} from "@angular/router";
import {Profile} from "../../../../shared/types/main.types";
import {User} from "../../../../shared/types/auth.types";
import {McSpinnerComponent} from "../../../../shared/components/loaders/mc-spinner.component";

@Component({
  selector: 'mc-profile-banner',
  standalone: true,
  imports: [
    McSpinnerComponent
  ],
  templateUrl: './profile-banner.component.html',
  styleUrl: './profile-banner.component.scss'
})
export class ProfileBannerComponent {
  @Input() user!: User;
  @Input() userProfile!: Profile;
  @Input() pending = false;
  router = inject(Router);

  async navigate() {
    await this.router.navigateByUrl('/settings');
  }
}
