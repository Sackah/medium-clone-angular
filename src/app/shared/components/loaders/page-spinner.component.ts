import {Component} from '@angular/core';
import {McSpinnerComponent} from "./mc-spinner.component";

@Component({
  selector: 'mc-page-spinner',
  standalone: true,
  imports: [
    McSpinnerComponent
  ],
  template: `
    <section>
      <mc-spinner></mc-spinner>
    </section>`,
  styles: `
  section{
    width: 100%;
    height: 100%;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    position: fixed;
  }
`
})
export class PageSpinnerComponent {

}
