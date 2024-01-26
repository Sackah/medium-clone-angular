import {Component, Input} from '@angular/core';
import {BackendErrors} from "../../../../shared/types/auth.types";

@Component({
  selector: 'mc-backend-errors',
  standalone: true,
  imports: [],
  templateUrl: './backend-errors.component.html',
  styleUrl: './backend-errors.component.scss'
})
export class BackendErrorsComponent {
  @Input() errors: BackendErrors = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    for (let err in this.errors){
      const messages = this.errors[err];
      if(err !== "type"){
        this.errorMessages.push(`${err} ${messages}`);
      }
    }
  }
}
