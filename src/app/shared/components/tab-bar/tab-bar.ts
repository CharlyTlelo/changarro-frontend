import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="tabbar">
      @for (item of items; track item.id) {
        <a [routerLink]="item.route" class="tabbar-item" [class.active]="active() === item.id">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            @switch (item.id) {
              @case ('catalogo') {
                <rect x="3" y="3" width="8" height="8" rx="2" [attr.stroke]="active() === item.id ? '#DD4D2A' : '#7A6A60'" stroke-width="2" [attr.fill]="active() === item.id ? '#FBE4D9' : 'none'"/>
                <rect x="13" y="3" width="8" height="8" rx="2" [attr.stroke]="active() === item.id ? '#DD4D2A' : '#7A6A60'" stroke-width="2"/>
                <rect x="3" y="13" width="8" height="8" rx="2" [attr.stroke]="active() === item.id ? '#DD4D2A' : '#7A6A60'" stroke-width="2"/>
                <rect x="13" y="13" width="8" height="8" rx="2" [attr.stroke]="active() === item.id ? '#DD4D2A' : '#7A6A60'" stroke-width="2" [attr.fill]="active() === item.id ? '#FBE4D9' : 'none'"/>
              }
              @case ('buscar') {
                <circle cx="11" cy="11" r="7" [attr.stroke]="active() === item.id ? '#DD4D2A' : '#7A6A60'" stroke-width="2" [attr.fill]="active() === item.id ? '#FBE4D9' : 'none'"/>
                <path d="M20 20l-3.5-3.5" [attr.stroke]="active() === item.id ? '#DD4D2A' : '#7A6A60'" stroke-width="2.4" stroke-linecap="round"/>
              }
              @case ('recompensas') {
                <path d="M12 2l2.5 5 5.5.8-4 4 1 5.5L12 14.8 7 17.3 8 11.8 4 7.8l5.5-.8L12 2z" [attr.stroke]="active() === item.id ? '#DD4D2A' : '#7A6A60'" stroke-width="2" stroke-linejoin="round" [attr.fill]="active() === item.id ? '#F5B92E' : 'none'"/>
              }
              @case ('perfil') {
                <circle cx="12" cy="8" r="4" [attr.stroke]="active() === item.id ? '#DD4D2A' : '#7A6A60'" stroke-width="2" [attr.fill]="active() === item.id ? '#FBE4D9' : 'none'"/>
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" [attr.stroke]="active() === item.id ? '#DD4D2A' : '#7A6A60'" stroke-width="2" stroke-linecap="round"/>
              }
            }
          </svg>
          <span>{{ item.label }}</span>
        </a>
      }
    </nav>
  `,
  styles: [`
    .tabbar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 72px;
      background: rgba(251,244,228,0.92);
      backdrop-filter: blur(20px) saturate(160%);
      -webkit-backdrop-filter: blur(20px) saturate(160%);
      border-top: 1px solid rgba(36,21,16,0.08);
      display: flex;
      align-items: flex-start;
      padding: 10px 8px 0;
      z-index: 100;
    }

    @media (min-width: 768px) {
      .tabbar { display: none; }
    }

    .tabbar-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      font-weight: 700;
      color: var(--ink-3);
      letter-spacing: 0.02em;
      text-decoration: none;
      transition: color 0.15s;
    }

    .tabbar-item.active {
      color: var(--terracota);
    }
  `]
})
export class TabBar {
  active = input<string>('catalogo');

  items = [
    { id: 'catalogo',    label: 'Catálogo',     route: '/catalogo' },
    { id: 'buscar',      label: 'Buscar',       route: '/catalogo' },
    { id: 'recompensas', label: 'Recompensas',  route: '/recompensas' },
    { id: 'perfil',      label: 'Yo',           route: '/perfil' },
  ];
}
