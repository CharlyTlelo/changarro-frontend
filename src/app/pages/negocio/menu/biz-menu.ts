import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface MenuItem {
  name: string;
  emoji: string;
  price: string;
  orderCount: number;
  popular?: boolean;
  category: string;
  available: boolean;
  desc?: string;
}

interface Category {
  id: string;
  label: string;
  emoji: string;
}

@Component({
  selector: 'app-biz-menu',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './biz-menu.html',
  styleUrl: './biz-menu.scss',
})
export class BizMenu {
  businessName = signal('Tacos Don Juan');
  businessEmoji = signal('🌮');

  categories: Category[] = [
    { id: 'all', label: 'Todos', emoji: '📋' },
    { id: 'tacos', label: 'Tacos', emoji: '🌮' },
    { id: 'bebidas', label: 'Bebidas', emoji: '🥤' },
    { id: 'extras', label: 'Extras', emoji: '🫓' },
  ];

  activeCategory = signal('all');

  items = signal<MenuItem[]>([
    { name: 'Tacos al Pastor', emoji: '🌮', price: '$25', orderCount: 142, popular: true, category: 'tacos', available: true, desc: 'Cerdo marinado al trompo con piña' },
    { name: 'Suadero', emoji: '🌯', price: '$22', orderCount: 89, category: 'tacos', available: true, desc: 'Carne suave y jugosa a la plancha' },
    { name: 'Campechano', emoji: '🥙', price: '$28', orderCount: 67, category: 'tacos', available: true, desc: 'Mix de longaniza y bistec' },
    { name: 'Quesadillas', emoji: '🫓', price: '$35', orderCount: 45, category: 'extras', available: true, desc: 'Con queso Oaxaca derretido' },
    { name: 'Gringas', emoji: '🧀', price: '$40', orderCount: 38, category: 'extras', available: true, desc: 'Tortilla de harina con pastor y queso' },
    { name: 'Volcanes', emoji: '🌋', price: '$30', orderCount: 29, category: 'extras', available: false, desc: 'Tostada con queso gratinado' },
    { name: 'Agua de horchata', emoji: '🥛', price: '$20', orderCount: 112, category: 'bebidas', available: true, desc: 'Receta de la casa, bien fría' },
    { name: 'Coca-Cola', emoji: '🥤', price: '$25', orderCount: 98, category: 'bebidas', available: true },
  ]);

  filteredItems = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') return this.items();
    return this.items().filter(i => i.category === cat);
  });

  showAdd = signal(false);
  saving = signal(false);
  selectedItem = signal<MenuItem | null>(null);
  newName = '';
  newEmoji = '';
  newPrice = '';
  newDesc = '';
  newCategory = 'tacos';

  get totalOrders(): number {
    return this.items().reduce((sum, i) => sum + i.orderCount, 0);
  }

  get totalRevenue(): string {
    const sum = this.items().reduce((s, i) => {
      const price = parseInt(i.price.replace('$', ''), 10);
      return s + (price * i.orderCount);
    }, 0);
    return '$' + sum.toLocaleString('es-MX');
  }

  get availableCount(): number {
    return this.items().filter(i => i.available).length;
  }

  get maxOrders(): number {
    return Math.max(...this.items().map(i => i.orderCount));
  }

  selectItem(item: MenuItem) {
    this.selectedItem.set(this.selectedItem() === item ? null : item);
  }

  toggleAvailability(item: MenuItem) {
    this.items.update(list =>
      list.map(i => i === item ? { ...i, available: !i.available } : i)
    );
  }

  addItem() {
    if (!this.newName.trim() || !this.newPrice.trim()) return;
    this.items.update(list => [...list, {
      name: this.newName.trim(),
      emoji: this.newEmoji.trim() || '🍽️',
      price: this.newPrice.trim(),
      orderCount: 0,
      category: this.newCategory,
      available: true,
      desc: this.newDesc.trim() || undefined,
    }]);
    this.newName = '';
    this.newEmoji = '';
    this.newPrice = '';
    this.newDesc = '';
    this.newCategory = 'tacos';
    this.showAdd.set(false);
  }

  removeItem(index: number) {
    this.items.update(list => list.filter((_, i) => i !== index));
  }

  save() {
    this.saving.set(true);
    setTimeout(() => this.saving.set(false), 800);
  }
}
