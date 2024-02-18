import {Component} from '@angular/core';
import {LoginNavComponent} from '../components/login-nav/login-nav.component';
import {LoginFormComponent} from '../components/login-form/login-form.component';
import {loginActions} from '@app/auth/store/login/actions';
import {LoginState, LoginUserDetails} from '@shared/types/auth.types';
import {combineLatest, tap} from 'rxjs';
import {selectErrors, selectIsSubmitting} from '@app/auth/store/login/reducers';
import {MCPage} from '@app/classes/mc-page';
import {FooterComponent} from '@shared/components/footer/footer.component';

@Component({
   selector: 'mc-login-page',
   standalone: true,
   imports: [LoginNavComponent, LoginFormComponent, FooterComponent],
   templateUrl: './login-page.component.html',
})
export class LoginPageComponent extends MCPage {
   public loginState: Omit<LoginState, 'user'> = {
      isSubmitting: false,
      errors: null,
   };
   private loginState$ = combineLatest([
      this.store.select(selectIsSubmitting),
      this.store.select(selectErrors),
   ]).pipe(
      tap(([isSubmitting, errors]) => {
         this.loginState.isSubmitting = isSubmitting;
         this.loginState.errors = errors;
      })
   );

   constructor() {
      super();
   }

   override ngOnInit() {
      super.ngOnInit();
      this.setTitle('Login');
      this.subscriptions.push(this.loginState$.subscribe());
   }

   handleLogin($event: LoginUserDetails) {
      this.store.dispatch(loginActions.login($event));
   }
}
