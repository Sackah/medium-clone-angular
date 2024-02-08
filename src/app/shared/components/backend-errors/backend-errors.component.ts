import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BackendErrors } from '../../types/auth.types';

@Component({
  selector: 'mc-backend-errors',
  standalone: true,
  imports: [],
  templateUrl: './backend-errors.component.html',
  styleUrl: './backend-errors.component.scss',
})
export class BackendErrorsComponent implements OnChanges {
  @Input() errors: BackendErrors = {};

  errorMessages: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['errors']) {
      this.errorMessages = [];
      for (let err in this.errors) {
        const messages = this.errors[err];
        if (err !== 'type') {
          this.errorMessages.push(`${err} ${messages}`);
        }
      }
    }
  }
}
