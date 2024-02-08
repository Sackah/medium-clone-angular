import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendErrors } from '../../types/auth.types';
import { BackendErrorsComponent } from '../../components/backend-errors/backend-errors.component';

@Component({
  selector: 'mc-error-page',
  standalone: true,
  imports: [BackendErrorsComponent],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
})
export class ErrorPageComponent {
  @Input() error!: BackendErrors;
  @Output() refetch = new EventEmitter<boolean>();
}
