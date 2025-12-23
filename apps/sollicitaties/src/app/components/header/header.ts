import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ AsyncPipe, MatButtonModule ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Header {

  protected authService = inject(AuthService);

  signOut() {
    this.authService.signOut();
  }
}
