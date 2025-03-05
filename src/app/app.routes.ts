import {Routes} from '@angular/router';
import {isAuthenticatedGuard} from './auth/guards/isAuthenticatedGuard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: 'home',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'profile',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./profile/profile.component'),
  },
  {
    path: 'callback',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./auth/callback.component'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
