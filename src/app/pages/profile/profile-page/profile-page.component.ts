import {Component} from '@angular/core';
import {McPage} from "../../../classes/mc-page";
import {HomeNavComponent} from "../../home/components/home-nav/home-nav.component";
import {FooterComponent} from "../../../shared/components/footer/footer.component";
import {ProfileBannerComponent} from "../components/profile-banner/profile-banner.component";

@Component({
  selector: 'mc-profile-page',
  standalone: true,
  imports: [
    HomeNavComponent,
    FooterComponent,
    ProfileBannerComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent extends McPage {
  constructor() {
    super();
    this.setTitle("Profile")
  }

}
