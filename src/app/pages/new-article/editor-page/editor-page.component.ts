import {Component} from '@angular/core';
import {HomeNavComponent} from "../../home/components/home-nav/home-nav.component";

@Component({
  selector: 'mc-editor-page',
  standalone: true,
  imports: [
    HomeNavComponent
  ],
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.scss'
})
export class EditorPageComponent {

}
