import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';

export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  profilePhotoUrl?: string;
  avatarEmoji?: string;
  role?: string;
  coins: number;
  level: number;
  levelName: string;
  createdAt?: string;
  xp?: number;
  visitedCount?: number;
  favoriteCount?: number;
  reviewCount?: number;
  stampCount?: number;
  stampIds?: string[];
  favoriteIds?: string[];
  visitedIds?: string[];
}

export interface UpdateUserProfilePayload {
  name?: string;
  phone?: string;
  whatsapp?: string;
  profilePhotoUrl?: string;
}

export interface UserStat {
  v: string;
  l: string;
  emoji: string;
}

export interface UserStamp {
  id: string;
  label: string;
  emoji: string;
  color: string;
  got: boolean;
  requirement?: string;
}

export interface UserActivity {
  id: string;
  emoji: string;
  text: string;
  when: string;
  coins: string;
}

export interface UserCollectionItem {
  id: string;
  e: string;
  c: string;
  n: string;
}

const API = 'http://localhost:8080/api/users';

@Injectable({ providedIn: 'root' })
export class UserProfileApiService {
  private readonly http = inject(HttpClient);

  getMyProfile() {
    return this.http.get<UserProfileData>(`${API}/me`);
  }

  updateMyProfile(payload: UpdateUserProfilePayload) {
    return this.http.patch<UserProfileData>(`${API}/me`, payload);
  }

  getMyStats() {
    return this.http.get<UserStat[]>(`${API}/me/stats`);
  }

  getMyStamps() {
    return this.http.get<UserStamp[]>(`${API}/me/stamps`).pipe(
      catchError(() =>
        this.http.get<Array<Omit<UserStamp, 'got'> & { got?: boolean }>>(`${API}/stamps`).pipe(
          map(stamps => stamps.map(stamp => ({ ...stamp, got: !!stamp.got })))
        )
      )
    );
  }

  getMyActivity() {
    return this.http.get<UserActivity[]>(`${API}/me/activity`);
  }

  getMyCollection() {
    return this.http.get<UserCollectionItem[]>(`${API}/me/collection`);
  }
}
