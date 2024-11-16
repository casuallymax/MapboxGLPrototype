import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'navComponent',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  @Output() toggleLayers = new EventEmitter<{
    value: number;
    checked: boolean;
  }>();

  checkboxArray = [
    { id: 1, name: '< 1km Höhe', color: 'color-ft-0-1' },
    { id: 2, name: '1km - 2km Höhe', color: 'color-ft-1-2' },
    { id: 3, name: '2km - 3km Höhe', color: 'color-ft-2-3' },
    { id: 4, name: '3km - 4km Höhe', color: 'color-ft-3-4' },
    { id: 5, name: '4km - 5km Höhe', color: 'color-ft-4-5' },
    { id: 6, name: '5km - 6km Höhe', color: 'color-ft-5-6' },
    { id: 7, name: '6km - 8km Höhe', color: 'color-ft-6-7' },
    { id: 8, name: '8km - 10km Höhe', color: 'color-ft-7-8' },
    { id: 9, name: '10km - 12km Höhe', color: 'color-ft-8-9' },
    { id: 10, name: '> 12km Höhe', color: 'color-ft-9-10' },
  ];

  toggleLayer(value: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleLayers.emit({ value, checked });
  }

}/**/
