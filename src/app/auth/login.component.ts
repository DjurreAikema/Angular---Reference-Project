import {Component, effect, inject} from '@angular/core';
import {AuthService} from './data-access/auth.service';
import {Router} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {LoginUiComponent} from './ui/login-ui.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatProgressSpinner,
    LoginUiComponent
  ],
  template: `
    <div class="container">
      @if (authService.isLoading()) {
        <mat-spinner diameter="50"/>
      } @else if (!authService.isAuthenticated()) {
        <app-login-ui
          [isLoading]="authService.isLoading()"
          [error]="authService.error()"
          (login)="authService.login()"
        />
      } @else {
        <mat-spinner diameter="50"/>
      }
    </div>
  `,
  styles: [`
    .container {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: center;
      background: linear-gradient(138deg, #3f51b5 0%, #7986cb 100%);
    }

    mat-spinner {
      margin: 2rem auto;
    }
  `]
})
export default class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    // Redirect to home if already authenticated
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/home']);
      }
    });
  }
}
