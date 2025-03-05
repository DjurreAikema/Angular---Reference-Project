import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login-ui',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, MatIconModule
  ],
  template: `
    <mat-card class="login-card">
      <mat-card-header>
        <mat-card-title>Welcome to Angular Reference Project</mat-card-title>
        <mat-card-subtitle>Sign in to get started</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        @if (error()) {
          <div class="error-message">
            <mat-icon>error</mat-icon>
            <span>{{ error() }}</span>
          </div>
        }
      </mat-card-content>

      <mat-card-actions align="end">
        <button
          mat-raised-button
          color="primary"
          (click)="login.emit()"
          [disabled]="isLoading()"
        >
          Sign in with Auth0
          @if (!isLoading()) {
            <mat-icon>login</mat-icon>
          }
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .login-card {
      max-width: 400px;
      width: 100%;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      background-color: white;
    }

    mat-card-header {
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    mat-card-title {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    mar-card-subtitle {
      font-size: 1rem;
    }

    mat-card-actions {
      padding: 1rem 0 0;
    }

    button {
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #ffebee;
      color: #c62828;
      padding: 0.75rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
  `]
})
export class LoginUiComponent {
  // --- Inputs
  isLoading: InputSignal<boolean> = input.required<boolean>();
  error: InputSignal<string | null> = input.required<string | null>();

  // --- Outputs
  login: OutputEmitterRef<void> = output<void>();
}
