import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

var greenIcon = Leaflet.icon({
  iconUrl: 'assets/images/leaflet/marker-icon.png',
  shadowUrl: 'assets/images/leaflet/marker-icon.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

@Component({
  selector: 'app-leaftlet-path',
  templateUrl: './leaftlet-path.component.html',
  styleUrls: ['./leaftlet-path.component.scss']
})
export class LeaftletPathComponent implements OnInit, OnDestroy {
  title = 'leafletApps';
  map: Leaflet.Map;

  ngOnInit(): void {
    this.map = Leaflet.map('map').setView([-31.411915, -64.193951], 12);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);

    var marker = Leaflet.marker([-31.41666919552361, -64.1879917385005], {icon: greenIcon}).addTo(this.map);

  }

  ngOnDestroy(): void {
    this.map.remove();
  }

}