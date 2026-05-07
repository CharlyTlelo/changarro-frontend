import { Component, OnInit, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CATEGORIES } from '../../data/mock-data';
import { AuthService } from '../../services/auth.service';
import { CategoryApiService, type CategoryData } from '../../services/category.service';
import { BusinessApiService, type BusinessData } from '../../services/business.service';
import { gradientFromName, initialsFromDisplayName } from '../../utils/avatar-placeholder';

interface SubCategory {
  id?: string;
  label: string;
  emoji: string;
  count: number;
}

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

      <!-- Categories with subcategories -->
      <div class="cat-scroll">
        @for (c of categories; track c.id) {
          <div class="cat-group">
            <div class="cat-item" (click)="selectCategory(c.id)" [class.expanded]="expandedCat === c.id" [class.active]="isCategoryActive(c.id)">
              <div class="cat-icon" [style.background]="c.bg">{{ c.emoji }}</div>
              <span class="cat-label">{{ c.label }}</span>
              <span class="cat-count">{{ getCatCount(c.id) }}</span>
              <span class="cat-arrow" [class.open]="expandedCat === c.id">›</span>
            </div>

            @if (expandedCat === c.id) {
              <div class="sub-list">
                @for (sub of getSubcategories(c.id); track sub.label) {
                  <div class="sub-item" (click)="selectSubcategory(c.id, sub, $event)" [class.active]="isSubcategoryActive(c.id, sub)">
                    <span class="sub-emoji">{{ sub.emoji }}</span>
                    <span class="sub-label">{{ sub.label }}</span>
                    <span class="sub-count">{{ sub.count }}</span>
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>

      <div class="spacer"></div>

      <!-- User mini profile -->
      <div class="user-card" routerLink="/perfil">
        <div class="user-avatar cv2-serif" [style.background]="sidebarAvatarGradient()">{{ sidebarInitials() }}</div>
        <div class="user-info">
          <div class="user-name">{{ sidebarDisplayName() }}</div>
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

    .cat-scroll {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }

    .cat-group {
      margin-bottom: 2px;
    }

    .cat-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      color: var(--ink-2);
      cursor: pointer;
      transition: background 0.12s;
    }

    .cat-item:hover {
      background: rgba(36,21,16,0.03);
    }

    .cat-item.expanded {
      background: rgba(36,21,16,0.04);
      font-weight: 600;
      color: var(--ink);
    }

    .cat-item.active {
      background: rgba(221, 77, 42, 0.14);
      border: 1px solid rgba(221, 77, 42, 0.32);
      color: var(--ink);
      font-weight: 700;
    }

    .cat-icon {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
    }

    .cat-label { flex: 1; }
    .cat-count { font-size: 11px; color: var(--ink-3); }

    .cat-arrow {
      font-size: 14px;
      color: var(--ink-3);
      transition: transform 0.2s;
      width: 14px;
      text-align: center;
    }

    .cat-arrow.open {
      transform: rotate(90deg);
      color: var(--ink);
    }

    /* Subcategory list */
    .sub-list {
      padding: 2px 0 6px 0;
      animation: subSlide 0.2s ease both;
    }

    @keyframes subSlide {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .sub-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 5px 12px 5px 22px;
      border-radius: 8px;
      font-size: 12px;
      color: var(--ink-2);
      cursor: pointer;
      transition: background 0.12s, color 0.12s;
    }

    .sub-item:hover {
      background: rgba(36,21,16,0.04);
      color: var(--ink);
    }

    .sub-item.active {
      background: rgba(221, 77, 42, 0.14);
      color: var(--ink);
      font-weight: 700;
      border: 1px solid rgba(221, 77, 42, 0.28);
    }

    .sub-emoji {
      font-size: 13px;
      width: 20px;
      text-align: center;
      flex-shrink: 0;
    }

    .sub-label {
      flex: 1;
      font-weight: 500;
    }

    .sub-count {
      font-size: 10px;
      color: var(--ink-mute);
      font-weight: 600;
    }

    .spacer { flex: 0 0 8px; }

    .user-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 12px;
      background: #FCF7EC;
      border: 1px solid rgba(36,21,16,0.08);
      cursor: pointer;
      flex-shrink: 0;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      color: #fcf7ec;
      flex-shrink: 0;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.22);
      letter-spacing: -0.03em;
    }

    .user-info { flex: 1; min-width: 0; }
    .user-name { font-size: 13px; font-weight: 700; line-height: 1.1; }
    .user-level { font-size: 10px; color: var(--ink-3); margin-top: 2px; }
  `]
})
export class Sidebar implements OnInit {
  readonly auth = inject(AuthService);
  private readonly categoryApi = inject(CategoryApiService);
  private readonly businessApi = inject(BusinessApiService);
  private readonly router = inject(Router);
  active = input<string>('cat');
  categories: CategoryData[] = [...CATEGORIES];
  private businesses: BusinessData[] = [];
  private categoryCounts: Record<string, number> = {};

  sidebarDisplayName(): string {
    return this.auth.user()?.name?.trim() || 'Vecino del barrio';
  }

  sidebarInitials(): string {
    const raw = this.auth.user()?.name?.trim();
    return initialsFromDisplayName(raw || 'Vecino');
  }

  sidebarAvatarGradient(): string {
    const raw = this.auth.user()?.name?.trim();
    return gradientFromName(raw || 'Vecino');
  }

  expandedCat: string | null = null;

  navItems = [
    { id: 'cat', label: 'Catalogo', icon: '⊞', route: '/catalogo' },
    { id: 'fav', label: 'Favoritos', icon: '♡', count: 13, route: '/catalogo' },
    { id: 'rec', label: 'Recompensas', icon: '★', badge: '+340', route: '/recompensas' },
  ];

  private fallbackSubcategories: Record<string, SubCategory[]> = {
    comida: [
      { label: 'Tacos',          emoji: '🌮', count: 12 },
      { label: 'Tortas',         emoji: '🥖', count: 6 },
      { label: 'Pizza',          emoji: '🍕', count: 4 },
      { label: 'Hamburguesas',   emoji: '🍔', count: 3 },
      { label: 'Café',           emoji: '☕', count: 5 },
      { label: 'Panadería',      emoji: '🥐', count: 4 },
      { label: 'Mariscos',       emoji: '🦐', count: 2 },
      { label: 'Comida corrida', emoji: '🍲', count: 6 },
      { label: 'Antojitos',      emoji: '🫔', count: 3 },
      { label: 'Jugos',          emoji: '🧃', count: 3 },
    ],
    tienda: [
      { label: 'Abarrotes',    emoji: '🏪', count: 8 },
      { label: 'Mercería',     emoji: '🧵', count: 3 },
      { label: 'Papelería',    emoji: '📒', count: 4 },
      { label: 'Florería',     emoji: '💐', count: 2 },
      { label: 'Tlapalería',   emoji: '🔧', count: 3 },
      { label: 'Ropa',         emoji: '👕', count: 4 },
      { label: 'Zapatería',    emoji: '👟', count: 2 },
      { label: 'Dulcería',     emoji: '🍬', count: 3 },
      { label: 'Regalos',      emoji: '🎁', count: 2 },
      { label: 'Electrónica',  emoji: '📱', count: 1 },
    ],
    servicios: [
      { label: 'Estética',       emoji: '💇', count: 5 },
      { label: 'Lavandería',     emoji: '🧺', count: 3 },
      { label: 'Cerrajería',     emoji: '🔑', count: 2 },
      { label: 'Taller mecánico',emoji: '🔩', count: 2 },
      { label: 'Plomería',       emoji: '🚿', count: 1 },
      { label: 'Electricista',   emoji: '⚡', count: 2 },
      { label: 'Copias',         emoji: '🖨️', count: 2 },
      { label: 'Costura',        emoji: '🪡', count: 1 },
      { label: 'Veterinaria',    emoji: '🐾', count: 2 },
      { label: 'Cel / Reparación', emoji: '📲', count: 1 },
    ],
    entrete: [
      { label: 'Bar / Cantina',  emoji: '🍺', count: 4 },
      { label: 'Disco / Antro',  emoji: '🪩', count: 2 },
      { label: 'Billar',         emoji: '🎱', count: 1 },
      { label: 'Karaoke',        emoji: '🎤', count: 1 },
      { label: 'Gimnasio',       emoji: '🏋️', count: 2 },
      { label: 'Arcade',         emoji: '🕹️', count: 1 },
      { label: 'Parque',         emoji: '🌳', count: 2 },
      { label: 'Eventos',        emoji: '🎪', count: 1 },
    ],
    salud: [
      { label: 'Farmacia',       emoji: '💊', count: 4 },
      { label: 'Consultorio',    emoji: '🩺', count: 3 },
      { label: 'Dentista',       emoji: '🦷', count: 2 },
      { label: 'Óptica',         emoji: '👓', count: 2 },
      { label: 'Laboratorio',    emoji: '🧪', count: 1 },
      { label: 'Nutriólogo',     emoji: '🥗', count: 1 },
      { label: 'Fisioterapia',   emoji: '🤸', count: 1 },
      { label: 'Psicólogo',      emoji: '🧠', count: 2 },
      { label: 'Herbolaria',     emoji: '🌿', count: 1 },
      { label: 'Naturista',      emoji: '🍃', count: 1 },
    ],
  };

  ngOnInit(): void {
    this.categoryApi.getCategories().subscribe({
      next: (categories) => {
        if (categories?.length) {
          this.categories = categories;
        }
      },
    });

    this.businessApi.getBusinesses().subscribe({
      next: (items) => {
        this.businesses = items || [];
        this.categoryCounts = this.computeCategoryCounts(this.businesses);
      },
      error: () => {
        this.businesses = [];
        this.categoryCounts = {};
      },
    });
  }

  toggleCategory(id: string) {
    this.expandedCat = this.expandedCat === id ? null : id;
  }

  selectCategory(id: string): void {
    const isActive = this.isCategoryActive(id);
    this.toggleCategory(id);
    this.router.navigate(['/catalogo'], {
      queryParams: { cat: isActive ? null : id },
      queryParamsHandling: 'merge',
    });
  }

  isCategoryActive(id: string): boolean {
    const query = this.router.url.split('?')[1] || '';
    const params = new URLSearchParams(query);
    return (params.get('cat') || '').toLowerCase() === id.toLowerCase();
  }

  selectSubcategory(categoryId: string, sub: SubCategory, event: Event): void {
    event.stopPropagation();
    const subValue = this.getSubValue(sub);
    const isActive = this.isSubcategoryActive(categoryId, sub);
    this.router.navigate(['/catalogo'], {
      queryParams: {
        cat: categoryId,
        sub: isActive ? null : subValue,
      },
      queryParamsHandling: 'merge',
    });
  }

  isSubcategoryActive(categoryId: string, sub: SubCategory): boolean {
    const query = this.router.url.split('?')[1] || '';
    const params = new URLSearchParams(query);
    const cat = (params.get('cat') || '').toLowerCase();
    const subQuery = (params.get('sub') || '').toLowerCase();
    return cat === categoryId.toLowerCase() && subQuery === this.getSubValue(sub);
  }

  private slugify(value: string): string {
    return (value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private getSubValue(sub: SubCategory): string {
    if (sub.id && sub.id.trim()) {
      return this.slugify(sub.id);
    }
    return this.slugify(sub.label);
  }

  getSubcategories(id: string): SubCategory[] {
    const fromApi = this.categories.find((c) => c.id === id)?.subcategories || [];
    const subs: SubCategory[] = fromApi.length
      ? fromApi.map((sub) => ({ id: sub.id, label: sub.label, emoji: sub.emoji, count: 0 }))
      : (this.fallbackSubcategories[id] || []);
    if (!this.businesses.length) return subs;

    return subs.map((sub) => ({
      ...sub,
      count: this.countBusinessesForSubcategory(id, sub.id || sub.label),
    }));
  }

  getCatCount(id: string): string {
    if (typeof this.categoryCounts[id] === 'number') {
      return String(this.categoryCounts[id]);
    }

    const subs = this.getSubcategories(id);
    if (subs) {
      return String(subs.reduce((sum, s) => sum + s.count, 0));
    }
    return '0';
  }

  private computeCategoryCounts(items: BusinessData[]): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const item of items) {
      const key = (item.categoryId || '').toLowerCase().trim();
      if (!key) continue;
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }

  private countBusinessesForSubcategory(categoryId: string, subcategoryRef: string): number {
    const target = this.normalizeText(subcategoryRef);
    if (!target) return 0;

    return this.businesses.filter((biz) => {
      if ((biz.categoryId || '').toLowerCase().trim() !== categoryId.toLowerCase().trim()) {
        return false;
      }

      const subcategoryId = this.normalizeText(biz.subcategoryId || '');
      if (subcategoryId && subcategoryId === target) {
        return true;
      }

      const tags = (biz.tags || []).map((t) => this.normalizeText(t)).join(' ');
      const tag = this.normalizeText(biz.tag || '');
      const name = this.normalizeText(biz.name || '');
      const desc = this.normalizeText(biz.description || '');

      return tags.includes(target) || tag.includes(target) || name.includes(target) || desc.includes(target);
    }).length;
  }

  private normalizeText(value: string): string {
    return (value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
