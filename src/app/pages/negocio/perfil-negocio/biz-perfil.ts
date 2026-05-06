import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

interface DayConfig {
  key: string;
  label: string;
  abbrev: string;
  order: string;
}

interface DaySchedule {
  isOpen: boolean;
  openTime: string;
  openPeriod: 'AM' | 'PM';
  closeTime: string;
  closePeriod: 'AM' | 'PM';
}

interface TimeOption {
  value: string;
}

@Component({
  selector: 'app-biz-perfil',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './biz-perfil.html',
  styleUrl: './biz-perfil.scss',
})
export class BizPerfil implements OnInit, OnDestroy {
  private readonly auth = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly doc = inject(DOCUMENT);
  private previousHtmlOverflow = '';
  private previousBodyOverflow = '';

  businessName = signal('Tacos Don Juan');
  businessEmoji = signal('🌮');
  saving = signal(false);
  readonly maxPhotos = 6;

  name = 'Tacos Don Juan';
  emoji = '🌮';
  showEmojiCatalog = false;
  categoryId = 'comida';
  description = 'Los mejores tacos al pastor de la Roma Norte. Tortillas hechas a mano, salsas de la casa y ambiente familiar. Desde 1998.';
  address = 'Av. Álvaro Obregón 145';
  neighborhood = 'Roma Norte';
  whatsapp = '55 1234 5678';
  facebook = 'facebook.com/tacosdonjuan';
  tiktok = '@tacosdonjuan';
  instagram = '@tacosdonjuan';
  youtube = 'youtube.com/@tacosdonjuan';
  readonly days: DayConfig[] = [
    { key: 'lunes', label: 'Lunes', abbrev: 'L', order: '1' },
    { key: 'martes', label: 'Martes', abbrev: 'M', order: '2' },
    { key: 'miercoles', label: 'Miércoles', abbrev: 'X', order: '3' },
    { key: 'jueves', label: 'Jueves', abbrev: 'J', order: '4' },
    { key: 'viernes', label: 'Viernes', abbrev: 'V', order: '5' },
    { key: 'sabado', label: 'Sábado', abbrev: 'S', order: '6' },
    { key: 'domingo', label: 'Domingo', abbrev: 'D', order: '7' },
  ];

  readonly fullTimeOptions: TimeOption[] = [
    { value: '6:00' }, { value: '6:30' }, { value: '7:00' }, { value: '7:30' },
    { value: '8:00' }, { value: '8:30' }, { value: '9:00' }, { value: '9:30' },
    { value: '10:00' }, { value: '10:30' }, { value: '11:00' }, { value: '11:30' },
    { value: '12:00' },
  ];

  weeklySchedule: Record<string, DaySchedule> = {
    lunes: { isOpen: true, openTime: '12:00', openPeriod: 'PM', closeTime: '11:00', closePeriod: 'PM' },
    martes: { isOpen: true, openTime: '6:30', openPeriod: 'AM', closeTime: '11:00', closePeriod: 'PM' },
    miercoles: { isOpen: true, openTime: '12:00', openPeriod: 'PM', closeTime: '11:00', closePeriod: 'PM' },
    jueves: { isOpen: true, openTime: '12:00', openPeriod: 'PM', closeTime: '11:00', closePeriod: 'PM' },
    viernes: { isOpen: true, openTime: '12:00', openPeriod: 'PM', closeTime: '11:00', closePeriod: 'PM' },
    sabado: { isOpen: false, openTime: '12:00', openPeriod: 'PM', closeTime: '11:00', closePeriod: 'PM' },
    domingo: { isOpen: false, openTime: '12:00', openPeriod: 'PM', closeTime: '11:00', closePeriod: 'PM' },
  };
  paymentOptions = {
    efectivo: true,
    tarjetas: false,
    transferencia: false,
  };
  color = '#FFB57A';
  businessPhotos: string[] = [];

  categories = [
    { id: 'comida', label: 'Comida', emoji: '🌮' },
    { id: 'tienda', label: 'Tienda', emoji: '🛍️' },
    { id: 'servicios', label: 'Servicios', emoji: '🔧' },
    { id: 'entrete', label: 'Diversión', emoji: '🎉' },
    { id: 'salud', label: 'Salud', emoji: '⚕️' },
  ];

  emojiCatalog = [
    '🌮', '🍔', '🍕', '🌭', '🥗', '🍜', '🍣', '🧁',
    '☕', '🍺', '🛍️', '👕', '💄', '💐', '📱', '💻',
    '🔧', '🧰', '✂️', '💈', '🧼', '🧽', '🏥', '💊',
    '🎉', '🎁', '🎵', '🎮', '🚗', '🏍️', '📚', '🧸',
  ];

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const html = this.doc.documentElement;
    const body = this.doc.body;
    this.previousHtmlOverflow = html.style.overflow;
    this.previousBodyOverflow = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.doc.documentElement.style.overflow = this.previousHtmlOverflow;
    this.doc.body.style.overflow = this.previousBodyOverflow;
  }

  get paymentSummary(): string {
    const selected: string[] = [];
    if (this.paymentOptions.efectivo) selected.push('Efectivo');
    if (this.paymentOptions.tarjetas) selected.push('Tarjetas');
    if (this.paymentOptions.transferencia) selected.push('Transferencia');
    return selected.length ? selected.join(', ') : 'Sin método seleccionado';
  }

  get scheduleSummary(): string {
    const openDays = this.days
      .map((d) => this.weeklySchedule[d.key])
      .filter((d) => d.isOpen);
    if (!openDays.length) return 'Sin horario disponible';
    const sample = openDays[0];
    if (openDays.length === 7) return `Lun-Dom ${sample.openTime} ${sample.openPeriod} - ${sample.closeTime} ${sample.closePeriod}`;
    return `${openDays.length} días abiertos`;
  }

  toggleEmojiCatalog(): void {
    this.showEmojiCatalog = !this.showEmojiCatalog;
  }

  selectEmoji(emoji: string): void {
    this.emoji = emoji;
    this.showEmojiCatalog = false;
  }

  get openDaysCount(): number {
    return this.days.filter((d) => this.weeklySchedule[d.key].isOpen).length;
  }

  isWeekend(key: string): boolean {
    return key === 'sabado' || key === 'domingo';
  }

  toggleDay(key: string): void {
    this.weeklySchedule[key].isOpen = !this.weeklySchedule[key].isOpen;
  }

  togglePeriod(key: string, field: 'openPeriod' | 'closePeriod'): void {
    this.weeklySchedule[key][field] = this.weeklySchedule[key][field] === 'AM' ? 'PM' : 'AM';
  }

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


