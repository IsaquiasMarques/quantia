import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RedirectTo } from '@core/classes/redirect.class';
import { AuthService } from '@core/services/auth/auth.service';
import { delay, map } from 'rxjs';

export const resetPasswordGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const redirectTo = inject(RedirectTo);
  
  return authService.user$.pipe(
    delay(300),
    map(user => {
      if(!user){
        redirectTo.route(['/auth/sign-in']);
        return false;
      } else {
        return true;
      }
    })
  )

  // if(authService.user && authService.user.getAuthType === 'recovery'){
  //   return true;

  // } else {
  //   redirectTo.route(['/auth/sign-in']);
  //   return false;

  // }

};
