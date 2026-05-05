import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro-negocio',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registro-negocio.html',
  styleUrls: ['../registro.scss', './registro-negocio.scss'],
})
export class RegistroNegocio {
  readonly maxPhotos = 6;

  fields = [
    { label: 'Nombre del negocio', placeholder: 'Ej. Taquería la Esquina', icon: '🏪' },
    { label: 'Teléfono', placeholder: 'Ej. 5512345678', icon: '📱', type: 'tel' },
  ];

  ubicacion = '';
  descripcion = '';
  password = '';

  businessPhotos: string[] = [];

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
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
