import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';

const API = 'http://localhost:8080/api/categories';

export interface CategorySubcategory {
  id: string;
  label: string;
  emoji: string;
}

export interface CategoryData {
  id: string;
  label: string;
  emoji: string;
  color: string;
  bg: string;
  subcategories?: CategorySubcategory[];
}

export interface CreateCategoryPayload {
  id: string;
  label: string;
  emoji?: string;
  color?: string;
  bg?: string;
  subcategories?: CategorySubcategory[];
}

@Injectable({ providedIn: 'root' })
export class CategoryApiService {
  private readonly http = inject(HttpClient);
  private categoriesCache$?: Observable<CategoryData[]>;

  getCategories(refresh = false): Observable<CategoryData[]> {
    if (!this.categoriesCache$ || refresh) {
      this.categoriesCache$ = this.http.get<CategoryData[]>(API).pipe(
        catchError((err) => {
          this.categoriesCache$ = undefined;
          return throwError(() => err);
        }),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }
    return this.categoriesCache$;
  }

  createCategory(payload: CreateCategoryPayload): Observable<CategoryData> {
    return this.http.post<CategoryData>(API, payload);
  }

  addSubcategory(categoryId: string, subcategory: CategorySubcategory): Observable<CategoryData> {
    return this.http.post<CategoryData>(`${API}/${categoryId}/subcategories`, subcategory);
  }

  updateSubcategory(categoryId: string, subcategoryId: string, subcategory: CategorySubcategory): Observable<CategoryData> {
    return this.http.patch<CategoryData>(`${API}/${categoryId}/subcategories/${subcategoryId}`, subcategory);
  }
}
