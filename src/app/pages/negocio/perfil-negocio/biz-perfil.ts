import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-biz-perfil',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './biz-perfil.html',
  styleUrl: './biz-perfil.scss',
})
export class BizPerfil {
  saving = signal(false);

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
}
