import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-biz-analytics',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './biz-analytics.html',
  styleUrl: './biz-analytics.scss',
})
export class BizAnalytics {
  businessName = signal('Tacos Don Juan');
  businessEmoji = signal('🌮');
  kpis = [
    { value: '1,247', label: 'Visitas', icon: '🚶', trend: '+12%', trendUp: true },
    { value: '234', label: 'Reseñas', icon: '✍️', trend: '+8', trendUp: true },
    { value: '4.8', label: 'Rating', icon: '⭐', trend: '', trendUp: true },
    { value: '3,891', label: 'Pedidos', icon: '📦', trend: '+340', trendUp: true },
    { value: '190', label: 'Promos canjeadas', icon: '🎟️', trend: '+23', trendUp: true },
    { value: '45', label: 'Favoritos', icon: '♥️', trend: '+5', trendUp: true },
  ];

  topProducts = [
    { name: 'Tacos al Pastor', emoji: '🌮', orders: 142, pct: 100, revenue: '$3,550' },
    { name: 'Agua de horchata', emoji: '🥛', orders: 112, pct: 79, revenue: '$2,240' },
    { name: 'Coca-Cola', emoji: '🥤', orders: 98, pct: 69, revenue: '$2,450' },
    { name: 'Suadero', emoji: '🌯', orders: 89, pct: 63, revenue: '$1,958' },
    { name: 'Campechano', emoji: '🥙', orders: 67, pct: 47, revenue: '$1,876' },
  ];

  weeklyVisits = [
    { day: 'Lun', value: 45, pct: 56 },
    { day: 'Mar', value: 62, pct: 78 },
    { day: 'Mié', value: 38, pct: 48 },
    { day: 'Jue', value: 55, pct: 69 },
    { day: 'Vie', value: 80, pct: 100 },
    { day: 'Sáb', value: 73, pct: 91 },
    { day: 'Dom', value: 52, pct: 65 },
  ];

  ratingBreakdown = [
    { stars: 5, count: 156, pct: 67 },
    { stars: 4, count: 52, pct: 22 },
    { stars: 3, count: 18, pct: 8 },
    { stars: 2, count: 5, pct: 2 },
    { stars: 1, count: 3, pct: 1 },
  ];

  recentReviews = [
    { name: 'María G.', emoji: '👑', rating: 5, text: 'Los mejores del barrio, neta. Las salsas de la casa son top.', when: 'hace 3 días' },
    { name: 'Roberto L.', emoji: '🧭', rating: 4, text: 'Sabor auténtico al carbón. Llega temprano porque se llena.', when: 'hace 1 sem' },
    { name: 'Ana P.', emoji: '🌟', rating: 5, text: 'El campechano es una obra de arte.', when: 'hace 2 sem' },
    { name: 'Carlos M.', emoji: '🎸', rating: 5, text: 'Siempre vengo por las gringas. Las mejores.', when: 'hace 3 sem' },
  ];

  starsArray(n: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i < n ? 1 : 0);
  }
}
