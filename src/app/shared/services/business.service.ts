import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

const API = 'http://localhost:8080/api/businesses';

export interface MenuItem {
  name: string;
  emoji: string;
  price: string;
  orderCount: number;
}

export interface Promo {
  title: string;
  label: string;
  validUntil: string;
  note: string;
  bonusCoins: number;
  active?: boolean;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime: string;
  openPeriod: 'AM' | 'PM';
  closeTime: string;
  closePeriod: 'AM' | 'PM';
}

export interface PaymentMethods {
  efectivo: boolean;
  tarjetas: boolean;
  transferencia: boolean;
}

export interface BusinessData {
  _id?: string;
  id: string;
  name: string;
  categoryId: string;
  subcategoryId?: string;
  description: string;
  address: string;
  neighborhood: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  paymentMethod: string;
  paymentMethods: PaymentMethods;
  rating: number;
  reviewCount: number;
  visitCount: number;
  emoji: string;
  color: string;
  tags: string[];
  tag: string;
  priceRange: string;
  schedule: string;
  weeklySchedule: Record<string, DaySchedule>;
  activePromo: Promo | null;
  menuItems: MenuItem[];
  trending: boolean;
  nuevo: boolean;
  ownerId: string;
  photos: string[];
}

export interface Analytics {
  businessId: string;
  businessName: string;
  visitCount: number;
  reviewCount: number;
  rating: number;
  menuItemCount: number;
  hasActivePromo: boolean;
  isTrending: boolean;
  totalOrders: number;
  topMenuItem: string | null;
  recentReviews: { id: string; rating: number; text: string; createdAt: string }[];
}

@Injectable({ providedIn: 'root' })
export class BusinessApiService {
  private readonly http = inject(HttpClient);
  private businessesCache$?: Observable<BusinessData[]>;

  getBusinesses(refresh = false) {
    if (!this.businessesCache$ || refresh) {
      this.businessesCache$ = this.http.get<BusinessData[]>(API).pipe(
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }

    return this.businessesCache$;
  }

  getMyBusiness() {
    return this.http.get<BusinessData>(`${API}/mine`);
  }

  updateMyBusiness(updates: Partial<BusinessData>) {
    return this.http.patch<BusinessData>(`${API}/mine`, updates);
  }

  updateMenu(items: MenuItem[]) {
    return this.http.put<BusinessData>(`${API}/mine/menu`, items);
  }

  updatePromo(promo: Promo) {
    return this.http.put<BusinessData>(`${API}/mine/promo`, promo);
  }

  deletePromo() {
    return this.http.delete<BusinessData>(`${API}/mine/promo`);
  }

  getAnalytics() {
    return this.http.get<Analytics>(`${API}/mine/analytics`);
  }
}
