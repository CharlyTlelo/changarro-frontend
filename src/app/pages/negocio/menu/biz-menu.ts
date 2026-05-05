import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface MenuItem {
  name: string;
  emoji: string;
  price: string;
  orderCount: number;
  popular?: boolean;
}

@Component({
  selector: 'app-biz-menu',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './biz-menu.html',
  styleUrl: './biz-menu.scss',
})
export class BizMenu {
  items = signal<MenuItem[]>([
    { name: 'Tacos al Pastor', emoji: '🌮', price: '$25', orderCount: 142, popular: true },
    { name: 'Suadero', emoji: '🌯', price: '$22', orderCount: 89 },
    { name: 'Campechano', emoji: '🥙', price: '$28', orderCount: 67 },
    { name: 'Quesadillas', emoji: '🫓', price: '$35', orderCount: 45 },
    { name: 'Gringas', emoji: '🧀', price: '$40', orderCount: 38 },
    { name: 'Volcanes', emoji: '🌋', price: '$30', orderCount: 29 },
    { name: 'Agua de horchata', emoji: '🥛', price: '$20', orderCount: 112 },
    { name: 'Coca-Cola', emoji: '🥤', price: '$25', orderCount: 98 },
  ]);

  showAdd = signal(false);
  saving = signal(false);
  newName = '';
  newEmoji = '';
  newPrice = '';

  get totalOrders(): number {
    return this.items().reduce((sum, i) => sum + i.orderCount, 0);
  }

  addItem() {
    if (!this.newName.trim() || !this.newPrice.trim()) return;
    this.items.update(list => [...list, {
      name: this.newName.trim(),
      emoji: this.newEmoji.trim() || '🍽️',
      price: this.newPrice.trim(),
      orderCount: 0,
    }]);
    this.newName = '';
    this.newEmoji = '';
    this.newPrice = '';
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
