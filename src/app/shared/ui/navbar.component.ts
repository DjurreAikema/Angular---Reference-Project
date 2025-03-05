import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {AuthUser} from '../../auth/interfaces';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <mat-toolbar color="primary">
      <span class="logo" routerLink="/home">Angular Reference App</span>

      <span class="spacer"></span>

      @if (user()) {
        <div class="user-menu">
          <button mat-button [matMenuTriggerFor]="userMenu">
            <img
              [src]="user()?.picture || '/assets/default-avatar.png'"
              class="avatar"
              alt="User avatar"
            >
            {{ user()?.name }}
            <mat-icon>arrow_drop_down</mat-icon>
          </button>

          <mat-menu #userMenu="matMenu">
            <button mat-menu-item routerLink="/profile">
              <mat-icon>account_circle</mat-icon>
              <span>Profile</span>
            </button>
            <button mat-menu-item (click)="logout.emit()">
              <mat-icon>exit_to_app</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </div>
      } @else {
        <button mat-button routerLink="/auth/login">
          <mat-icon>login</mat-icon>
          Login
        </button>
      }
    </mat-toolbar>
  `,
  styles: [`
    mat-toolbar {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .logo {
      font-size: 1.3rem;
      font-weight: 500;
      cursor: pointer;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .user-menu {
      display: flex;
      align-items: center;
    }

    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
  `]
})
export class NavbarComponent {

  // --- Inputs
  user: InputSignal<AuthUser | null | undefined> = input<AuthUser | null | undefined>(null);

  // --- Outputs
  logout: OutputEmitterRef<void> = output<void>();

}
