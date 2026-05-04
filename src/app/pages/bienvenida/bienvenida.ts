import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bienvenida.html',
  styleUrl: './bienvenida.scss',
})
export class Bienvenida {
  rewards = [
    { emoji: '$', label: '+100 monedas', sub: 'Para canjear en tu primera promo', isCoin: true },
    { emoji: '🏅', label: 'Sello "Recién llegada"', sub: 'Tu primer cromo del pasaporte', color: '#F5B92E' },
    { emoji: '🎟️', label: 'Cupón: 1er taco gratis', sub: 'Válido en cualquier changarro afiliado', color: '#FCF7EC', textColor: 'var(--terracota)' },
  ];
}
