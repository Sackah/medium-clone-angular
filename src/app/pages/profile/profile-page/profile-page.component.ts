import {Component} from '@angular/core';
import {McPage} from "../../../classes/mc-page";
import {HomeNavComponent} from "../../home/components/home-nav/home-nav.component";

@Component({
  selector: 'mc-profile-page',
  standalone: true,
  imports: [
    HomeNavComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent extends McPage {

}
