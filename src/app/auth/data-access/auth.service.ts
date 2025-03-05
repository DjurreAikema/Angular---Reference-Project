import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {AuthUser} from '../interfaces';
import {AuthClientConfig, AuthService as Auth0Service} from '@auth0/auth0-angular';
import {Router} from '@angular/router';
import {catchError, EMPTY, map, merge, Observable, Subject, tap} from 'rxjs';
import {connect} from 'ngxtension/connect';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';

interface AuthState {
  user: AuthUser | null | undefined;
  error: string | null;
  isLoading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // --- Dependencies
  private auth0: Auth0Service = inject(Auth0Service);
  private config: AuthClientConfig = inject(AuthClientConfig);
  private router: Router = inject(Router);

  // --- State
  private state: WritableSignal<AuthState> = signal<AuthState>({
    user: undefined,
    error: null,
    isLoading: false
  });

  // --- Selectors
  user: Signal<AuthUser | null | undefined> = computed(() => this.state().user);
  error: Signal<string | null> = computed(() => this.state().error);
  isLoading: Signal<boolean> = computed(() => this.state().isLoading);
  isAuthenticated: Signal<boolean> = computed(() => !!this.state().user);

  // --- Sources
  login$: Subject<void> = new Subject<void>();
  logout$: Subject<void> = new Subject<void>();
  error$: Subject<string> = new Subject<string>();

  private user$: Observable<AuthUser | null> = this.auth0.user$.pipe(
    map(user => {
      if (!user) return null;
      return {
        email: user.email || '',
        name: user.name || '',
        picture: user.picture || '',
        sub: user.sub || '',
      };
    })
  );

  private isAuthenticated$: Observable<boolean> = this.auth0.isAuthenticated$;
  private isLoading$: Observable<boolean> = this.auth0.isLoading$;

  // --- Reducer
  constructor() {
    const nextState$ = merge(
      this.user$.pipe(map(user => ({user}))),

      this.isLoading$.pipe(map(isLoading => ({isLoading}))),

      this.error$.pipe(map(error => ({error})))
    );

    connect(this.state).with(nextState$);

    // Handle login action
    this.login$.pipe(
      takeUntilDestroyed(),
      tap(() => {
        // this.error$.next(null);
        this.auth0.loginWithRedirect({
          appState: {target: window.location.pathname}
        });
      })
    ).subscribe();

    // Handle logout action
    this.logout$.pipe(
      takeUntilDestroyed(),
      tap(() => {
        this.auth0.logout({
          logoutParams: {
            returnTo: window.location.origin
          }
        });
      })
    ).subscribe();
  }

  // --- Public methods
  login(): void {
    this.login$.next();
  }

  logout(): void {
    this.logout$.next();
  }

  // Handle redirect callback - should be called in AppComponent
  handleAuthCallback(): void {
    // Handle redirect from Auth0
    toObservable(this.isAuthenticated).pipe(
      takeUntilDestroyed(),
      tap(isAuth => {
        if (isAuth) {
          // Get redirect target if available, otherwise go to home
          this.auth0.appState$.pipe(
            takeUntilDestroyed(),
            tap(appState => {
              const redirectUrl = appState?.target || '/';
              this.router.navigateByUrl(redirectUrl);
            })
          ).subscribe();
        }
      }),
      catchError(err => {
        this.error$.next('Authentication error occurred');
        console.error('Auth error: ', err);
        return EMPTY;
      })
    ).subscribe();
  }
}
