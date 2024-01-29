import {Component, inject} from '@angular/core';
import {HomeNavComponent} from "../../home/components/home-nav/home-nav.component";
import {McPage} from "../../../classes/mc-page";
import {SettingsFormComponent} from "../components/settings-form/settings-form.component";
import {UpdateUserDetails, UpdateUserState} from "../../../shared/types/update-user.types";
import {combineLatest} from "rxjs";
import {selectErrors, selectIsSubmitting} from "../store/reducers";
import {updateUserActions} from "../store/actions";
import {TokenService} from "../../../shared/services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'mc-settings-page',
  standalone: true,
  imports: [
    HomeNavComponent,
    SettingsFormComponent
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent extends McPage {
  tokenService = inject(TokenService);
  router = inject(Router);
  public settingsState: Omit<UpdateUserState, 'user'> = {
    isSubmitting: false,
    errors: null
  }
  private settingsState$ = combineLatest([
    this.store.select(selectIsSubmitting),
    this.store.select(selectErrors)
  ])

  override ngOnInit() {
    super.ngOnInit();
    const settingsStateSubscription = this.settingsState$.subscribe({
      next: (state) => {
        this.settingsState.isSubmitting = state[0];
        this.settingsState.errors = state[1];
      },
      error: (err) => {
        this.settingsState.errors = err;
      }
    })

    this.subscriptions.push(settingsStateSubscription);
  }

  updateSettings($event: UpdateUserDetails) {
    this.store.dispatch(updateUserActions.update($event));
  }

  handleLogout() {
    this.currentUserService.clearCurrentUser();
    this.tokenService.clear();
    this.router.navigateByUrl('/login').then();
  }
}
