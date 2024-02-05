import { Component } from '@angular/core';
import { MCPage } from '../../../classes/mc-page';
import { HomeNavComponent } from '../../home/components/home-nav/home-nav.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ProfileBannerComponent } from '../components/profile-banner/profile-banner.component';

@Component({
  selector: 'mc-profile-page',
  standalone: true,
  imports: [HomeNavComponent, FooterComponent, ProfileBannerComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent extends MCPage {
  userName: string = '';

  constructor() {
    super();
    this.setTitle('Profile');
  }

  override ngOnInit() {
    super.ngOnInit();
    this.fetchRouteParameters();
    this.fetchProfile(this.userName.split('/')[1]);
  }

  fetchProfile(username: string) {
    console.log(username);
  }

  fetchRouteParameters() {
    this.route.params.subscribe({
      next: (params) => {
        this.userName = params['userName'];
      },
    });
  }
}
