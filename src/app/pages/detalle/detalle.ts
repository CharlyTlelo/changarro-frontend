import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { REVIEWS, MENU_ITEMS, type Review } from '../../shared/data/mock-data';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink, Sidebar],
  templateUrl: './detalle.html',
  styleUrl: './detalle.scss',
})
export class Detalle {
  reviews = REVIEWS;
  menuItems = MENU_ITEMS;

  confetti = [
    { c: '#F5B92E', x: 30, y: 80, r: -15 },
    { c: '#4A8A3A', x: 320, y: 100, r: 25 },
    { c: '#E8628E', x: 50, y: 200, r: 10 },
    { c: '#2B6FA0', x: 340, y: 240, r: -20 },
    { c: '#FCF7EC', x: 180, y: 70, r: 5 },
  ];

  confettiTablet = [
    { c: '#F5B92E', x: 30, y: 40, r: -15 },
    { c: '#4A8A3A', x: 380, y: 60, r: 25 },
    { c: '#E8628E', x: 50, y: 280, r: 10 },
    { c: '#FCF7EC', x: 360, y: 290, r: 5 },
    { c: '#2B6FA0', x: 140, y: 320, r: 20 },
  ];

  infoRows = [
    { icon: '&#x25f7;', title: 'Lun-Dom &middot; 12:00 - 23:00', sub: 'Abierto ahora &middot; cierra en 4h', green: true },
    { icon: '&#x2706;', title: '55 1234 5678', sub: 'Pedidos por telefono', green: false },
    { icon: '&#x25ce;', title: 'Av. Alvaro Obregon 145', sub: 'Roma Norte &middot; CDMX', green: false },
    { icon: '&#x0040;', title: '&#x0040;tacosdonjuan', sub: 'Instagram &middot; 12.4k seguidores', green: false },
    { icon: '&#x0024;', title: 'Solo efectivo', sub: 'No acepta tarjeta', green: false },
  ];

  similarBiz = [
    { name: 'Taqueria El Califa', emoji: '🌮', detail: '320m &middot; 4.7', color: '#FFB57A' },
    { name: 'Birria Don Beto', emoji: '🍲', detail: '450m &middot; 4.6', color: '#C68A52' },
  ];

  stars(n: number): string {
    return '★'.repeat(n);
  }
}
