import { Injectable } from '@angular/core';
import {MapComponent} from '../map/map.component';
import {ToggleDefinition} from '../util/types';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private mapComponent?: MapComponent

  constructor(
  ) {}

  setMap(mapComponent: MapComponent) {
    this.mapComponent = mapComponent;
  }

  toggleLayer(data: ToggleDefinition) {
    this.mapComponent?.setLayerVisibility(data)
  }

}
