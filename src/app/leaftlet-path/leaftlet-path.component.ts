import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { RecomendacionService } from 'src/services/recomendaciones.service';

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
  ["<strong>Medicina Felina</strong><br>Lopez de Vega 408",-31.382872, -64.179952],
  ["<strong>Clínica Veterinaria Eva Inguerman</strong><br>Av. Colón 6200<br><u>Abierto las 24hs.</u>", -31.394014, -64.262933]
  ];
@Component({
  selector: 'app-leaftlet-path',
  templateUrl: './leaftlet-path.component.html',
  styleUrls: ['./leaftlet-path.component.scss']
})
export class LeaftletPathComponent implements OnInit, OnDestroy {
  title = 'leafletApps';
  map: Leaflet.Map;
  private veterinaria = [];
  private centro_castracion = [];

  private redIcon = Leaflet.icon({
    iconUrl: 'assets/images/leaflet/red-icon.png',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's locatio
    popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor
  });

  private blueIcon = Leaflet.icon({
    iconUrl: 'assets/images/leaflet/blue-icon.png',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's locatio
    popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor
  });

  constructor (private recomendacionService: RecomendacionService){ }

  async ngOnInit() {
    await this.obtenerRecomendacionesVeterinaria();
    await this.obtenerRecomendacionesCentrosCastracion();

    this.renderMap();
  }


  async obtenerRecomendacionesVeterinaria() {
    const r = await this.recomendacionService.getRecomendacionesVeterinaria();

    for (let i = 0; i < r.length; i++) {
      let vete: string;
      vete = "<strong>" + r[i].nombre + "</strong><br>" + r[i].calle + " " + r[i].numero + "";

      if (r[i].sitioWeb !== undefined) {
        vete += "<br><a target='_blank' href='https://" + r[i].sitioWeb + "'>Sitio Web</a>";
      }
      if (r[i].abierto24hs == 1) {
        vete += "<br><u>Abierto las 24hs.</u>";
      }


      const object1 = [
        vete,
        r[i].latitud,
        r[i].longitud,
      ];

      this.veterinaria.push(
        object1
      );

    }
  }

  
  async obtenerRecomendacionesCentrosCastracion() {
    const r = await this.recomendacionService.getRecomendacionesCentrosCastracion();

    for (var i = 0; i < r.length; i++) {
      let vete: string;
      vete = "<strong>" + r[i].nombre + "</strong><br>" + r[i].calle + " " + r[i].numero + "";

      if (r[i].sitioWeb !== undefined) {
        vete += "<br><a target='_blank' href='https://" + r[i].sitioWeb + "'>Sitio Web</a>";
      }
      if (r[i].abierto24hs == 1) {
        vete += "<br><u>Abierto las 24hs.</u>";
      }

      const object1 = [
        vete,
        r[i].latitud,
        r[i].longitud
      ];

      this.centro_castracion.push(
        object1
      );

    }
  }

  async renderMap(){
    
    this.map = Leaflet.map('map').setView([-31.411156, -64.191211], 12);


    Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibWlsaW1vcmUxNjE2IiwiYSI6ImNrcmlpdTRsNDB2aXozMW80MTQwa3YxemwifQ.bzPgST4tdgMA5loxAX-eew'
    }).addTo(this.map);

    for (var i = 0; i < this.veterinaria.length; i++) {
      var marker = new Leaflet.marker([this.veterinaria[i][1], this.veterinaria[i][2]], { icon: this.blueIcon }).bindPopup(this.veterinaria[i][0])
        .addTo(this.map)
    }

    
    for (var i = 0; i < this.centro_castracion.length; i++) {
      var marker = new Leaflet.marker([this.centro_castracion[i][1], this.centro_castracion[i][2]], { icon: this.redIcon }).bindPopup(this.centro_castracion[i][0])
        .addTo(this.map);
    }
  }
  ngOnDestroy(): void {
    this.map.remove();
  }

}

