import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import {
  CHANGARRO_PROFILE_AVATAR_DRAFT_KEY,
  CHANGARRO_PROFILE_NAME_DRAFT_KEY,
  CHANGARRO_PROFILE_PHONE_DRAFT_KEY,
  gradientFromName,
  initialsFromDisplayName,
} from '../../shared/utils/avatar-placeholder';

interface RegistroField {
  label: string;
  placeholder: string;
  icon: string;
  type?: string;
  inputmode?: string;
  autocomplete?: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  nombreRegistro = '';
  apellidoRegistro = '';
  whatsappRegistro = '';
  passwordRegistro = '';
  passwordRepeatRegistro = '';
  submitting = false;
  error = '';

  registrationPhotoUrl: string | null = null;

  fields: RegistroField[] = [
    {
      label: 'Crea una contraseña',
      placeholder: 'Mínimo 8 caracteres',
      icon: '🔒',
      type: 'password',
      autocomplete: 'new-password',
    },
    {
      label: 'Repetir contraseña',
      placeholder: 'Vuelve a escribir',
      icon: '🔒',
      type: 'password',
      autocomplete: 'new-password',
    },
  ];

  get registrationInitials(): string {
    return initialsFromDisplayName(`${this.nombreRegistro} ${this.apellidoRegistro}`);
  }

  registrationAvatarGradient(): string {
    return gradientFromName(`${this.nombreRegistro}${this.apellidoRegistro}`);
  }

  onRegPhotoSelect(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file?.type.startsWith('image/')) {
      input.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.registrationPhotoUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  clearRegPhoto(): void {
    this.registrationPhotoUrl = null;
  }

  continuar(): void {
    const fullName = `${this.nombreRegistro.trim()} ${this.apellidoRegistro.trim()}`.trim();
    const phone = this.whatsappRegistro.replace(/\s+/g, '').trim();

    if (!fullName || !phone || !this.passwordRegistro || !this.passwordRepeatRegistro) {
      this.error = 'Completa nombre, WhatsApp y contraseÃ±a.';
      return;
    }

    if (this.passwordRegistro.length < 8) {
      this.error = 'La contraseÃ±a debe tener al menos 8 caracteres.';
      return;
    }

    if (this.passwordRegistro !== this.passwordRepeatRegistro) {
      this.error = 'Las contraseÃ±as no coinciden.';
      return;
    }

    sessionStorage.setItem(CHANGARRO_PROFILE_NAME_DRAFT_KEY, fullName);
    sessionStorage.setItem(CHANGARRO_PROFILE_PHONE_DRAFT_KEY, phone);
    if (this.registrationPhotoUrl) {
      sessionStorage.setItem(CHANGARRO_PROFILE_AVATAR_DRAFT_KEY, this.registrationPhotoUrl);
    }

    this.submitting = true;
    this.error = '';
    this.auth.register(fullName, phone, this.passwordRegistro).subscribe({
      next: () => {
        this.submitting = false;
        void this.router.navigate(['/bienvenida']);
      },
      error: (err) => {
        this.submitting = false;
        this.error = err?.error?.error || err?.message || 'No se pudo registrar con WhatsApp.';
      },
    });
  }
}
