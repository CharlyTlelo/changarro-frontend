import { Routes } from '@angular/router';
import { adminGuard } from './shared/guards/admin.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro-shell/registro-shell').then(m => m.RegistroShell),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'tipo' },
      {
        path: 'tipo',
        loadComponent: () => import('./pages/registro/registro-tipo/registro-tipo').then(m => m.RegistroTipo),
      },
      {
        path: 'usuario',
        loadComponent: () => import('./pages/registro/registro').then(m => m.Registro),
      },
      {
        path: 'negocio',
        loadComponent: () => import('./pages/registro/registro-negocio/registro-negocio').then(m => m.RegistroNegocio),
      },
    ],
  },
  { path: 'bienvenida', loadComponent: () => import('./pages/bienvenida/bienvenida').then(m => m.Bienvenida) },
  { path: 'catalogo', loadComponent: () => import('./pages/catalogo/catalogo').then(m => m.Catalogo) },
  { path: 'detalle', loadComponent: () => import('./pages/detalle/detalle').then(m => m.Detalle) },
  { path: 'recompensas', loadComponent: () => import('./pages/recompensas/recompensas').then(m => m.Recompensas) },
  { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil) },

  // Business dashboard
  {
    path: 'negocio',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/negocio/dashboard/dashboard').then(m => m.BizDashboard),
      },
      {
        path: 'menu',
        loadComponent: () => import('./pages/negocio/menu/biz-menu').then(m => m.BizMenu),
      },
      {
        path: 'promos',
        loadComponent: () => import('./pages/negocio/promos/biz-promos').then(m => m.BizPromos),
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/negocio/perfil-negocio/biz-perfil').then(m => m.BizPerfil),
      },
      {
        path: 'analytics',
        loadComponent: () => import('./pages/negocio/analytics/biz-analytics').then(m => m.BizAnalytics),
      },
    ],
  },

  // Admin platform
  {
    path: 'admin15-changarro',
    loadComponent: () => import('./pages/admin/admin-login/admin-login').then(m => m.AdminLogin),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin-panel/admin-panel').then(m => m.AdminPanel),
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/admin/admin-overview/admin-overview').then(m => m.AdminOverview),
      },
      {
        path: 'comercios',
        loadComponent: () => import('./pages/admin/admin-comercios/admin-comercios').then(m => m.AdminComercios),
      },
      {
        path: 'comercios/detalle',
        loadComponent: () => import('./pages/admin/admin-comercio-detalle/admin-comercio-detalle').then(m => m.AdminComercioDetalle),
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./pages/admin/admin-usuarios/admin-usuarios').then(m => m.AdminUsuarios),
      },
      {
        path: 'moderacion',
        loadComponent: () => import('./pages/admin/admin-moderacion/admin-moderacion').then(m => m.AdminModeracion),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
