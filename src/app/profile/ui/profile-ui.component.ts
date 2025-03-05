import {Component, input, InputSignal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {AuthUser} from '../../auth/interfaces';

@Component({
  selector: 'app-profile-ui',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <mat-card class="profile-card">
      <mat-card-header>
        <div mat-card-avatar class="profile-image">
          <img [src]="user()?.picture || '/assets/default-avatar.png'" alt="Avatar">
        </div>
        <mat-card-title>{{ user()?.name }}</mat-card-title>
        <mat-card-subtitle>{{ user()?.email }}</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <div class="profile-section">
          <h3>Account Details</h3>
          <div class="profile-info">
            <div class="profile-item">
              <strong>User ID:</strong>
              <span>{{ formatUserId(user()?.sub) }}</span>
            </div>
          </div>
        </div>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button color="primary" routerLink="/home">
          <mat-icon>home</mat-icon>
          Back to Home
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .profile-card {
      max-width: 600px;
      width: 100%;
    }

    .profile-image {
      width: 60px;
      height: 60px;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 1rem;
    }

    .profile-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profile-section {
      margin: 1.5rem 0;
    }

    h3 {
      margin-bottom: 1rem;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 0.5rem;
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .profile-item {
      display: flex;
      gap: 0.5rem;
    }

    .profile-item strong {
      min-width: 100px;
    }
  `]
})
export class ProfileUiComponent {

  // --- Inputs
  user: InputSignal<AuthUser> = input.required<AuthUser>();

  // --- Methods
  formatUserId(sub: string | undefined): string {
    if (!sub) return 'N/A';

    // Display only the last part of the Auth0 ID
    const idParts = sub.split('|');
    return idParts.length > 1 ? idParts[1] : sub;
  }

}
