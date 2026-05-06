import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CHANGARRO_PROFILE_NAME_DRAFT_KEY } from '../../shared/utils/avatar-placeholder';

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
export class Bienvenida implements OnInit {
  welcomeFirstName = 'María';

  rewards: BienvenidaReward[] = [
    {
      emoji: '🏅',
      label: 'Sello «Recién llegada»',
      sub: 'Tu primer cromo en el pasaporte del barrio',
      color: '#F5B92E',
    },
    {
      emoji: '🎁',
      label: 'Sorpresa de bienvenida',
      sub: 'Te espera en tu primera compra local',
      color: '#E8628E',
      textColor: '#FCF7EC',
    },
    {
      emoji: '⚡',
      label: 'Avance en la fila',
      sub: 'Promos y novedades antes que en otros lados',
      color: '#4A8A3A',
      textColor: '#FCF7EC',
    },
  ];

  ngOnInit(): void {
    const draft = sessionStorage.getItem(CHANGARRO_PROFILE_NAME_DRAFT_KEY)?.trim();
    if (!draft) return;
    const first = draft.split(/\s+/)[0];
    if (!first) return;
    this.welcomeFirstName = first.charAt(0).toLocaleUpperCase('es') + first.slice(1).toLocaleLowerCase('es');
  }
}
