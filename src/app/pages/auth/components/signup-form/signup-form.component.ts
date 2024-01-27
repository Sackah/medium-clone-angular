import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MCFormComponent} from "../../../../classes/mcform-component";
import {BackendErrors, SignUpUserDetails} from "../../../../shared/types/auth.types";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BackendErrorsComponent} from "../backend-errors/backend-errors.component";
import {ButtonSpinnerComponent} from "../../../../shared/components/loaders/button-spinner.component";

@Component({
  selector: 'mc-signup-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    BackendErrorsComponent,
    ButtonSpinnerComponent
  ],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss', '../../styles/auth.styles.scss']
})
export class SignupFormComponent extends MCFormComponent{
  @Input() errors: BackendErrors | null = null;
  @Input() isSubmitting: boolean = false;
  @Output() userDetails = new EventEmitter<SignUpUserDetails>();

  constructor() {
    super();
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  handleSubmit(){
    console.log(this.form.value);
    if(this.form.valid){
      this.userDetails.emit({user: this.form.value});
    }
  }
}
