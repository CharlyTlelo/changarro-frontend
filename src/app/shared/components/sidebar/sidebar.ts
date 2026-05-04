import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIES } from '../../data/mock-data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <aside class="sidebar">
      <!-- Logo -->
      <div class="logo-row">
        <svg width="34" height="34" viewBox="0 0 32 32">
          <path d="M4 12 Q8 8 12 12 Q16 8 20 12 Q24 8 28 12 L28 14 L4 14 Z" fill="#241510"/>
          <rect x="6" y="14" width="20" height="14" stroke="#241510" stroke-width="2" fill="none"/>
          <path d="M13 28 L13 20 L19 20 L19 28" stroke="#241510" stroke-width="2" fill="none"/>
          <circle cx="26" cy="6" r="3" fill="#DD4D2A"/>
        </svg>
        <span class="cv2-serif logo-text">changarro</span>
      </div>

      <!-- Nav items -->
      @for (n of navItems; track n.id) {
        <a [routerLink]="n.route" class="nav-item" [class.active]="active() === n.id">
          <span class="nav-icon">{{ n.icon }}</span>
          <span class="nav-label">{{ n.label }}</span>
          @if (n.count) {
            <span class="nav-count">{{ n.count }}</span>
          }
          @if (n.badge) {
            <span class="nav-badge">{{ n.badge }}</span>
          }
        </a>
      }

      <!-- Divider -->
      <div class="divider"></div>
      <div class="cat-heading">CATEGORIAS</div>

      <!-- Categories -->
      @for (c of categories; track c.id) {
        <div class="cat-item">
          <div class="cat-icon" [style.background]="c.bg">{{ c.emoji }}</div>
          <span class="cat-label">{{ c.label }}</span>
          <span class="cat-count">{{ getCatCount(c.id) }}</span>
        </div>
      }

      <div class="spacer"></div>

      <!-- User mini profile -->
      <div class="user-card">
        <div class="user-avatar cv2-serif">M</div>
        <div class="user-info">
          <div class="user-name">Maria Hernandez</div>
          <div class="user-level">&#x1f451; Lvl 4 &middot; 1,240 &#x1fa99;</div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      display: flex;
      flex-direction: column;
      padding: 20px 16px;
      gap: 4px;
      flex-shrink: 0;
      border-right: 1px solid rgba(36,21,16,0.08);
      overflow-y: auto;
    }

    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 22px;
      padding: 0 8px;
    }

    .logo-text {
      font-size: 24px;
      line-height: 1;
      letter-spacing: -0.01em;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 12px;
      background: transparent;
      color: var(--ink-2);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.15s, color 0.15s;
    }

    .nav-item.active {
      background: var(--ink);
      color: var(--maiz);
    }

    .nav-icon { font-size: 18px; width: 22px; text-align: center; }
    .nav-label { flex: 1; }
    .nav-count { font-size: 11px; opacity: 0.7; }
    .nav-badge {
      font-size: 10px;
      padding: 2px 7px;
      background: var(--maiz);
      color: var(--ink);
      border-radius: 999px;
      font-weight: 700;
    }

    .divider {
      height: 1px;
      background: rgba(36,21,16,0.08);
      margin: 14px 12px;
    }

    .cat-heading {
      font-size: 10px;
      font-weight: 700;
      color: var(--ink-3);
      letter-spacing: 0.12em;
      padding: 4px 12px 6px;
    }

    .cat-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 12px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      color: var(--ink-2);
      cursor: pointer;
    }

    .cat-icon {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }

    .cat-label { flex: 1; }
    .cat-count { font-size: 11px; color: var(--ink-3); }

    .spacer { flex: 1; }

    .user-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 12px;
      background: #FCF7EC;
      border: 1px solid rgba(36,21,16,0.08);
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #F5B92E, #DD4D2A);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      color: var(--ink);
      flex-shrink: 0;
    }

    .user-info { flex: 1; min-width: 0; }
    .user-name { font-size: 13px; font-weight: 700; line-height: 1.1; }
    .user-level { font-size: 10px; color: var(--ink-3); margin-top: 2px; }
  `]
})
export class Sidebar {
  active = input<string>('cat');
  categories = CATEGORIES;

  navItems = [
    { id: 'cat', label: 'Catalogo', icon: '⊞', route: '/catalogo' },
    { id: 'buscar', label: 'Buscar', icon: '⌕', route: '/catalogo' },
    { id: 'fav', label: 'Favoritos', icon: '♡', count: 13, route: '/catalogo' },
    { id: 'rec', label: 'Recompensas', icon: '★', badge: '+340', route: '/recompensas' },
  ];

  getCatCount(id: string): string {
    const counts: Record<string, string> = {
      comida: '48', tienda: '32', servicios: '21', entrete: '14', salud: '18',
    };
    return counts[id] || '0';
  }
}
