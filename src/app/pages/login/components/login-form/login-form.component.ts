import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonSpinnerComponent} from '@shared/components/loaders/button-spinner.component';
import {MCFormComponent} from '@app/classes/mc-form';
import {
   FormControl,
   FormGroup,
   ReactiveFormsModule,
   Validators,
} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BackendErrors, LoginUserDetails} from '@shared/types/auth.types';
import {BackendErrorsComponent} from '../../../../shared/components/backend-errors/backend-errors.component';
import {RouterLink} from '@angular/router';

@Component({
   selector: 'mc-login-form',
   standalone: true,
   imports: [
      ButtonSpinnerComponent,
      ReactiveFormsModule,
      CommonModule,
      BackendErrorsComponent,
      RouterLink,
   ],
   templateUrl: './login-form.component.html',
   styleUrls: ['../../../../shared/styles/forms.styles.scss'],
})
export class LoginFormComponent extends MCFormComponent {
   @Input({required: true}) errors: BackendErrors | null = null;
   @Input({required: true}) isSubmitting: boolean = false;
   @Output() userDetails = new EventEmitter<LoginUserDetails>();

   constructor() {
      super();
      this.setupForm();
   }

   setupForm() {
      this.form = new FormGroup({
         email: new FormControl('', [Validators.required, Validators.email]),
         password: new FormControl('', [Validators.required]),
      });
   }

   handleSubmit() {
      if (this.form.valid) {
         this.userDetails.emit({user: this.form.value});
      }
   }
}
