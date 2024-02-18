import {Component} from '@angular/core';
import {LoginNavComponent} from '../../login/components/login-nav/login-nav.component';
import {SignupFormComponent} from '../components/signup-form/signup-form.component';
import {SignUpState, SignUpUserDetails} from '@shared/types/auth.types';
import {combineLatest, tap} from 'rxjs';
import {
   selectErrors,
   selectIsSubmitting,
} from '@app/auth/store/signup/reducers';
import {signUpActions} from '@app/auth/store/signup/actions';
import {MCPage} from '@app/classes/mc-page';
import {FooterComponent} from '@shared/components/footer/footer.component';

@Component({
   selector: 'mc-signup-page',
   standalone: true,
   imports: [LoginNavComponent, SignupFormComponent, FooterComponent],
   templateUrl: './signup-page.component.html',
})
export class SignupPageComponent extends MCPage {
   public signUpState: Omit<SignUpState, 'user'> = {
      isSubmitting: false,
      errors: null,
   };
   private signUpState$ = combineLatest([
      this.store.select(selectIsSubmitting),
      this.store.select(selectErrors),
   ]).pipe(
      tap(([isSubmitting, errors]) => {
         this.signUpState.isSubmitting = isSubmitting;
         this.signUpState.errors = errors;
      })
   );

   constructor() {
      super();
      this.setTitle('Sign Up');
   }

   override ngOnInit() {
      super.ngOnInit();
      this.subscriptions.push(this.signUpState$.subscribe());
   }

   handleSignUp($event: SignUpUserDetails) {
      this.store.dispatch(signUpActions.signUp($event));
   }
}
