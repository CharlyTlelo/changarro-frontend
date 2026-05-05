import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [RouterOutlet, AdminSidebar],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel {
  private readonly auth = inject(AuthService);
  user = this.auth.user;

  logout() {
    this.auth.logout();
  }
}
