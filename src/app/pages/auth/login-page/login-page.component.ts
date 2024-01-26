import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {LoginNavComponent} from "../components/login-nav/login-nav.component";
import {LoginFormComponent} from "../components/login-form/login-form.component";
import {loginActions} from "../../../auth/store/login/actions";
import {LoginState, LoginUserDetails} from "../../../shared/types/auth.types";
import {Store} from "@ngrx/store";
import {combineLatest, Subscription} from "rxjs";
import {selectErrors, selectIsSubmitting, selectUser} from "../../../auth/store/login/reducers";

@Component({
  selector: 'mc-login-page',
  standalone: true,
  imports: [
    LoginNavComponent,
    LoginFormComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit, OnDestroy{
  private store = inject(Store);
  private subscriptions?: Subscription[];
  public loginState: LoginState = {
    isSubmitting: false,
    errors: null,
    user: null
  }
  private loginState$ = combineLatest([
    this.store.select(selectIsSubmitting),
    this.store.select(selectErrors),
    this.store.select(selectUser)
  ])

  ngOnInit() {
    const loginStateSubscription = this.loginState$.subscribe({
      next: (state)=>{
          this.loginState.isSubmitting = state[0];
          this.loginState.errors = state[1];
          this.loginState.user = state[2];
      },
      error: (err)=>{
        this.loginState.errors = err
      }
    })

    this.subscriptions?.push(loginStateSubscription);
  }

  handleLogin($event: LoginUserDetails){
    this.store.dispatch(loginActions.login($event))
  }

  ngOnDestroy() {
    if(this.subscriptions){
      this.subscriptions.forEach((sub)=>sub.unsubscribe());
    }
  }
}
