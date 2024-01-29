import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonSpinnerComponent} from "../../../../shared/components/loaders/button-spinner.component";
import {MCFormComponent} from "../../../../classes/mcform-component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BackendErrors, LoginUserDetails} from "../../../../shared/types/auth.types";
import {BackendErrorsComponent} from "../backend-errors/backend-errors.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'mc-login-form',
  standalone: true,
  imports: [
    ButtonSpinnerComponent,
    ReactiveFormsModule,
    CommonModule,
    BackendErrorsComponent,
    RouterLink
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['../../styles/auth.styles.scss']
})
export class LoginFormComponent extends MCFormComponent {
  @Input() errors: BackendErrors | null = null;
  @Input() isSubmitting: boolean = false;
  @Output() userDetails = new EventEmitter<LoginUserDetails>();

  constructor() {
    super();
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }


  handleSubmit() {
    if (this.form.valid) {
      this.userDetails.emit({user: this.form.value});
    }
  }

}
