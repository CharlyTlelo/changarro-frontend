import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-biz-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class BizDashboard {
  userName = signal('Don Juan');
  businessName = signal('Tacos Don Juan');
  businessEmoji = signal('🌮');

  stats = [
    { value: '1,247', label: 'Visitas', icon: '🚶', trend: '+12%', color: '#DD4D2A' },
    { value: '234', label: 'Reseñas', icon: '✍️', trend: '+8', color: '#4A8A3A' },
    { value: '4.8', label: 'Rating', icon: '⭐', trend: '', color: '#F5B92E' },
    { value: '3,891', label: 'Pedidos', icon: '📦', trend: '+340', color: '#2B6FA0' },
  ];

  quickActions = [
    { route: '/negocio/menu', emoji: '🍽️', title: 'Editar menú', desc: '8 productos activos', bg: '#FFE0C2' },
    { route: '/negocio/promos', emoji: '🎟️', title: 'Promociones', desc: '2x1 al pastor · HOY', bg: '#FFF3D0' },
    { route: '/negocio/perfil', emoji: '⚙️', title: 'Datos del negocio', desc: 'Horario, contacto, fotos', bg: '#D4ECC2' },
    { route: '/negocio/analytics', emoji: '📊', title: 'Analytics', desc: 'Visitas, tendencias, métricas', bg: '#C2E0EC' },
  ];

  recentReviews = [
    { name: 'María G.', emoji: '👑', level: 'Embajadora', rating: 5, text: 'Los mejores del barrio, neta. Don Juan siempre con la mejor onda y las salsas de la casa son top.', when: 'hace 3 días' },
    { name: 'Roberto L.', emoji: '🧭', level: 'Explorador', rating: 4, text: 'Sabor auténtico al carbón. Llega temprano porque se llena rapidísimo el martes.', when: 'hace 1 sem' },
    { name: 'Ana P.', emoji: '🌟', level: 'Vecina', rating: 5, text: 'El campechano es una obra de arte. Las tortillas hechas a mano se notan.', when: 'hace 2 sem' },
  ];

  topProducts = [
    { name: 'Pastor', emoji: '🌮', orders: 142, pct: 100 },
    { name: 'Suadero', emoji: '🌯', orders: 89, pct: 63 },
    { name: 'Campechano', emoji: '🥙', orders: 67, pct: 47 },
  ];

  activity = [
    { emoji: '🌮', text: 'Nueva visita registrada', when: 'Hace 2h', coins: '+20' },
    { emoji: '⭐', text: 'Reseña de 5 estrellas', when: 'Hace 5h', coins: '+50' },
    { emoji: '🎟️', text: 'Promo canjeada (2x1)', when: 'Hace 1 día', coins: '' },
    { emoji: '📦', text: '12 pedidos hoy', when: 'Hoy', coins: '' },
  ];

  stars(n: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i < n ? 1 : 0);
  }
}
