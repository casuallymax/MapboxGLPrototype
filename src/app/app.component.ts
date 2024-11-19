import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MapComponent} from './map/map.component';
import {NavComponent} from './nav/nav.component';
import {ManagerService} from './service/manager.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{
  title = 'Map';

  constructor(
    private service: ManagerService
  ) {
  }

  @ViewChild(MapComponent) map!: MapComponent;
  ngAfterViewInit() {
    this.service.setMap(this.map)
  }



}
