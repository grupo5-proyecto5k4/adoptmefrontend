import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

var greenIcon = Leaflet.icon({
  iconUrl: 'assets/images/leaflet/marker-icon.png',
  iconSize:     [25, 41], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [7.5, 30], // point of the icon which will correspond to marker's location
  shadowAnchor: [12.5, 41],  // the same for the shadow
  popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
});

var locations = [
  ["LOCATION_1", -31.41666919552361, -64.1879917385005],
]

var planes = [
  ["Veterinaria Martinez",-40.99497,174.50808],
  ["Veterinaria Martinez<br><a href='www.google.com'>Google</a>",-41.30269,173.63696],
  ["7C6CA1",-41.49413,173.5421]
  ];
@Component({
  selector: 'app-leaftlet-path',
  templateUrl: './leaftlet-path.component.html',
  styleUrls: ['./leaftlet-path.component.scss']
})
export class LeaftletPathComponent implements OnInit, OnDestroy {
  title = 'leafletApps';
  map: Leaflet.Map;

  ngOnInit(): void {
    this.map = Leaflet.map('map').setView([-41.3058, 174.82082], 8);


    Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWlsaW1vcmUxNjE2IiwiYSI6ImNrcmlpdTRsNDB2aXozMW80MTQwa3YxemwifQ.bzPgST4tdgMA5loxAX-eew'
}).addTo(this.map);

  for (var i = 0; i < planes.length; i++) {
    var marker = new Leaflet.marker([planes[i][1], planes[i][2]]).bindPopup(planes[i][0])
      .addTo(this.map);
  }
    //var marker = Leaflet.marker([-31.41666919552361, -64.1879917385005], {icon: greenIcon}).addTo(this.map).bindPopup('Veterinaria Martinez<br>').openPopup();

    //var marker2 = Leaflet.marker([-31.41666919552362, -64.1879917385001], {icon: greenIcon}).addTo(this.map).bindPopup('Veterinaria Martinez<br>').openPopup();

  }

  ngOnDestroy(): void {
    this.map.remove();
  }

}

