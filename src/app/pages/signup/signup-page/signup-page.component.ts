import {Component} from '@angular/core';
import {LoginNavComponent} from '../../login/components/login-nav/login-nav.component';
import {SignupFormComponent} from '../components/signup-form/signup-form.component';
import {SignUpState, SignUpUserDetails,} from '@shared/types/auth.types';
import {combineLatest} from 'rxjs';
import {selectErrors, selectIsSubmitting,} from '@app/auth/store/signup/reducers';
import {signUpActions} from '@app/auth/store/signup/actions';
import {MCPage} from '@app/classes/mc-page';
import {FooterComponent} from '@shared/components/footer/footer.component';

@Component({
  selector: 'mc-signup-page',
  standalone: true,
  imports: [LoginNavComponent, SignupFormComponent, FooterComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent extends MCPage {
  public signUpState: Omit<SignUpState, 'user'> = {
    isSubmitting: false,
    errors: null,
  };
  private signUpState$ = combineLatest([
    this.store.select(selectIsSubmitting),
    this.store.select(selectErrors),
  ]);

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.setTitle('Sign Up');
    this.subscribeToSignUpState();
  }

  subscribeToSignUpState() {
    const signUpStateSubscription = this.signUpState$.subscribe({
      next: (state) => {
        this.signUpState.isSubmitting = state[0];
        this.signUpState.errors = state[1];
      },
      error: (err) => {
        this.signUpState.errors = err;
      },
    });

    this.subscriptions.push(signUpStateSubscription);
  }

  handleSignUp($event: SignUpUserDetails) {
    this.store.dispatch(signUpActions.signUp($event));
  }
}
