import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TabBar } from '../../shared/components/tab-bar/tab-bar';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { CATEGORIES, BUSINESSES, type Business, type Category } from '../../shared/data/mock-data';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [TabBar, Sidebar, RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo {
  categories = CATEGORIES;
  businesses = BUSINESSES;

  // Mobile: 2 columns
  col1 = BUSINESSES.filter((_, i) => i % 2 === 0);
  col2 = BUSINESSES.filter((_, i) => i % 2 === 1);

  // Tablet: 4 columns
  col1t = BUSINESSES.filter((_, i) => i % 4 === 0);
  col2t = BUSINESSES.filter((_, i) => i % 4 === 1);
  col3t = BUSINESSES.filter((_, i) => i % 4 === 2);
  col4t = BUSINESSES.filter((_, i) => i % 4 === 3);

  getCat(id: string): Category {
    return CATEGORIES.find(c => c.id === id)!;
  }
}
