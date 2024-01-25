import {inject} from "@angular/core";
import {TokenService} from "../../shared/services/token.service";
import {Router} from "@angular/router";

export const AuthGuard = async () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.get();

  if (token) {
    return true;
  } else {
    await router.navigateByUrl('/login');
    return false;
  }
};
