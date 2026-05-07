import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TabBar } from '../../shared/components/tab-bar/tab-bar';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { BusinessApiService, type BusinessData } from '../../shared/services/business.service';
import { CategoryApiService, type CategoryData } from '../../shared/services/category.service';
import { CATEGORIES, type Business, type Category } from '../../shared/data/mock-data';

type CatalogBusiness = Business & { id: string; subcategoryId?: string };

const CARD_HEIGHTS = [220, 160, 200, 240, 180, 150, 210, 170, 210, 175, 195, 165];

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [TabBar, Sidebar, RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo implements OnInit {
  private readonly businessApi = inject(BusinessApiService);
  private readonly categoryApi = inject(CategoryApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);

  categories: CategoryData[] = [...CATEGORIES];
  allBusinesses: CatalogBusiness[] = [];
  businesses: CatalogBusiness[] = [];
  selectedCategory = '';
  selectedSubcategory = '';
  loading = true;
  error = '';

  // Mobile: 2 columns
  col1: CatalogBusiness[] = [];
  col2: CatalogBusiness[] = [];

  // Tablet: 4 columns
  col1t: CatalogBusiness[] = [];
  col2t: CatalogBusiness[] = [];
  col3t: CatalogBusiness[] = [];
  col4t: CatalogBusiness[] = [];

  ngOnInit(): void {
    this.categoryApi.getCategories().subscribe({
      next: (categories) => {
        if (categories?.length) this.categories = categories;
        this.cdr.detectChanges();
      },
    });

    this.route.queryParamMap.subscribe((params) => {
      this.selectedCategory = (params.get('cat') || '').trim();
      this.selectedSubcategory = (params.get('sub') || '').trim();
      this.applyCategoryFilter();
      this.cdr.detectChanges();
    });
    this.loadBusinesses();
  }

  loadBusinesses(refresh = false): void {
    this.loading = true;
    this.error = '';

    this.businessApi.getBusinesses(refresh).subscribe({
      next: (businesses) => {
        this.allBusinesses = businesses.map((business, index) => this.toCatalogBusiness(business, index));
        this.applyCategoryFilter();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.allBusinesses = [];
        this.businesses = [];
        this.rebuildColumns();
        this.error = 'No pudimos cargar los changarros de MongoDB. Revisa que el backend este encendido.';
        this.cdr.detectChanges();
      },
    });
  }

  private toCatalogBusiness(business: BusinessData, index: number): CatalogBusiness {
    const category = this.getCat(business.categoryId);
    const promo = business.activePromo?.active === false
      ? undefined
      : business.activePromo?.label || business.activePromo?.title || undefined;

    return {
      id: business.id || business._id || business.name,
      name: business.name,
      cat: business.categoryId || category.id,
      tags: business.tags || [],
      tag: business.tag || business.description || business.neighborhood || business.address || '',
      subcategoryId: business.subcategoryId || '',
      rating: business.rating ?? 0,
      reviews: business.reviewCount ?? 0,
      h: CARD_HEIGHTS[index % CARD_HEIGHTS.length],
      promo,
      hot: !!business.trending,
      nuevo: !!business.nuevo,
      color: business.color || category.bg,
      emoji: business.emoji || category.emoji,
    };
  }

  private rebuildColumns(): void {
    this.col1 = this.businesses.filter((_, i) => i % 2 === 0);
    this.col2 = this.businesses.filter((_, i) => i % 2 === 1);
    this.col1t = this.businesses.filter((_, i) => i % 4 === 0);
    this.col2t = this.businesses.filter((_, i) => i % 4 === 1);
    this.col3t = this.businesses.filter((_, i) => i % 4 === 2);
    this.col4t = this.businesses.filter((_, i) => i % 4 === 3);
  }

  private applyCategoryFilter(): void {
    const cat = this.selectedCategory.toLowerCase();
    const sub = this.normalizeText(this.selectedSubcategory);
    let filtered = !cat
      ? [...this.allBusinesses]
      : this.allBusinesses.filter((b) => (b.cat || '').toLowerCase() === cat);

    if (sub) {
      filtered = filtered.filter((b) => {
        const subcategoryId = this.normalizeText(b.subcategoryId || '');
        if (subcategoryId && subcategoryId === sub) return true;
        const tags = (b.tags || []).map((t) => this.normalizeText(t)).join(' ');
        const tag = this.normalizeText(b.tag || '');
        const name = this.normalizeText(b.name || '');
        return tags.includes(sub) || tag.includes(sub) || name.includes(sub);
      });
    }

    this.businesses = filtered;
    this.rebuildColumns();
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

  getCat(id: string): Category {
    return this.categories.find(c => c.id === id) || this.categories.find(c => c.id === 'tienda') || this.categories[0];
  }
}
