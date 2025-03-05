import {Component, inject, OnInit} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AuthService} from './data-access/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [MatProgressSpinner],
  template: `
    <div class="callback-container">
      <mat-spinner diameter="60"/>
      <p>Finalizing authentication...</p>
    </div>
  `,
  styles: [`
    .callback-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(138deg, #3f51b5 0%, #7986cb 100%);
    }

    p {
      margin-top: 2rem;
      color: white;
      font-size: 1.2rem;
    }
  `]
})
export default class CallbackComponent implements OnInit {
  // --- Dependencies
  private authService = inject(AuthService);

  ngOnInit(): void {
    // Process the authentication response
    this.authService.handleAuthCallback();
  }

}
