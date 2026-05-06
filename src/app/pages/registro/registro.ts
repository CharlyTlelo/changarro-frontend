import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  imports: [RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  fields: RegistroField[] = [
    { label: 'Nombre', placeholder: '¿Cómo te llamas?', icon: '' },
    { label: 'Apellido', placeholder: '¿Cómo te apellidas?', icon: '' },
    {
      label: 'WhatsApp',
      placeholder: 'Ej. 5512345678',
      icon: '📱',
      type: 'tel',
      inputmode: 'tel',
      autocomplete: 'tel-national',
    },
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
}
