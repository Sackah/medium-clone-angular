import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MCFormComponent} from "../../../../classes/mcform-component";
import {BackendErrors, User} from "../../../../shared/types/auth.types";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BackendErrorsComponent} from "../../../auth/components/backend-errors/backend-errors.component";
import {ButtonSpinnerComponent} from "../../../../shared/components/loaders/button-spinner.component";
import {UpdateUserDetails} from "../../../../shared/types/update-user.types";

@Component({
  selector: 'mc-settings-form',
  standalone: true,
  imports: [
    BackendErrorsComponent,
    ButtonSpinnerComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './settings-form.component.html',
  styleUrls: ['../../../auth/styles/auth.styles.scss']
})
export class SettingsFormComponent extends MCFormComponent {
  @Input() user!: User;
  @Input() errors: BackendErrors | null = null;
  @Input() isSubmitting: boolean = false;
  @Output() userDetails = new EventEmitter<UpdateUserDetails>();

  override ngOnInit() {
    super.ngOnInit();
    this.form = new FormGroup({
      image: new FormControl({value: this.user.image, disabled: false}),
      username: new FormControl({value: this.user.username, disabled: false}, [Validators.min(4)]),
      bio: new FormControl({value: this.user.bio, disabled: false}),
      email: new FormControl({value: this.user.email, disabled: false}, [Validators.email]),
      password: new FormControl('', [Validators.min(8)])
    })
  }

  handleSubmit() {
    if (this.form.valid) {
      this.userDetails.emit({user: this.form.value});
    }
  }
}
