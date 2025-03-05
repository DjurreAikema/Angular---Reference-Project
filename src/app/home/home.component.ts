import {Component, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {AuthService} from '../auth/data-access/auth.service';
import {NavbarComponent} from '../shared/ui/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="home-container">
      <div class="content">
        <mat-card class="welcome-card">
          <mat-card-header>
            <mat-card-title>Welcome to the reference project</mat-card-title>
            <mat-card-subtitle>
              This is your starting point for exploring Angular features
            </mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <p>
              This application demonstrates Joshua Morony's reactive/declarative pattern with
              Auth0 authentication integration.
            </p>

            <h3>Key Features:</h3>
            <ul>
              <li>Auth0 authentication integration</li>
              <li>Signals-based state management</li>
              <li>Separation of UI & data access concerns</li>
              <li>Route guards for protected content</li>
            </ul>
          </mat-card-content>

          <mat-card-actions>
            <button mat-button color="primary" routerLink="/profile">
              <mat-icon>account_circle</mat-icon>
              View Profile
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .content {
      flex: 1;
      padding: 2rem;
      background-color: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .welcome-card {
      max-width: 800px;
      width: 100%;
      margin: 0 auto;
    }

    mat-card-header {
      margin-bottom: 1.5rem;
    }

    mat-card-title {
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
    }

    mat-card-content {
      font-size: 1rem;
      line-height: 1.6;
    }

    h3 {
      margin: 1.5rem 0 0.5rem;
    }

    ul {
      margin-top: 0.5rem;
      padding-left: 1.5rem;
    }

    li {
      margin-bottom: 0.5rem;
    }
  `]
})
export default class HomeComponent {

  authService = inject(AuthService)

}
