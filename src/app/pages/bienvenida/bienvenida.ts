import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BienvenidaReward {
  label: string;
  sub: string;
  isCoin?: boolean;
  emoji?: string;
  color?: string;
  textColor?: string;
}

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bienvenida.html',
  styleUrl: './bienvenida.scss',
})
export class Bienvenida {
  rewards: BienvenidaReward[] = [
    { emoji: '🏅', label: 'Sello "Recién llegada"', sub: 'Tu primer cromo del pasaporte', color: '#F5B92E' },
  ];
}
