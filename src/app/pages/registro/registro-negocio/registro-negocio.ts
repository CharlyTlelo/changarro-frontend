import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type StepKey = 'enganche' | 'ubicacion';

@Component({
  selector: 'app-registro-negocio',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registro-negocio.html',
  styleUrls: ['../registro.scss', './registro-negocio.scss'],
})
export class RegistroNegocio {
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

  businessPhotos: string[] = [];

  hasBasics(): boolean {
    return this.fields.every((f) => !!f.value?.trim());
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
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
