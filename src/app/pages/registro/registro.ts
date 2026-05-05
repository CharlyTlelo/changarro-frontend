import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  fields = [
    { label: 'Nombre', value: '', placeholder: '¿Cómo te llamas?', icon: '' },
    { label: 'Apellido', value: '', placeholder: '¿Cómo te apellidas?', icon: '' },
    { label: 'Whatsapp', value: '', placeholder: 'tu numero de whats ', icon: '📞' },
    { label: 'Crea una contraseña', value: '', placeholder: 'Mínimo 8 caracteres', icon: '🔒', type: 'password' },
  ];
}
