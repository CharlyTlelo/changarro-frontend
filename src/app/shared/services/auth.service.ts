import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export interface AuthResponse {
  token: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  businessId: string | null;
  coins: number;
  level: number;
  levelName: string;
}

export interface RegisterBusinessPayload {
  name: string;
  email?: string;
  whatsapp?: string;
  password: string;
  businessName: string;
  categoryId?: string;
  subcategoryId?: string;
  phone?: string;
  address?: string;
  description?: string;
}

const API = 'http://localhost:8080/api/auth';
const STORAGE_KEY = 'changarro_auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private _user = signal<AuthResponse | null>(this.loadFromStorage());

  user = this._user.asReadonly();
  isLoggedIn = computed(() => !!this._user());
  isBusiness = computed(() => this._user()?.role === 'BUSINESS');
  isAdmin = computed(() => this._user()?.role === 'ADMIN');
  token = computed(() => this._user()?.token ?? null);

  private loadFromStorage(): AuthResponse | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  private persist(auth: AuthResponse) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    this._user.set(auth);
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${API}/login`, { email, password }).pipe(
      tap(res => this.persist(res))
    );
  }

  adminLogin(email: string, password: string) {
    return this.http.post<AuthResponse>(`${API}/admin/login`, { email, password }).pipe(
      tap(res => this.persist(res))
    );
  }

  register(name: string, whatsapp: string, password: string) {
    return this.http.post<AuthResponse>(`${API}/register`, { name, whatsapp, phone: whatsapp, password }).pipe(
      tap(res => this.persist(res))
    );
  }

  registerBusiness(payload: RegisterBusinessPayload, whatsapp?: string) {
    const body: any = { ...payload };
    if (whatsapp) body.whatsapp = whatsapp;
    if (!body.email) delete body.email;
    return this.http.post<AuthResponse>(`${API}/register-business`, body).pipe(
      tap(res => this.persist(res))
    );
  }

  logout() {
    localStorage.removeItem(STORAGE_KEY);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  navigateAfterAuth() {
    const user = this._user();
    if (user?.role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else if (user?.role === 'BUSINESS') {
      this.router.navigate(['/negocio']);
    } else {
      this.router.navigate(['/catalogo']);
    }
  }
}
