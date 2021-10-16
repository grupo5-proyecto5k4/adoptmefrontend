import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { AlertsService } from 'src/utils/alerts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Recomendacion } from 'src/models/IRecomendacion';
import { RecomendacionService } from 'src/services/recomendaciones.service';



@Component({
  selector: 'app-administrar-recomendaciones',
  templateUrl: './administrar-recomendaciones.component.html',
  styleUrls: ['./administrar-recomendaciones.component.scss'],
})


export class AdministrarRecomendacionesComponent implements OnInit, OnDestroy {
  title = 'leafletApps';
  map: Leaflet.Map;
  Titulo = "Administrar recomendaciones";
  SignupForm: FormGroup;
  public pageSize: number = 10;
  public lowValue: number = 0;
  public highValue: number = 10;
  private pageIndex: number = 0;
  private activePageIndex: boolean = false;
  isLoading: Boolean = false;
  private veterinaria = [];
  private centro_castracion = [];
  private vista_previa =[];
  profile: any;
  tiposRecomendacion: string[] = ['Veterinaria', 'Centro de castración'];
  tiposRecomendacionSelected: number = 0;
  abierto24hsSelected: number = 0;
  selectedMarker: any;
  coordenadas: any;

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

  private greenIcon = Leaflet.icon({ //para mostrar direccion a guardar
    iconUrl: 'assets/images/leaflet/green-icon.png',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's locatio
    popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor
  });

  constructor(private dialog: MatDialog, private alertsService: AlertsService, private recomendacionService: RecomendacionService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.profile = this.authService.getProfile();
    if (this.profile == '0') {
      await this.obtenerRecomendacionesVeterinaria();
      await this.obtenerRecomendacionesCentrosCastracion();
      
      this.iniciateForm();

      this.renderMap();
    }
    else {
      window.scrollTo(0, 0);
      this.router.navigate(['/']);
    }


  }

  iniciateForm() {
    this.SignupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
      street: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      altura: new FormControl('', [Validators.required, Validators.pattern('[0-9]{0,4}')]),
      facebook: new FormControl(''),
    });
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
        /*.on('click', function(e) {
          this.coordenadas = e.latlng;
          this.obtenerDatosMarker();
      })
        .on('draw:edited', function (e) {
          this.coordenadas = e.latlng;
          this.obtenerDatosMarker();
    });
      ;*/
    }

    
    for (var i = 0; i < this.centro_castracion.length; i++) {
      var marker = new Leaflet.marker([this.centro_castracion[i][1], this.centro_castracion[i][2]], { icon: this.redIcon }).bindPopup(this.centro_castracion[i][0])
        .addTo(this.map);
    }
  }

  radioTipoChange(value: string) {
    let answer: number;
    switch (value) {
      case this.tiposRecomendacion[0]: { //veterinaria
        answer = 0;
        break;
      }
      case this.tiposRecomendacion[1]: { //centro de castración
        answer = 1;
        break;
      }
    }
    this.tiposRecomendacionSelected = answer;
    if (this.tiposRecomendacionSelected == 1 && this.abierto24hsSelected == 1){
      this.abierto24hsSelected = 0;
    }
    this.ubicarEnMapa();
  }

  async obtenerDatosMarker(){
    this.Titulo = "Modificar recomendación"
    const r = await this.recomendacionService.getTodasRecomendaciones();

    for (var i = 0; i < r.length; i++) {
      if (r[i].latitud == this.coordenadas.latitud && r[i].longitud == this.coordenadas.longitud) {
        this.selectedMarker =  r[i];
        break
      }
    
      if (this.selectedMarker.tipoRecomendacion == 0) {
        document.getElementById("veterinaria").setAttribute('checked', 'checked');
      } else {
        document.getElementById("centro").setAttribute('checked', 'checked');
      }
      
      this.SignupForm.controls.name.setValue = this.selectedMarker.nombre;
      this.SignupForm.controls.facebook.setValue = this.selectedMarker.sitioWeb;
      this.SignupForm.controls.street.setValue = this.selectedMarker.calle;
      this.SignupForm.controls.altura.setValue = this.selectedMarker.altura;


      if (this.selectedMarker.abierto24hs == 1) {
        document.getElementById("abierto24hs").setAttribute('checked', 'checked');
      } else {
        document.getElementById("abierto24hs").removeAttribute('checked');
      }

    }
    console.log("finaliza recomendaciones centros");
  }

  abierto24hsChange() {
    if (this.abierto24hsSelected == 0) {
      this.abierto24hsSelected = 1;
    }
    else {
      this.abierto24hsSelected = 0;
    }

    this.ubicarEnMapa();
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

  async ubicarEnMapa() {
    const ubicacion = await this.recomendacionService.buscarCoordenadas(this.SignupForm.controls.street.value, this.SignupForm.controls.altura.value);
    if (this.SignupForm.valid && this.tiposRecomendacionSelected != undefined && ubicacion != undefined) {
      let vete: string;
      vete = "<strong>" + this.SignupForm.controls.name.value + "</strong><br>" + this.SignupForm.controls.street.value + " " + this.SignupForm.controls.altura.value + "";

      if (this.SignupForm.controls.facebook.value !== undefined && this.SignupForm.controls.facebook.value !== "") {
        vete += "<br><a target='_blank' href='" + this.SignupForm.controls.facebook.value + "'>Sitio Web</a>";
      }
      if (this.abierto24hsSelected == 1 && this.tiposRecomendacionSelected == 0) {
        vete += "<br><u>Abierto las 24hs.</u>";
      }

      const object1 = [
        vete,
        ubicacion.lat,
        ubicacion.lon
      ];

      this.vista_previa = object1;

      await this.map.remove();
      await this.renderMap();

      new Leaflet.marker([this.vista_previa[1], this.vista_previa[2]], { icon: this.greenIcon }).bindPopup(this.vista_previa[0])
          .addTo(this.map);
      
    }
  }

  validateInitialDate() {
    return (this.SignupForm.get('birthDate').touched && (this.SignupForm.controls.birthDate.value == ""));
  }

  validateButton() {
    if (this.SignupForm.valid) {
      document.getElementById("confirmar").classList.remove("buttonDisabled");
    } else {
      document.getElementById("confirmar").classList.add("buttonDisabled");
    }
  }

  validateCalle() {
    return (((this.SignupForm.get('street').touched ||
      this.SignupForm.get('street').dirty) &&
      this.SignupForm.get('street').errors));
  }

  validateAltura() {
    return (((this.SignupForm.get('altura').touched ||
      this.SignupForm.get('altura').dirty) &&
      this.SignupForm.get('altura').errors));
  }



  async registrarRecomendacion() {
    const ubicacion = await this.recomendacionService.buscarCoordenadas(this.SignupForm.controls.street.value, this.SignupForm.controls.altura.value);

    if (this.SignupForm.valid && this.tiposRecomendacionSelected != undefined && ubicacion != undefined) {
      this.isLoading = true;
      let recomendacion: Recomendacion = new Recomendacion();
      recomendacion.tipoRecomendacion = this.tiposRecomendacionSelected;
      recomendacion.nombre = this.SignupForm.controls.name.value;
      recomendacion.calle = this.SignupForm.controls.street.value;
      recomendacion.numero = this.SignupForm.controls.altura.value;
      recomendacion.abierto24hs = this.abierto24hsSelected;

      recomendacion.latitud = ubicacion.lat;
      recomendacion.longitud = ubicacion.lon;

      if (this.SignupForm.controls.facebook.value !== "") {
        recomendacion.sitioWeb = this.SignupForm.controls.facebook.value;
      }


      //this.alertsService.infoMessage(""+ubicacion+"","ubicacion" );


      this.recomendacionService.registrarRecomendacion(recomendacion, this.authService.getToken()).subscribe({
        complete: () => {
          this.alertsService.confirmMessage("La recomendación ha sido registrada").then((result) => window.location.href = '/administrar-recomendaciones');
        },
        error: (err: any) => {
          this.alertsService.errorMessage("Se ha producido un error, vuelva a intentar más tarde");
          this.isLoading = false;
        }
      })



    }
  }

  ngOnDestroy(): void {
    this.map.remove();
  }

}


