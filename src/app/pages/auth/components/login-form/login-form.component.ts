import { Component } from '@angular/core';
import {ButtonSpinnerComponent} from "../../../../shared/components/loaders/button-spinner.component";
import {MCFormComponent} from "../../../../classes/mcform-component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'mc-login-form',
  standalone: true,
  imports: [
    ButtonSpinnerComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent extends MCFormComponent{
  errors: boolean = false;
  isSubmitting: boolean = false;

  constructor() {
    super();
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }


  /**
   * To do install ngrx and use effect for login
   */
  handleSubmit(){
    console.log(this.form.value);
  }

}
