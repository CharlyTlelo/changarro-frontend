import { Component } from '@angular/core';
import { TabBar } from '../../shared/components/tab-bar/tab-bar';
import { SELLOS, RECOMPENSAS } from '../../shared/data/mock-data';

@Component({
  selector: 'app-recompensas',
  standalone: true,
  imports: [TabBar],
  templateUrl: './recompensas.html',
  styleUrl: './recompensas.scss',
})
export class Recompensas {
  sellos = SELLOS;
  recompensas = RECOMPENSAS;
  sellosGot = SELLOS.filter(s => s.got).length;
}
