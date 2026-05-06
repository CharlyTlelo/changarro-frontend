import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-comercio-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-comercio-detalle.html',
  styleUrl: './admin-comercio-detalle.scss',
})
export class AdminComercioDetalle {
  info = [
    { label: 'Dueño', value: 'María Pérez Sánchez' },
    { label: 'Email', value: 'maria.flores@email.com' },
    { label: 'Whatsapp', value: '+52 55 1234 5678' },
    { label: 'Dirección', value: 'Av. Insurgentes 234, Roma Norte' },
    { label: 'RFC', value: 'PESM850612ABC' },
    { label: 'Alta', value: '15 marzo 2026 · hace 51 días' },
    { label: 'Plan', value: 'Premium · vence 15 mar 2027' },
  ];

  reportes = [
    { user: 'Carlos R.', reason: 'Información falsa de horarios', date: 'hace 1d' },
    { user: 'Ana M.', reason: 'Fotos no corresponden al lugar', date: 'hace 2d' },
    { user: 'Roberto L.', reason: 'Precios diferentes a los publicados', date: 'hace 3d' },
    { user: 'Sofía P.', reason: 'Servicio no prestado pese a confirmación', date: 'hace 5d' },
  ];

  metrics = [
    { label: 'Vistas / mes', value: '8,431', delta: '+12%' },
    { label: 'Visitas guiadas', value: '847', delta: '+8%' },
    { label: 'Llamadas', value: '142', delta: '+18%' },
    { label: 'Promos canjeadas', value: '34', delta: '−5%' },
  ];

  tabs = [
    { label: 'Resumen', active: true },
    { label: 'Reportes (4)' },
    { label: 'Reseñas (67)' },
    { label: 'Promociones (3)' },
    { label: 'Documentos' },
    { label: 'Audit log' },
  ];

  timeline = [
    { who: 'Sistema', what: 'Reporte #4 recibido por usuario Sofía P.', when: 'hace 2h', icon: '🚩' },
    { who: 'María Pérez', what: 'Editó horarios de atención', when: 'hace 1d', icon: '✏️' },
    { who: 'Sistema', what: 'Promo "10% en bouquets" expiró automáticamente', when: 'hace 2d', icon: '⏰' },
    { who: 'Alex Ramírez (admin)', what: 'Aprobó verificación de documentos', when: 'hace 1 sem', icon: '✓' },
    { who: 'María Pérez', what: 'Subió 4 fotos nuevas', when: 'hace 2 sem', icon: '📷' },
  ];

  actions = [
    { label: 'Solicitar aclaración al dueño', icon: '✉', sub: 'Enviar mensaje formal', danger: false },
    { label: 'Suspender cuenta 7 días', icon: '⏸', sub: 'Oculta del catálogo', danger: false },
    { label: 'Suspender indefinidamente', icon: '⊘', sub: 'Hasta resolver reportes', danger: false },
    { label: 'Eliminar permanentemente', icon: '🗑', sub: 'Acción irreversible', danger: true },
  ];
}
