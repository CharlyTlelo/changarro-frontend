import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: 'registro', loadComponent: () => import('./pages/registro/registro').then(m => m.Registro) },
  { path: 'bienvenida', loadComponent: () => import('./pages/bienvenida/bienvenida').then(m => m.Bienvenida) },
  { path: 'catalogo', loadComponent: () => import('./pages/catalogo/catalogo').then(m => m.Catalogo) },
  { path: 'detalle', loadComponent: () => import('./pages/detalle/detalle').then(m => m.Detalle) },
  { path: 'recompensas', loadComponent: () => import('./pages/recompensas/recompensas').then(m => m.Recompensas) },
  { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil) },
  { path: '**', redirectTo: '' },
];
