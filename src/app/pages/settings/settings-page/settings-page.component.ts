import {Component, inject} from '@angular/core';
import {HomeNavComponent} from '../../home/components/home-nav/home-nav.component';
import {MCPage} from '@app/classes/mc-page';
import {SettingsFormComponent} from '../components/settings-form/settings-form.component';
import {
   UpdateUserDetails,
   UpdateUserState,
} from '@shared/types/update-user.types';
import {combineLatest, tap} from 'rxjs';
import {selectErrors, selectIsSubmitting} from '../store/reducers';
import {updateUserActions} from '../store/actions';
import {TokenService} from '@shared/services/token.service';
import {FooterComponent} from '@shared/components/footer/footer.component';

@Component({
   selector: 'mc-settings-page',
   standalone: true,
   imports: [HomeNavComponent, SettingsFormComponent, FooterComponent],
   templateUrl: './settings-page.component.html',
   styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent extends MCPage {
   tokenService = inject(TokenService);
   public settingsState: Omit<UpdateUserState, 'user'> = {
      isSubmitting: false,
      errors: null,
   };
   private settingsState$ = combineLatest([
      this.store.select(selectIsSubmitting),
      this.store.select(selectErrors),
   ]).pipe(
      tap(([isSubmitting, errors]) => {
         this.settingsState.isSubmitting = isSubmitting;
         this.settingsState.errors = errors;
      })
   );

   constructor() {
      super();
      this.setTitle('Settings');
   }

   override ngOnInit() {
      super.ngOnInit();
      this.subscriptions.push(this.settingsState$.subscribe());
   }

   updateSettings($event: UpdateUserDetails) {
      this.store.dispatch(updateUserActions.update($event));
   }

   async handleLogout() {
      this.currentUserService.clearCurrentUser();
      this.tokenService.clear();
      await this.router.navigateByUrl('/login');
   }
}
