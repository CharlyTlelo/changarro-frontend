import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-overview',
  standalone: true,
  templateUrl: './admin-overview.html',
  styleUrl: './admin-overview.scss',
})
export class AdminOverview {
  kpis = [
    { label: 'Comercios activos', value: '1,247', delta: '+12', unit: 'esta semana', up: true, emoji: '🏪', color: '#DD4D2A' },
    { label: 'Usuarios totales', value: '24,832', delta: '+847', unit: 'esta semana', up: true, emoji: '👥', color: '#4A8A3A' },
    { label: 'Reseñas / día', value: '312', delta: '+18%', unit: 'vs ayer', up: true, emoji: '⭐', color: '#F5B92E' },
    { label: 'Reportes pendientes', value: '23', delta: 'urgentes', unit: '< 24h SLA', warn: true, emoji: '⚠', color: '#DD4D2A' },
  ];

  categories = [
    { cat: 'Comida', n: 421, pct: 100, color: '#DD4D2A', emoji: '🌮' },
    { cat: 'Tienda', n: 287, pct: 68, color: '#4A8A3A', emoji: '🛍️' },
    { cat: 'Servicios', n: 198, pct: 47, color: '#2B6FA0', emoji: '✂️' },
    { cat: 'Salud', n: 156, pct: 37, color: '#8E4B9F', emoji: '💊' },
    { cat: 'Entretenimiento', n: 124, pct: 29, color: '#E8628E', emoji: '🎵' },
  ];

  alerts = [
    { label: 'Reporte por contenido falso', sub: 'Florería Camelia · reportado 4 veces', time: 'Hace 2h', tag: 'URGENTE', color: '#DD4D2A' },
    { label: 'Verificación pendiente', sub: 'Estética Rocío · INE + comprobante subidos', time: 'Hace 5h', tag: 'NUEVA', color: '#2B6FA0' },
    { label: 'Reseña con lenguaje ofensivo', sub: 'Tacos Don Juan · reportada por dueño', time: 'Hace 1d', tag: 'REVISAR', color: '#F5B92E' },
    { label: 'Comercio sin verificar > 7 días', sub: 'Lavandería Express · sigue activo sin docs', time: 'Hace 8d', tag: 'WARN', color: '#F5B92E' },
  ];

  zonas = [
    { name: 'Roma Norte', count: 89, growth: '+18%' },
    { name: 'Condesa', count: 76, growth: '+12%' },
    { name: 'Coyoacán', count: 68, growth: '+24%' },
    { name: 'Centro Histórico', count: 54, growth: '+8%' },
    { name: 'Polanco', count: 47, growth: '+15%' },
  ];

  chartMetrics = [
    { value: '89.2k', label: 'Visitas a perfiles', color: '#DD4D2A' },
    { value: '3.4k', label: 'Promos canjeadas', color: '#4A8A3A' },
    { value: '1.2k', label: 'Nuevos registros', color: '#F5B92E' },
  ];

  periods = ['7D', '30D', '90D', 'Año'];
  activePeriod = 1;
}
