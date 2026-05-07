import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { BusinessApiService, DaySchedule } from '../../../shared/services/business.service';
import { CategoryApiService, type CategoryData, type CategorySubcategory } from '../../../shared/services/category.service';

interface DayConfig {
  key: string;
  label: string;
  abbrev: string;
  order: string;
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
  private readonly bizApi = inject(BusinessApiService);
  private readonly categoryApi = inject(CategoryApiService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly doc = inject(DOCUMENT);
  private previousHtmlOverflow = '';
  private previousBodyOverflow = '';

  businessName = signal('');
  businessEmoji = signal('🏪');
  saving = signal(false);
  loading = signal(true);
  error = signal('');
  saveSuccess = signal(false);
  readonly maxPhotos = 6;

  name = '';
  emoji = '🏪';
  showEmojiCatalog = false;
  categoryId = '';
  subcategoryId = '';
  description = '';
  address = '';
  neighborhood = '';
  whatsapp = '';
  facebook = '';
  tiktok = '';
  instagram = '';
  youtube = '';

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
    lunes: { isOpen: true, openTime: '9:00', openPeriod: 'AM', closeTime: '6:00', closePeriod: 'PM' },
    martes: { isOpen: true, openTime: '9:00', openPeriod: 'AM', closeTime: '6:00', closePeriod: 'PM' },
    miercoles: { isOpen: true, openTime: '9:00', openPeriod: 'AM', closeTime: '6:00', closePeriod: 'PM' },
    jueves: { isOpen: true, openTime: '9:00', openPeriod: 'AM', closeTime: '6:00', closePeriod: 'PM' },
    viernes: { isOpen: true, openTime: '9:00', openPeriod: 'AM', closeTime: '6:00', closePeriod: 'PM' },
    sabado: { isOpen: false, openTime: '9:00', openPeriod: 'AM', closeTime: '6:00', closePeriod: 'PM' },
    domingo: { isOpen: false, openTime: '9:00', openPeriod: 'AM', closeTime: '6:00', closePeriod: 'PM' },
  };

  paymentOptions = {
    efectivo: true,
    tarjetas: false,
    transferencia: false,
  };

  color = '#FF6B35';
  businessPhotos: string[] = [];

  categories: CategoryData[] = [];
  categoriesError = '';

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

    this.loadCategories();
    this.loadProfile();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.doc.documentElement.style.overflow = this.previousHtmlOverflow;
    this.doc.body.style.overflow = this.previousBodyOverflow;
  }

  loadProfile(): void {
    this.loading.set(true);
    this.error.set('');

    this.bizApi.getMyBusiness().subscribe({
      next: (biz) => {
        this.name = biz.name || '';
        this.emoji = biz.emoji || '🏪';
        this.categoryId = biz.categoryId || '';
        this.subcategoryId = biz.subcategoryId || '';
        this.description = biz.description || '';
        this.address = biz.address || '';
        this.neighborhood = biz.neighborhood || '';
        this.whatsapp = biz.whatsapp || biz.phone || '';
        this.facebook = biz.facebook || '';
        this.tiktok = biz.tiktok || '';
        this.instagram = biz.instagram || '';
        this.youtube = biz.youtube || '';
        this.color = biz.color || '#FF6B35';
        this.businessPhotos = biz.photos || [];

        if (biz.paymentMethods) {
          this.paymentOptions = { ...biz.paymentMethods };
        }

        if (biz.weeklySchedule) {
          for (const day of this.days) {
            const remote = biz.weeklySchedule[day.key];
            if (remote) {
              this.weeklySchedule[day.key] = { ...remote };
            }
          }
        }

        this.businessName.set(this.name);
        this.businessEmoji.set(this.emoji);
        this.loading.set(false);
      },
      error: (err) => {
        const msg = err?.error?.error || err?.message || 'Error al cargar perfil';
        this.error.set(msg);
        this.loading.set(false);
      },
    });
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

  save(): void {
    this.saving.set(true);
    this.error.set('');
    this.saveSuccess.set(false);

    const payload = {
      name: this.name,
      emoji: this.emoji,
      categoryId: this.categoryId,
      subcategoryId: this.subcategoryId,
      description: this.description,
      address: this.address,
      neighborhood: this.neighborhood,
      whatsapp: this.whatsapp,
      facebook: this.facebook,
      tiktok: this.tiktok,
      instagram: this.instagram,
      youtube: this.youtube,
      color: this.color,
      photos: this.businessPhotos,
      paymentMethods: { ...this.paymentOptions },
      weeklySchedule: { ...this.weeklySchedule },
    };

    this.bizApi.updateMyBusiness(payload).subscribe({
      next: (biz) => {
        this.businessName.set(biz.name);
        this.businessEmoji.set(biz.emoji);
        this.saving.set(false);
        this.saveSuccess.set(true);
        setTimeout(() => this.saveSuccess.set(false), 2500);
      },
      error: (err) => {
        const msg = err?.error?.error || err?.error?.details?.[0]?.message || err?.message || 'Error al guardar';
        this.error.set(msg);
        this.saving.set(false);
      },
    });
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

  loadCategories(): void {
    this.categoriesError = '';
    this.categoryApi.getCategories(true).subscribe({
      next: (categories) => {
        this.categories = categories || [];
        if (!this.categoryId && this.categories.length > 0) {
          this.categoryId = this.categories[0].id;
        }
        if (!this.isSubcategoryValid(this.categoryId, this.subcategoryId)) {
          this.subcategoryId = '';
        }
      },
      error: () => {
        this.categories = [];
        this.subcategoryId = '';
        this.categoriesError = 'No se pudo cargar el catálogo de categorías.';
      },
    });
  }

  selectCategory(categoryId: string): void {
    this.categoryId = categoryId;
    if (!this.isSubcategoryValid(this.categoryId, this.subcategoryId)) {
      this.subcategoryId = '';
    }
  }

  get availableSubcategories(): CategorySubcategory[] {
    return this.categories.find((c) => c.id === this.categoryId)?.subcategories || [];
  }

  private isSubcategoryValid(categoryId: string, subcategoryId: string): boolean {
    if (!categoryId || !subcategoryId) return false;
    return this.categories.find((c) => c.id === categoryId)?.subcategories?.some((s) => s.id === subcategoryId) || false;
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
