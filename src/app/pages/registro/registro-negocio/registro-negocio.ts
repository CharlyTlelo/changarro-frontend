import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CategoryApiService, type CategoryData, type CategorySubcategory } from '../../../shared/services/category.service';

type StepKey = 'enganche' | 'ubicacion';

@Component({
  selector: 'app-registro-negocio',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registro-negocio.html',
  styleUrls: ['../registro.scss', './registro-negocio.scss'],
})
export class RegistroNegocio {
  private readonly auth = inject(AuthService);
  private readonly categoryApi = inject(CategoryApiService);
  submitting = signal(false);
  submitError = signal('');
  readonly maxPhotos = 6;

  readonly steps: Array<{ key: StepKey; title: string; optional?: boolean }> = [
    { key: 'enganche', title: 'Tu changarro' },
    { key: 'ubicacion', title: 'Ubicación' },
  ];

  currentStep: StepKey = 'enganche';

  fields = [
    { label: 'Nombre del negocio', placeholder: 'Ej. Taquería la Esquina', icon: '🏪', value: '' },
    { label: 'WhatsApp', placeholder: 'Ej. 5512345678', icon: '💬', type: 'tel', value: '' },
  ];

  ubicacion = '';
  descripcion = '';
  password = '';
  passwordRepeat = '';
  showPassword = false;
  showPasswordRepeat = false;

  businessPhotos: string[] = [];
  categories: CategoryData[] = [];
  categoriesError = '';
  categoryId = '';
  subcategoryId = '';
  otherCategoryName = '';

  selectedDelegacion = '';
  selectedPueblo = '';

  readonly delegaciones: { id: string; name: string; emoji: string; pueblos: { id: string; name: string }[] }[] = [
    {
      id: 'milpa-alta',
      name: 'Milpa Alta',
      emoji: '🌽',
      pueblos: [
        { id: 'villa-milpa-alta', name: 'Villa Milpa Alta' },
        { id: 'san-antonio-tecomitl', name: 'San Antonio Tecómitl' },
        { id: 'san-pedro-atocpan', name: 'San Pedro Atocpan' },
        { id: 'san-pablo-oztotepec', name: 'San Pablo Oztotepec' },
        { id: 'san-bartolome-xicomulco', name: 'San Bartolomé Xicomulco' },
        { id: 'san-salvador-cuauhtenco', name: 'San Salvador Cuauhtenco' },
        { id: 'santa-ana-tlacotenco', name: 'Santa Ana Tlacotenco' },
        { id: 'san-lorenzo-tlacoyucan', name: 'San Lorenzo Tlacoyucan' },
        { id: 'san-jeronimo-miacatlan', name: 'San Jerónimo Miacatlán' },
        { id: 'san-francisco-tecoxpa', name: 'San Francisco Tecoxpa' },
        { id: 'san-juan-tepenahuac', name: 'San Juan Tepenahuac' },
        { id: 'san-agustin-ohtenco', name: 'San Agustín Ohtenco' },
      ],
    },
  ];

  get availablePueblos(): { id: string; name: string }[] {
    return this.delegaciones.find(d => d.id === this.selectedDelegacion)?.pueblos || [];
  }

  selectDelegacion(id: string): void {
    this.selectedDelegacion = id;
    this.selectedPueblo = '';
  }

  hasBasics(): boolean {
    const hasIdentity = this.fields.every((f) => !!f.value?.trim());
    if (!hasIdentity || !this.categoryId) return false;
    if (this.isOtherCategorySelected) {
      return !!this.otherCategoryName.trim();
    }
    return !!this.subcategoryId;
  }

  hasLocation(): boolean {
    return !!this.ubicacion.trim();
  }

  hasPhotos(): boolean {
    return this.businessPhotos.length > 0;
  }

  hasValidPassword(): boolean {
    return this.password.length >= 8 && this.password === this.passwordRepeat;
  }

  get passwordBlockReason(): string {
    const pass = this.password.trim();
    const repeat = this.passwordRepeat.trim();

    if (!pass || !repeat) {
      return 'No puedes dar siguiente: escribe y confirma tu contraseña.';
    }

    if (pass.length < 8) {
      return 'No puedes dar siguiente: la contraseña debe tener al menos 8 caracteres.';
    }

    if (pass !== repeat) {
      return 'No puedes dar siguiente: las contraseñas no coinciden.';
    }

    return '';
  }

  private getStepIndex(key: StepKey): number {
    return this.steps.findIndex((s) => s.key === key);
  }

  get progressPercent(): number {
    const idx = Math.max(0, this.getStepIndex(this.currentStep));
    return Math.round(((idx + 1) / this.steps.length) * 100);
  }

  get stepNumberLabel(): string {
    const idx = this.getStepIndex(this.currentStep);
    return idx >= 0 ? `${idx + 1} de ${this.steps.length}` : '';
  }

  goToStep(key: StepKey): void {
    this.currentStep = key;
  }

  goNext(): void {
    const idx = this.getStepIndex(this.currentStep);
    if (idx < 0) return;
    const next = this.steps[idx + 1];
    if (!next) return;
    this.currentStep = next.key;
  }

  goBack(): void {
    const idx = this.getStepIndex(this.currentStep);
    if (idx <= 0) return;
    const prev = this.steps[idx - 1];
    this.currentStep = prev.key;
  }

  // Se mantiene por compatibilidad, pero ya no existe paso "fotos".
  // (Fotos vive dentro de "enganche".)
  skipPhotos(): void {
    if (this.currentStep !== 'enganche') return;
    this.goNext();
  }

  get canGoNext(): boolean {
    switch (this.currentStep) {
      case 'enganche':
        return this.hasBasics() && this.hasValidPassword();
      case 'ubicacion':
        return this.hasLocation();
      default:
        return false;
    }
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

  triggerPhotoInput(el: HTMLInputElement): void {
    el.click();
  }

  /** Enlaces cortos o URLs típicas de Google Maps / Google */
  looksLikeMapsUrl(s: string): boolean {
    const t = s.trim().toLowerCase();
    if (/^https?:\/\//i.test(t)) {
      return /maps\.google|google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl|g\.page/i.test(t);
    }
    return (
      /^(maps\.app\.goo\.gl\/|goo\.gl\/maps|g\.page\/)/i.test(t) ||
      /^google\.com\/maps/i.test(t)
    );
  }

  /** Abre Maps en una pestaña nueva para elegir el lugar y luego compartir el enlace. */
  openGoogleMapsExplore(): void {
    window.open('https://www.google.com/maps', '_blank', 'noopener,noreferrer');
  }

  /**
   * Si hay texto que no es enlace: búsqueda en Maps.
   * Si ya pegaste un enlace de Maps: lo abre para revisarlo.
   * Si está vacío: mismo efecto que explorar.
   */
  submit(): void {
    this.submitting.set(true);
    this.submitError.set('');

    const businessName = this.fields[0].value.trim();
    const whatsapp = this.fields[1].value.trim();

    this.auth.registerBusiness({
      name: businessName,
      email: '',
      password: this.password,
      businessName,
      categoryId: this.categoryId,
      subcategoryId: this.isOtherCategorySelected ? this.otherCategoryName.trim() : this.subcategoryId,
      phone: whatsapp,
      address: this.ubicacion.trim(),
      description: this.descripcion.trim(),
    }, whatsapp).subscribe({
      next: () => {
        this.submitting.set(false);
        this.auth.navigateAfterAuth();
      },
      error: (err) => {
        this.submitting.set(false);
        this.submitError.set(err?.error?.error || err?.message || 'Error al registrar');
      },
    });
  }

  openGoogleMapsFromField(): void {
    const raw = this.ubicacion.trim();
    if (!raw) {
      this.openGoogleMapsExplore();
      return;
    }
    if (this.looksLikeMapsUrl(raw)) {
      const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(raw)}`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  constructor() {
    this.loadCategories();
  }

  get availableSubcategories(): CategorySubcategory[] {
    return this.categories.find((c) => c.id === this.categoryId)?.subcategories || [];
  }

  get isOtherCategorySelected(): boolean {
    return this.categoryId === 'otro';
  }

  selectCategory(categoryId: string): void {
    this.categoryId = categoryId;
    if (this.isOtherCategorySelected) {
      this.subcategoryId = '';
      return;
    }
    this.otherCategoryName = '';
    if (!this.availableSubcategories.some((s) => s.id === this.subcategoryId)) {
      this.subcategoryId = '';
    }
  }

  loadCategories(): void {
    this.categoriesError = '';
    this.categoryApi.getCategories(true).subscribe({
      next: (categories) => {
        this.categories = categories || [];
        if (!this.categoryId && this.categories.length > 0) {
          this.categoryId = this.categories[0].id;
        }
      },
      error: () => {
        this.categories = [];
        this.categoryId = '';
        this.subcategoryId = '';
        this.categoriesError = 'No se pudo cargar el catálogo de categorías desde la base de datos.';
      },
    });
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
