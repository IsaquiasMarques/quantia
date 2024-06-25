import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RedirectTo } from '@core/classes/redirect.class';
import { AuthService } from '@core/services/auth/auth.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const redirectTo = inject(RedirectTo);

  if(authService.user !== null){
    if(!authService.resettinPassword()){
      return true;
    } else{
      redirectTo.route(['/auth/reset-password'], { queryParamsHandling: 'preserve' });
      return false;
    }
  } else {
    redirectTo.route(['/auth/sign-in'])
    return false;
  }

};
