import { Component } from '@angular/core';
import {LoginNavComponent} from "../components/login-nav/login-nav.component";
import {SignupFormComponent} from "../components/signup-form/signup-form.component";
import {SignUpState, SignUpUserDetails} from "../../../shared/types/auth.types";
import {combineLatest} from "rxjs";
import {selectErrors, selectIsSubmitting} from "../../../auth/store/signup/reducers";
import {signUpActions} from "../../../auth/store/signup/actions";
import {McPage} from "../../../classes/mc-page";

@Component({
  selector: 'mc-signup-page',
  standalone: true,
  imports: [
    LoginNavComponent,
    SignupFormComponent
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent extends McPage{
  public signUpState: Omit<SignUpState, "user"> = {
    isSubmitting: false,
    errors: null,
  }
  private signUpState$ = combineLatest([
    this.store.select(selectIsSubmitting),
    this.store.select(selectErrors)
  ])

  override ngOnInit() {
    super.ngOnInit();
    const signUpStateSubscription = this.signUpState$.subscribe({
      next: (state)=>{
        this.signUpState.isSubmitting = state[0];
        this.signUpState.errors = state[1];
      },
      error: (err)=>{
        this.signUpState.errors = err;
      }
    })

    this.subscriptions.push(signUpStateSubscription);
  }

  handleSignUp($event: SignUpUserDetails){
    this.store.dispatch(signUpActions.signUp($event))
  }
}
