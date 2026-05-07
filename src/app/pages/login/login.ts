import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(AuthService);

  identifier = '';
  password = '';
  loading = signal(false);
  error = signal('');

  login(): void {
    const id = this.identifier.trim();
    const pw = this.password;
    if (!id || !pw) {
      this.error.set('Ingresa tu WhatsApp/email y contraseña');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.auth.login(id, pw).subscribe({
      next: () => {
        this.loading.set(false);
        this.auth.navigateAfterAuth();
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.error || 'Credenciales inválidas');
      },
    });
  }
}
