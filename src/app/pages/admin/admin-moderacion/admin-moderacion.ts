import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-moderacion',
  standalone: true,
  templateUrl: './admin-moderacion.html',
  styleUrl: './admin-moderacion.scss',
})
export class AdminModeracion {
  tabs = [
    { label: 'Urgentes', count: 7, color: '#DD4D2A', active: true },
    { label: 'Hoy', count: 12, color: '#F5B92E', active: false },
    { label: 'Esta semana', count: 23, color: '', active: false },
    { label: 'Resueltos', count: 314, color: '', active: false },
    { label: 'Archivados', count: 89, color: '', active: false },
  ];

  reportes = [
    { id: '#R-1247', target: 'Florería Camelia', type: 'Comercio', reason: 'Información falsa', who: 'Carlos R.', age: '2h', sev: 'urgent', selected: true },
    { id: '#R-1246', target: 'Tacos Don Juan', type: 'Reseña', reason: 'Lenguaje ofensivo', who: 'Sistema', age: '3h', sev: 'normal', selected: false },
    { id: '#R-1245', target: 'Mercería Lupita', type: 'Comercio', reason: 'Fotos no reales', who: 'Ana M.', age: '5h', sev: 'urgent', selected: false },
    { id: '#R-1244', target: 'Sofía P.', type: 'Usuario', reason: 'Spam de reseñas', who: 'Sistema', age: '1d', sev: 'normal', selected: false },
    { id: '#R-1243', target: 'Disco La Cumbia', type: 'Comercio', reason: 'Cobro indebido', who: 'Roberto L.', age: '1d', sev: 'urgent', selected: false },
    { id: '#R-1242', target: 'Café Avellaneda', type: 'Reseña', reason: 'Reseña falsa', who: 'Diego T.', age: '2d', sev: 'normal', selected: false },
    { id: '#R-1241', target: 'Lavandería Express', type: 'Comercio', reason: 'Servicio no prestado', who: 'María H.', age: '3d', sev: 'urgent', selected: false },
  ];

  actions = [
    { label: 'Desestimar reporte', sub: 'Cerrar sin acción', icon: '✕', danger: false },
    { label: 'Solicitar aclaración', sub: 'Mensaje al dueño', icon: '✉', danger: false },
    { label: 'Suspender 7 días', sub: 'Oculta del catálogo', icon: '⏸', danger: false },
    { label: 'Eliminar comercio', sub: 'Acción irreversible', icon: '🗑', danger: true },
  ];

  selectReport(idx: number) {
    this.reportes.forEach((r, i) => r.selected = i === idx);
  }
}
