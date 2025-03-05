import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthService} from './auth/data-access/auth.service';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {filter} from 'rxjs';
import {NavbarComponent} from './shared/ui/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSnackBarModule, NavbarComponent],
  template: `
    <app-navbar [user]="authService.user()" (logout)="authService.logout()"/>
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `],
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.authService.handleAuthCallback();

    toObservable(this.authService.error)
      .pipe(
        takeUntilDestroyed(),
        filter(error => !!error)
      )
      .subscribe(error => {
        this.snackBar.open(error || 'An authentication error occurred', 'Dismiss', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      });
  }
}
