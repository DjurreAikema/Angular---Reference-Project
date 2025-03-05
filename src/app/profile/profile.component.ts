import {Component, inject} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AuthService} from '../auth/data-access/auth.service';
import {ProfileUiComponent} from './ui/profile-ui.component';
import {NavbarComponent} from '../shared/ui/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, ProfileUiComponent, MatProgressSpinner],
  template: `
    <div class="profile-container">
      <div class="content">
        @if (authService.isLoading()) {
          <mat-spinner diameter="40"></mat-spinner>
        } @else if (authService.user()) {
          <app-profile-ui [user]="authService.user()!"/>
        }
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
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
    }

    mat-spinner {
      margin: 2rem auto;
    }
  `]
})
export default class ProfileComponent {

  authService = inject(AuthService);

}
