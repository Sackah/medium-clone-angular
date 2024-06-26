import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MCFormComponent} from '@app/classes/mc-form';
import {BackendErrors, User} from '@shared/types/auth.types';
import {
   FormControl,
   FormGroup,
   FormsModule,
   ReactiveFormsModule,
   Validators,
} from '@angular/forms';
import {BackendErrorsComponent} from '@shared/components/backend-errors/backend-errors.component';
import {ButtonSpinnerComponent} from '@shared/components/loaders/button-spinner.component';
import {UpdateUserDetails} from '@shared/types/update-user.types';
import {PreventLeadingSpace} from '@/app/directives/prevent-leading-space.directive';

@Component({
   selector: 'mc-settings-form',
   standalone: true,
   imports: [
      BackendErrorsComponent,
      ButtonSpinnerComponent,
      FormsModule,
      ReactiveFormsModule,
      PreventLeadingSpace,
   ],
   templateUrl: './settings-form.component.html',
   styleUrls: ['../../../../shared/styles/forms.styles.scss'],
})
export class SettingsFormComponent extends MCFormComponent {
   @Input({required: true}) user!: User;
   @Input({required: true}) errors: BackendErrors | null = null;
   @Input({required: true}) isSubmitting: boolean = false;
   @Output() userDetails = new EventEmitter<UpdateUserDetails>();

   override ngOnInit() {
      this.setupForm();
      super.ngOnInit();
   }

   setupForm() {
      this.form = new FormGroup({
         image: new FormControl({value: this.user.image, disabled: false}),
         username: new FormControl(
            {value: this.user.username, disabled: false},
            [Validators.min(4)]
         ),
         bio: new FormControl({value: this.user.bio, disabled: false}),
         email: new FormControl({value: this.user.email, disabled: false}, [
            Validators.email,
         ]),
         password: new FormControl('', [Validators.min(8)]),
      });
   }

   handleSubmit() {
      if (this.form.valid) {
         this.userDetails.emit({user: this.form.value});
      }
   }
}
