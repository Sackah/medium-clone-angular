import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {CurrentUserService} from "@shared/services/current-user.service";

export const AuthGuard = async () => {
  const currentUserService = inject(CurrentUserService);
  const router = inject(Router);

  currentUserService.user.subscribe({
    next: async (user) => {
      if (user.isLoggedIn) {
        return true;
      } else {
        await router.navigateByUrl('/login');
        return false;
      }
    }
  })
};
