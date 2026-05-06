import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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

  nombreRegistro = '';
  apellidoRegistro = '';
  whatsappRegistro = '';

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
    if (fullName) {
      sessionStorage.setItem(CHANGARRO_PROFILE_NAME_DRAFT_KEY, fullName);
    }
    const phone = this.whatsappRegistro.replace(/\s+/g, '').trim();
    if (phone) {
      sessionStorage.setItem(CHANGARRO_PROFILE_PHONE_DRAFT_KEY, phone);
    }
    if (this.registrationPhotoUrl) {
      sessionStorage.setItem(CHANGARRO_PROFILE_AVATAR_DRAFT_KEY, this.registrationPhotoUrl);
    }
    void this.router.navigate(['/bienvenida']);
  }
}
