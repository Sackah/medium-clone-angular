import {Component} from '@angular/core';
import {LoginNavComponent} from "../../auth/components/login-nav/login-nav.component";
import {FeedComponent} from "../../feed/feed/feed.component";
import {HomeNavComponent} from "../components/home-nav/home-nav.component";

@Component({
  selector: 'mc-home-page',
  standalone: true,
  imports: [
    LoginNavComponent,
    FeedComponent,
    HomeNavComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
