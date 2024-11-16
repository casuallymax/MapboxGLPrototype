import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../service/api.service';
import {Subscription} from 'rxjs';
import mapboxgl, {LngLatBoundsLike} from 'mapbox-gl';
import {Map as MapboxMap} from 'mapbox-gl'
import gjv from 'geojson-validation';
import {Layers} from '../util/layers';
import {Threebox} from 'threebox-plugin'
import {Colors} from '../util/colors';
import {ThreePreProcessor} from '../util/threePreProcessor';

@Component({
  selector: 'mapComponent',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() toggleLayer: {
    value: number,
    checked: boolean
  };

  private MAPBOX_TOKEN = process.env.MAPBOX_API_KEY
  private MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v11'
  private MAPBOX_TERRAIN = 'mapbox://mapbox.mapbox-terrain-dem-v1'

  private ZOOM_THRESHOLD = 9;

  private geoJsonData: any
  private groupedGeoJsonData?: Map<number, any>
  private subscriptions: Subscription[] = []
  private map: MapboxMap | null = null
  private layers = new Layers();
  private threeProcessor = new ThreePreProcessor();

  private customLayerIDs: string[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    let sub1 = this.apiService.fetchDataJSON().subscribe((x) => {
      this.geoJsonData = x;
      this.groupedGeoJsonData = this.threeProcessor.processData(x);
    })
    this.subscriptions.push(sub1)

    this.map = new mapboxgl.Map({
      accessToken: this.MAPBOX_TOKEN,
      container: 'map',
      style: this.MAPBOX_STYLE,
      center: [10.447683, 51.163361],
      zoom: 1
    });

    this.map.on('style.load', () => {
      this.setMapTerrain();
    });

    const BOUNDS: LngLatBoundsLike = [
      [0.6, 41.22], // [west, south]
      [18, 60.053]  // [east, north]
    ];

    this.map.setMaxBounds(BOUNDS)

    this.map.on('load', () => {
      if (!this.map) {
        console.error('Map ist nicht definiert');
        return;
      }

      this.load2DimMarkers();

      this.load3DimMarkers();

    });

  }

  setMapTerrain() {
    const exaggeration = 4;

    if (!this.map) {
      console.error('Map ist nicht definiert');
      return;
    }

    this.map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': this.MAPBOX_TERRAIN,
      'tileSize': 512,
      'maxzoom': 14
    });

    this.map.setTerrain({
      'source': 'mapbox-dem',
      'exaggeration': exaggeration
    });
  }

  load2DimMarkers() {
    if (!this.map) {
      console.error('Map ist nicht definiert');
      return;
    }

    if (!gjv.valid(this.geoJsonData)) {
      console.error('Fehlerhaftes GeoJSON');
      return;
    }

    this.map.addSource('geoJsonData', {
      type: 'geojson',
      data: this.geoJsonData
    });

    const checkboxArray = this.layers.getCheckBoxArray();
    checkboxArray.forEach((layer) => {
      if (!this.map) {
        console.error('mapBoxMap is not defined');
        return;
      }

      this.map.addLayer({
        id: 'regular-'+layer.id,
        type: 'circle',
        source: 'geoJsonData',
        paint: {
          'circle-radius': 3,
          'circle-color': layer.colors()
        },
        maxzoom: this.ZOOM_THRESHOLD,
        filter: layer.filter
      })

      this.map.setLayoutProperty('regular-'+layer.id, 'visibility', 'visible');
    });
  }

  load3DimMarkers() {
    if (!this.map) {
      console.error('Map ist nicht definiert');
      return;
    }

    const tb = ((window as any).tb = new Threebox(
      this.map,
      this.map.getCanvas().getContext('webgl'),
      {
        defaultLights: true,
        multilayer: true
      }
    ));

    const checkboxArray = this.layers.getCheckBoxArray();
    checkboxArray.forEach((layer) => {
      if (!this.map) {
        console.error('mapBoxMap is not defined');
        return;
      }

      const featuresOnLayer: any[] = this.groupedGeoJsonData?.get(layer.id)

      this.map.addLayer({

        id: 'custom-' + layer.id,
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, gl) {
          featuresOnLayer.forEach((feature) => {
            const point = tb.sphere({
              color: Colors.getColorByLevel(feature.properties.bird_risk),
              radius: 10
            })

            point.setCoords(feature.geometry.coordinates)
            tb.add(point)
          })
        },
        render: function (gl, matrix) {
          tb.update()
        }
      });

      this.customLayerIDs.push('custom-' + layer.id);
      tb.toggleLayer('custom-' + layer.id, true);

    })

    this.map.on("zoom", () => {
      if (!this.map) {
        console.error('Map ist nicht definiert');
        return;
      }

      const zoom = this.map.getZoom();

      if (zoom > this.ZOOM_THRESHOLD) {
        this.customLayerIDs.forEach((layer) => {
          this.map?.setLayoutProperty(layer, 'visibility', 'visible')
        })
      } else {
        this.customLayerIDs.forEach((layer) => {
          this.map?.setLayoutProperty(layer, 'visibility', 'none')
        })
      }
    });
  }

  toggleLayers() {

  }

  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe()
    }

    (window as any).tb.dispose();
  }

}
