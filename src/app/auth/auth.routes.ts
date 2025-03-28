import {Route} from '@angular/router';

export const AUTH_ROUTES: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./login.component')
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
