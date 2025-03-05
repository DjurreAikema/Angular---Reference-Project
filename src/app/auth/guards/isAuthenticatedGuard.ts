import {CanActivateFn, Router} from '@angular/router';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import {inject} from '@angular/core';
import {tap} from 'rxjs';

export const isAuthenticatedGuard = (): CanActivateFn => {
  return () => {
    const auth0Service = inject(Auth0Service);
    const router = inject(Router);

    return auth0Service.isAuthenticated$.pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          router.navigate(['/auth/login']);
        }
      })
    );
  };
};
