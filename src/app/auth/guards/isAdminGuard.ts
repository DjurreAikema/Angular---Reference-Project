import {CanActivateFn, Router} from '@angular/router';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import {inject} from '@angular/core';
import {map} from 'rxjs';

export const isAdminGuard = (): CanActivateFn => {
  return () => {
    const auth0Service = inject(Auth0Service);
    const router = inject(Router);

    return auth0Service.user$.pipe(
      map(user => {
        const roles = user?.[`${window.location.origin}/roles`] as string[] || [];
        const isAdmin = roles.includes('admin');

        if (!isAdmin) {
          router.navigate(['/home']);
          return false
        }

        return true;
      })
    );
  };
};
