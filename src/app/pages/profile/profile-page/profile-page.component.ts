import {Component, inject} from '@angular/core';
import {MCPage} from '../../../classes/mc-page';
import {HomeNavComponent} from '../../home/components/home-nav/home-nav.component';
import {FooterComponent} from '../../../shared/components/footer/footer.component';
import {ProfileBannerComponent} from '../components/profile-banner/profile-banner.component';
import {ProfileService} from "../services/profile.service";
import {Profile} from "../../../shared/types/main.types";
import {completeSignal, errorSignal, newSignal, pendSignal} from "../../../utils/signal-factory";

@Component({
  selector: 'mc-profile-page',
  standalone: true,
  imports: [HomeNavComponent, FooterComponent, ProfileBannerComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent extends MCPage {
  userName: string = '';
  profileService = inject(ProfileService);
  profileSignal = newSignal<{ profile: Profile }>()
  currentProfile: Profile | undefined = undefined;

  constructor() {
    super();
    this.fetchRouteParameters();
  }
  
  override ngOnInit() {
    super.ngOnInit();
    this.setTitle('Profile');
    this.fetchProfile(this.userName);
  }

  fetchProfile(username: string) {
    pendSignal(this.profileSignal);
    const sub = this.profileService.get(username).subscribe({
      next: (profile) => {
        this.currentProfile = profile.profile;
        completeSignal(this.profileSignal, profile);
      },
      error: (err) => {
        errorSignal(this.profileSignal, err);
      }
    })
    this.subscriptions.push(sub);
  }

  fetchRouteParameters() {
    this.route.params.subscribe({
      next: (params) => {
        this.userName = params['userName'];
      },
    });
  }
}
