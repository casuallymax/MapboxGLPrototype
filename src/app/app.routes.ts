import { Routes } from '@angular/router';
import {MapComponent} from './map/map.component';
import {NavComponent} from './nav/nav.component';

export const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'nav', component: NavComponent }
];
