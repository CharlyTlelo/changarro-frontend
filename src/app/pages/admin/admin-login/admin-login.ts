import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLogin {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  showPassword = signal(false);

  saving = signal(false);
  error = signal<string | null>(null);

  login() {
    this.error.set(null);
    this.saving.set(true);

    this.auth.adminLogin(this.email.trim(), this.password).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: (err) => {
        const msg = err?.error?.error;
        this.error.set(typeof msg === 'string' && msg.trim() ? msg : 'Credenciales inválidas.');
        this.saving.set(false);
      },
      complete: () => this.saving.set(false),
    });
  }
}

