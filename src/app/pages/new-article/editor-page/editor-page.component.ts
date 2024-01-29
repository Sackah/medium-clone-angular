import {Component} from '@angular/core';
import {HomeNavComponent} from "../../home/components/home-nav/home-nav.component";
import {FooterComponent} from "../../../shared/components/footer/footer.component";

@Component({
  selector: 'mc-editor-page',
  standalone: true,
  imports: [
    HomeNavComponent,
    FooterComponent
  ],
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.scss'
})
export class EditorPageComponent {

}
