import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page';
import { GameMapComponent } from './components/game-map/game-map';
import { AboutPageComponent } from './components/about-page/about-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
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
