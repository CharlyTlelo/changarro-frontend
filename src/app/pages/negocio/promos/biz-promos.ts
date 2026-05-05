import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Promo {
  title: string;
  label: string;
  validUntil: string;
  note: string;
  bonusCoins: number;
}

@Component({
  selector: 'app-biz-promos',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './biz-promos.html',
  styleUrl: './biz-promos.scss',
})
export class BizPromos {
  activePromo = signal<Promo | null>({
    title: '2x1 al pastor',
    label: '2x1',
    validUntil: 'HOY HASTA 11PM',
    note: 'Menciona Changarro al pedir',
    bonusCoins: 50,
  });

  promoHistory = [
    { title: '−20% en gringas', when: 'Mar 28 – Abr 3', redeemed: 34 },
    { title: '3x2 en tacos', when: 'Mar 14 – Mar 20', redeemed: 67 },
    { title: 'Agua gratis con 3+ tacos', when: 'Feb 28 – Mar 6', redeemed: 89 },
  ];

  saving = signal(false);
  editing = signal(false);

  title = '2x1 al pastor';
  label = '2x1';
  validUntil = 'HOY HASTA 11PM';
  note = 'Menciona Changarro al pedir';
  bonusCoins = 50;

  startEditing() {
    const p = this.activePromo();
    if (p) {
      this.title = p.title;
      this.label = p.label;
      this.validUntil = p.validUntil;
      this.note = p.note;
      this.bonusCoins = p.bonusCoins;
    }
    this.editing.set(true);
  }

  cancel() {
    this.editing.set(false);
  }

  save() {
    this.saving.set(true);
    setTimeout(() => {
      this.activePromo.set({
        title: this.title,
        label: this.label,
        validUntil: this.validUntil,
        note: this.note,
        bonusCoins: this.bonusCoins,
      });
      this.editing.set(false);
      this.saving.set(false);
    }, 600);
  }

  deletePromo() {
    this.activePromo.set(null);
    this.editing.set(false);
    this.title = '';
    this.label = '';
    this.validUntil = '';
    this.note = '';
    this.bonusCoins = 0;
  }
}
