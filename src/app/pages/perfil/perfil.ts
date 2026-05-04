import { Component } from '@angular/core';
import { TabBar } from '../../shared/components/tab-bar/tab-bar';
import { COLLECTION } from '../../shared/data/mock-data';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [TabBar],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {
  collection = COLLECTION;

  stats = [
    { v: '47', l: 'Visitados', emoji: '🚶' },
    { v: '13', l: 'Favoritos', emoji: '♥' },
    { v: '21', l: 'Reseñas',   emoji: '✍️' },
    { v: '4',  l: 'Sellos',    emoji: '🏆' },
  ];

  tabs = ['Mi colección', 'Reseñas', 'Listas'];
  activeTab = 'Mi colección';
}
