import { Component } from '@angular/core';
import { TabBar } from '../../shared/components/tab-bar/tab-bar';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { SELLOS, RECOMPENSAS } from '../../shared/data/mock-data';

@Component({
  selector: 'app-recompensas',
  standalone: true,
  imports: [TabBar, Sidebar],
  templateUrl: './recompensas.html',
  styleUrl: './recompensas.scss',
})
export class Recompensas {
  sellos = SELLOS;
  recompensas = RECOMPENSAS;
  sellosGot = SELLOS.filter(s => s.got).length;

  // Extra rewards for tablet
  extraRecompensas = [
    { name: '2x1 en Tacos Don Juan',    cost: 600,  emoji: '🌮', color: '#DD4D2A', sold: '31 canjeados' },
    { name: 'Corte gratis en Rocío',     cost: 1000, emoji: '💇', color: '#8FC4DC', sold: '8 canjeados' },
    { name: 'Ramo en Florería Camelia',  cost: 500,  emoji: '💐', color: '#F5A8B8', sold: '15 canjeados' },
  ];

  // Ways to earn coins
  earnMethods = [
    { emoji: '🚶', label: 'Visita un changarro',     coins: '+20',  desc: 'Haz check-in al llegar' },
    { emoji: '✍️', label: 'Escribe una reseña',       coins: '+50',  desc: 'Mínimo 20 caracteres' },
    { emoji: '📸', label: 'Sube fotos a tu reseña',   coins: '+30',  desc: 'Máximo 5 fotos' },
    { emoji: '🏆', label: 'Completa un sello',        coins: '+100', desc: 'Cumple el reto del sello' },
    { emoji: '👥', label: 'Invita un amigo',           coins: '+200', desc: 'Cuando se registre' },
    { emoji: '🔥', label: 'Racha de 7 días',          coins: '+150', desc: 'Visita 7 días seguidos' },
  ];

  // Leaderboard
  leaderboard = [
    { pos: 1, name: 'María H.',   emoji: '👑', coins: 1240, level: 'Embajadora' },
    { pos: 2, name: 'Roberto L.', emoji: '🧭', coins: 980,  level: 'Vecino' },
    { pos: 3, name: 'Ana C.',     emoji: '🌟', coins: 870,  level: 'Vecina' },
    { pos: 4, name: 'Carlos M.',  emoji: '🔥', coins: 650,  level: 'Explorador' },
    { pos: 5, name: 'Lupita R.',  emoji: '💫', coins: 520,  level: 'Exploradora' },
  ];
}
