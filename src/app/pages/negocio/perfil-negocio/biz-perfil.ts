import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-biz-perfil',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './biz-perfil.html',
  styleUrl: './biz-perfil.scss',
})
export class BizPerfil {
  private readonly auth = inject(AuthService);

  businessName = signal('Tacos Don Juan');
  businessEmoji = signal('🌮');
  saving = signal(false);
  readonly maxPhotos = 6;

  name = 'Tacos Don Juan';
  emoji = '🌮';
  categoryId = 'comida';
  description = 'Los mejores tacos al pastor de la Roma Norte. Tortillas hechas a mano, salsas de la casa y ambiente familiar. Desde 1998.';
  address = 'Av. Álvaro Obregón 145';
  neighborhood = 'Roma Norte';
  phone = '55 1234 5678';
  instagram = '@tacosdonjuan';
  schedule = 'Lun-Dom 12:00-23:00';
  paymentMethod = 'Solo efectivo';
  priceRange = '$25-60';
  color = '#FFB57A';
  businessPhotos: string[] = [];

  categories = [
    { id: 'comida', label: 'Comida', emoji: '🌮' },
    { id: 'tienda', label: 'Tienda', emoji: '🛍️' },
    { id: 'servicios', label: 'Servicios', emoji: '🔧' },
    { id: 'entrete', label: 'Diversión', emoji: '🎉' },
    { id: 'salud', label: 'Salud', emoji: '⚕️' },
  ];

  save() {
    this.saving.set(true);
    setTimeout(() => this.saving.set(false), 800);
  }

  logout(): void {
    this.auth.logout();
  }

  triggerPhotoInput(el: HTMLInputElement): void {
    el.click();
  }

  async onPhotosSelected(ev: Event): Promise<void> {
    const input = ev.target as HTMLInputElement;
    const files = input.files;
    if (!files?.length) return;

    const remaining = this.maxPhotos - this.businessPhotos.length;
    if (remaining <= 0) {
      input.value = '';
      return;
    }

    const slice = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, remaining);

    for (const file of slice) {
      const url = await readFileAsDataUrl(file);
      this.businessPhotos = [...this.businessPhotos, url];
    }
    input.value = '';
  }

  removePhoto(index: number): void {
    this.businessPhotos = this.businessPhotos.filter((_, i) => i !== index);
  }

  openGoogleMapsExplore(): void {
    window.open('https://www.google.com/maps', '_blank', 'noopener,noreferrer');
  }

  openGoogleMapsFromAddress(): void {
    const q = `${this.address} ${this.neighborhood}`.trim();
    if (!q) {
      this.openGoogleMapsExplore();
      return;
    }
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,
      '_blank',
      'noopener,noreferrer'
    );
  }
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
