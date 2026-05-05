import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  templateUrl: './admin-usuarios.html',
  styleUrl: './admin-usuarios.scss',
})
export class AdminUsuarios {
  kpis = [
    { label: 'Activos hoy', value: '3,421', delta: '+18%', unit: 'vs ayer', up: true, emoji: '●', color: '#4A8A3A' },
    { label: 'Nuevos esta sem', value: '847', delta: '+12%', unit: 'vs sem ant', up: true, emoji: '🆕', color: '#2B6FA0' },
    { label: 'Embajadores', value: '142', delta: '+8', unit: 'este mes', up: true, emoji: '👑', color: '#F5B92E' },
    { label: 'Cuentas baneadas', value: '34', delta: '2 esta sem', unit: 'acumulado', up: false, emoji: '⊘', color: '#241510' },
  ];

  filters = ['Estado: Todos', 'Nivel: Todos', 'Tipo: Todos', 'Antigüedad'];

  users = [
    { id: 1, name: 'María Hernández', email: 'maria.h@email.com', joined: '12 ene 2026', visits: 142, reviews: 23, level: 'Embajadora', coins: 1240, status: 'activo', emoji: 'M', color: 'linear-gradient(135deg, #F5B92E, #DD4D2A)' },
    { id: 2, name: 'Roberto López', email: 'roberto.l@email.com', joined: '03 feb 2026', visits: 87, reviews: 15, level: 'Explorador', coins: 580, status: 'activo', emoji: 'R', color: '#A8D08B' },
    { id: 3, name: 'Ana Martínez', email: 'ana.m@email.com', joined: '15 mar 2026', visits: 34, reviews: 8, level: 'Vecina', coins: 240, status: 'activo', emoji: 'A', color: '#8FC4DC' },
    { id: 4, name: 'Carlos Rodríguez', email: 'carlos.r@email.com', joined: '28 abr 2026', visits: 12, reviews: 3, level: 'Vecino', coins: 80, status: 'activo', emoji: 'C', color: '#F5A8B8' },
    { id: 5, name: 'Sofía Pérez', email: 'sofia.p@email.com', joined: '08 abr 2026', visits: 56, reviews: 11, level: 'Explorador', coins: 420, status: 'baneado', emoji: 'S', color: '#C99FD9', alerts: 'Ban: spam de reseñas' },
    { id: 6, name: 'Diego Torres', email: 'diego.t@email.com', joined: '22 nov 2025', visits: 234, reviews: 41, level: 'Embajador', coins: 2150, status: 'activo', emoji: 'D', color: 'linear-gradient(135deg, #4A8A3A, #2B6FA0)' },
    { id: 7, name: 'Lupita García', email: 'lupita.g@email.com', joined: '14 dic 2025', visits: 98, reviews: 19, level: 'Explorador', coins: 720, status: 'inactivo', emoji: 'L', color: '#E8B860' },
    { id: 8, name: 'Don Juan Hernández', email: 'donjuan@email.com', joined: '12 ene 2026', visits: 0, reviews: 0, level: 'Comerciante', coins: 0, status: 'comerciante', emoji: 'J', color: '#FFB57A' },
  ];

  statusMap: Record<string, { bg: string; fg: string; label: string }> = {
    activo: { bg: 'rgba(74,138,58,0.14)', fg: '#2D6024', label: '● Activo' },
    inactivo: { bg: 'rgba(36,21,16,0.08)', fg: '#7A6A60', label: '○ Inactivo > 30d' },
    baneado: { bg: 'rgba(221,77,42,0.14)', fg: '#9B3217', label: '⊘ Baneado' },
    comerciante: { bg: 'rgba(245,185,46,0.18)', fg: '#7A5A0F', label: '🏪 Comerciante' },
  };

  getLevelIcon(level: string): string {
    if (level === 'Embajadora' || level === 'Embajador') return '👑';
    if (level === 'Explorador') return '🧭';
    if (level === 'Comerciante') return '🏪';
    return '✨';
  }

  pages = ['1', '2', '3', '4', '…', '3,104'];
}
