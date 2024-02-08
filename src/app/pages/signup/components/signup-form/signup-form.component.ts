import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MCFormComponent } from '../../../../classes/mc-form';
import {
  BackendErrors,
  SignUpUserDetails,
} from '../../../../shared/types/auth.types';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BackendErrorsComponent } from '../../../../shared/components/backend-errors/backend-errors.component';
import { ButtonSpinnerComponent } from '../../../../shared/components/loaders/button-spinner.component';

@Component({
  selector: 'mc-signup-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    BackendErrorsComponent,
    ButtonSpinnerComponent,
  ],
  templateUrl: './signup-form.component.html',
  styleUrls: ['../../../../shared/styles/forms.styles.scss'],
})
export class SignupFormComponent extends MCFormComponent {
  @Input() errors: BackendErrors | null = null;
  @Input() isSubmitting: boolean = false;
  @Output() userDetails = new EventEmitter<SignUpUserDetails>();

  constructor() {
    super();
    this.setupForm();
  }

  setupForm() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      this.userDetails.emit({ user: this.form.value });
    }
  }
}
