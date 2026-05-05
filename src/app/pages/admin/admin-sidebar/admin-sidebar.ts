import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  dot?: string;
  count?: string;
  badge?: string;
  urgent?: number;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.scss',
})
export class AdminSidebar {
  active = input<string>('overview');

  sections: SidebarSection[] = [
    {
      title: 'PLATAFORMA',
      items: [
        { id: 'overview', label: 'Vista general', icon: '◉', route: '/admin' },
        { id: 'health', label: 'Salud del sistema', icon: '♥', dot: 'green', route: '/admin' },
      ],
    },
    {
      title: 'GESTIÓN',
      items: [
        { id: 'comercios', label: 'Comercios', icon: '🏪', count: '1,247', badge: '12 nuevos', route: '/admin/comercios' },
        { id: 'usuarios', label: 'Usuarios', icon: '👥', count: '24.8k', route: '/admin/usuarios' },
        { id: 'admins', label: 'Equipo / staff', icon: '🛡️', count: '8', route: '/admin' },
      ],
    },
    {
      title: 'MODERACIÓN',
      items: [
        { id: 'reportes', label: 'Reportes', icon: '⚠', urgent: 23, route: '/admin/moderacion' },
        { id: 'resenas', label: 'Reseñas flag', icon: '🚩', count: '14', route: '/admin' },
        { id: 'verificacion', label: 'Verificación', icon: '✓', count: '47', route: '/admin' },
      ],
    },
    {
      title: 'OPERACIÓN',
      items: [
        { id: 'finanzas', label: 'Finanzas', icon: '$', route: '/admin' },
        { id: 'campanas', label: 'Campañas', icon: '📣', route: '/admin' },
        { id: 'logs', label: 'Audit log', icon: '◷', route: '/admin' },
        { id: 'config', label: 'Configuración', icon: '⚙', route: '/admin' },
      ],
    },
  ];
}
