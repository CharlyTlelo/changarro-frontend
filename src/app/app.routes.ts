import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
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
    loadComponent: () => import('./pages/negocio/dashboard/dashboard').then(m => m.BizDashboard),
  },
  {
    path: 'negocio/menu',
    loadComponent: () => import('./pages/negocio/menu/biz-menu').then(m => m.BizMenu),
  },
  {
    path: 'negocio/promos',
    loadComponent: () => import('./pages/negocio/promos/biz-promos').then(m => m.BizPromos),
  },
  {
    path: 'negocio/perfil',
    loadComponent: () => import('./pages/negocio/perfil-negocio/biz-perfil').then(m => m.BizPerfil),
  },
  {
    path: 'negocio/analytics',
    loadComponent: () => import('./pages/negocio/analytics/biz-analytics').then(m => m.BizAnalytics),
  },

  { path: '**', redirectTo: '' },
];
