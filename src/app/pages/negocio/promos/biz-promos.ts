import { Component, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Promo {
  title: string;
  label: string;
  validUntil: string;
  validUntilAt: string;
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
export class BizPromos implements OnDestroy {
  businessName = signal('Tacos Don Juan');
  businessEmoji = signal('🌮');

  activePromo = signal<Promo | null>({
    title: '2x1 al pastor',
    label: '2x1',
    validUntil: 'HOY HASTA 11PM',
    validUntilAt: '',
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
  validDate = '';
  validTime = '';
  note = 'Menciona Changarro al pedir';
  bonusCoins = 50;
  private expireTimerId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.resetValidityToNow();
    this.syncActivePromoDefaultDeadline();
    this.startExpireWatcher();
  }

  ngOnDestroy(): void {
    if (this.expireTimerId) clearInterval(this.expireTimerId);
  }

  private startExpireWatcher(): void {
    this.expireTimerId = setInterval(() => {
      const promo = this.activePromo();
      if (!promo?.validUntilAt) return;
      const limit = new Date(promo.validUntilAt);
      if (Number.isNaN(limit.getTime())) return;
      if (Date.now() >= limit.getTime()) {
        this.activePromo.set(null);
      }
    }, 30_000);
  }

  private syncActivePromoDefaultDeadline(): void {
    const promo = this.activePromo();
    if (!promo || promo.validUntilAt) return;

    const now = new Date();
    now.setHours(now.getHours() + 2);
    const iso = now.toISOString();
    this.activePromo.set({
      ...promo,
      validUntilAt: iso,
      validUntil: this.formatValidityLabel(now),
    });
  }

  private resetValidityToNow(): void {
    const now = new Date();
    this.validDate = this.toInputDate(now);
    this.validTime = this.toInputTime(now);
  }

  private toInputDate(d: Date): string {
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private toInputTime(d: Date): string {
    const h = `${d.getHours()}`.padStart(2, '0');
    const m = `${d.getMinutes()}`.padStart(2, '0');
    return `${h}:${m}`;
  }

  private buildValidityDate(): Date | null {
    if (!this.validDate || !this.validTime) return null;
    const candidate = new Date(`${this.validDate}T${this.validTime}:00`);
    if (Number.isNaN(candidate.getTime())) return null;
    return candidate;
  }

  private formatValidityLabel(d: Date): string {
    const now = new Date();
    const sameDay =
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate();

    const time = d.toLocaleTimeString('es-MX', { hour: 'numeric', minute: '2-digit' });
    if (sameDay) return `Hoy hasta ${time}`;

    const date = d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
    return `${date} ${time}`;
  }

  startEditing() {
    const p = this.activePromo();
    if (p) {
      this.title = p.title;
      this.label = p.label;
      this.validUntil = p.validUntil;
      if (p.validUntilAt) {
        const d = new Date(p.validUntilAt);
        if (!Number.isNaN(d.getTime())) {
          this.validDate = this.toInputDate(d);
          this.validTime = this.toInputTime(d);
        } else {
          this.resetValidityToNow();
        }
      } else {
        this.resetValidityToNow();
      }
      this.note = p.note;
      this.bonusCoins = p.bonusCoins;
    } else {
      this.resetValidityToNow();
    }
    this.editing.set(true);
  }

  cancel() {
    this.editing.set(false);
  }

  save() {
    const validityDate = this.buildValidityDate();
    if (!validityDate) return;

    this.saving.set(true);
    setTimeout(() => {
      if (Date.now() >= validityDate.getTime()) {
        this.activePromo.set(null);
        this.editing.set(false);
        this.saving.set(false);
        return;
      }

      this.activePromo.set({
        title: this.title,
        label: this.label,
        validUntil: this.formatValidityLabel(validityDate),
        validUntilAt: validityDate.toISOString(),
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
    this.resetValidityToNow();
    this.note = '';
    this.bonusCoins = 0;
  }
}
