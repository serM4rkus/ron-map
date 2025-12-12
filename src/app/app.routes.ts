import { Routes } from '@angular/router';
import { GameMapComponent } from './components/game-map/game-map';
import { AboutPageComponent } from './components/about-page/about-page';

export const routes: Routes = [
  {
    path: '',
    component: GameMapComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'map/:route',
    component: GameMapComponent
  }
];
