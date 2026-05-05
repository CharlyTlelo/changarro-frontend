import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-comercios',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-comercios.html',
  styleUrl: './admin-comercios.scss',
})
export class AdminComercios {
  miniStats = [
    { label: 'Activos', value: '1,189', color: '#4A8A3A' },
    { label: 'Pendientes', value: '24', color: '#2B6FA0' },
    { label: 'Sin verificar', value: '47', color: '#F5B92E' },
    { label: 'Reportados', value: '14', color: '#DD4D2A' },
    { label: 'Suspendidos', value: '8', color: '#241510' },
  ];

  filters = ['Estado: Todos', 'Categoría: Todas', 'Zona: CDMX', 'Verificación'];

  rows = [
    { id: 1, name: 'Tacos Don Juan', cat: 'Comida', emoji: '🌮', color: '#FFB57A', owner: 'Juan Hernández', zona: 'Roma Norte', status: 'activo', rating: 4.8, reviews: 234, joined: '12 ene 2026', verif: true },
    { id: 2, name: 'Mercería Lupita', cat: 'Tienda', emoji: '🧵', color: '#A8D08B', owner: 'Lupita García', zona: 'Condesa', status: 'activo', rating: 4.6, reviews: 89, joined: '03 feb 2026', verif: true },
    { id: 3, name: 'Estética Rocío', cat: 'Servicios', emoji: '💇', color: '#8FC4DC', owner: 'Rocío Mendoza', zona: 'Coyoacán', status: 'pendiente', rating: 4.9, reviews: 156, joined: '28 abr 2026', verif: false },
    { id: 4, name: 'Florería Camelia', cat: 'Tienda', emoji: '💐', color: '#F5A8B8', owner: 'María Pérez', zona: 'Roma Norte', status: 'reportado', rating: 5.0, reviews: 67, joined: '15 mar 2026', verif: true, alerts: 4 },
    { id: 5, name: 'Café Avellaneda', cat: 'Comida', emoji: '☕', color: '#C68A52', owner: 'Diego Torres', zona: 'Condesa', status: 'activo', rating: 4.7, reviews: 412, joined: '22 nov 2025', verif: true },
    { id: 6, name: 'Lavandería Express', cat: 'Servicios', emoji: '🧺', color: '#9FCDD9', owner: 'Carmen Ruiz', zona: 'Centro', status: 'sin_verificar', rating: 4.6, reviews: 142, joined: '08 abr 2026', verif: false, alerts: 1 },
    { id: 7, name: 'Disco La Cumbia', cat: 'Entret.', emoji: '💃', color: '#D87FA0', owner: 'Roberto Silva', zona: 'Coyoacán', status: 'suspendido', rating: 4.4, reviews: 78, joined: '14 dic 2025', verif: true },
    { id: 8, name: 'Farmacia 24h', cat: 'Salud', emoji: '💊', color: '#C99FD9', owner: 'Dr. Vega', zona: 'Polanco', status: 'activo', rating: 4.5, reviews: 203, joined: '05 ene 2026', verif: true },
    { id: 9, name: 'Panadería Sol', cat: 'Comida', emoji: '🥖', color: '#E8B860', owner: 'Sol Martínez', zona: 'Roma Norte', status: 'activo', rating: 4.8, reviews: 521, joined: '19 oct 2025', verif: true },
  ];

  statusMap: Record<string, { bg: string; fg: string; label: string }> = {
    activo: { bg: 'rgba(74,138,58,0.14)', fg: '#2D6024', label: '● Activo' },
    pendiente: { bg: 'rgba(43,111,160,0.14)', fg: '#1F4F73', label: '◷ Pendiente' },
    sin_verificar: { bg: 'rgba(245,185,46,0.18)', fg: '#7A5A0F', label: '⚠ Sin verificar' },
    reportado: { bg: 'rgba(221,77,42,0.14)', fg: '#9B3217', label: '🚩 Reportado' },
    suspendido: { bg: 'rgba(36,21,16,0.1)', fg: '#241510', label: '⊘ Suspendido' },
  };

  pages = ['1', '2', '3', '4', '…', '139'];
}
