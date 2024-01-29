import {Component} from '@angular/core';
import {LoginNavComponent} from "../components/login-nav/login-nav.component";
import {LoginFormComponent} from "../components/login-form/login-form.component";
import {loginActions} from "../../../auth/store/login/actions";
import {LoginState, LoginUserDetails} from "../../../shared/types/auth.types";
import {combineLatest} from "rxjs";
import {selectErrors, selectIsSubmitting} from "../../../auth/store/login/reducers";
import {McPage} from "../../../classes/mc-page";
import {FooterComponent} from "../../../shared/components/footer/footer.component";

@Component({
  selector: 'mc-login-page',
  standalone: true,
  imports: [
    LoginNavComponent,
    LoginFormComponent,
    FooterComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent extends McPage {
  public loginState: Omit<LoginState, 'user'> = {
    isSubmitting: false,
    errors: null,
  }
  private loginState$ = combineLatest([
    this.store.select(selectIsSubmitting),
    this.store.select(selectErrors),
  ])

  override ngOnInit() {
    super.ngOnInit();
    const loginStateSubscription = this.loginState$.subscribe({
      next: (state) => {
        this.loginState.isSubmitting = state[0];
        this.loginState.errors = state[1];
      },
      error: (err) => {
        this.loginState.errors = err
      }
    })

    this.subscriptions.push(loginStateSubscription);
  }

  handleLogin($event: LoginUserDetails) {
    this.store.dispatch(loginActions.login($event))
  }
}
