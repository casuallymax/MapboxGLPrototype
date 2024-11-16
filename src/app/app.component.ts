import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MapComponent} from './map/map.component';
import {NavComponent} from './nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Map';

  layerData: {
    value: number,
    checked: boolean
  }


}
