import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

var redIcon = Leaflet.icon({
  iconUrl: 'assets/images/leaflet/red-icon.png',
  iconSize:     [25, 41], // size of the icon
  iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's locatio
  popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
});

var blueIcon = Leaflet.icon({
  iconUrl: 'assets/images/leaflet/blue-icon.png',
  iconSize:     [25, 41], // size of the icon
  iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's locatio
  popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
});

var locations = [
  ["LOCATION_1", -31.41666919552361, -64.1879917385005],
]

var centrosCastracion = [
  ["<strong>Centro de Castración Municipal</strong><br>Dr. Francisco Muñiz 60<br>",-31.407387, -64.209818]
]

var veterinaria = [
  ["<strong>Veterinaria Alem</strong><br>Blvd. San Juan 125<br><a target='_blank' href='https://www.veterinariaalem.com/'>Sitio Web</a>",-31.424622, -64.182666],
  ["<strong>Medicina Felina</strong><br>Lopez de Vega 408",-31.382872, -64.179952]
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
    this.map = Leaflet.map('map').setView([-31.411156, -64.191211], 13);


    Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWlsaW1vcmUxNjE2IiwiYSI6ImNrcmlpdTRsNDB2aXozMW80MTQwa3YxemwifQ.bzPgST4tdgMA5loxAX-eew'
}).addTo(this.map);

  for (var i = 0; i < veterinaria.length; i++) {
    var marker = new Leaflet.marker([veterinaria[i][1], veterinaria[i][2]], {icon: blueIcon}).bindPopup(veterinaria[i][0])
      .addTo(this.map);
  }
  for (var i = 0; i < centrosCastracion.length; i++) {
    var marker = new Leaflet.marker([centrosCastracion[i][1], centrosCastracion[i][2]], {icon: redIcon}).bindPopup(centrosCastracion[i][0])
      .addTo(this.map);
  }
  }

  ngOnDestroy(): void {
    this.map.remove();
  }

}

