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
  private veterinaria: any;
  private centro_castracion: any;
  profile: any;

  constructor(private dialog: MatDialog, private alertsService: AlertsService, private recomendacionService: RecomendacionService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.profile = this.authService.getProfile();
    if (this.profile == '0') {
      await this.obtenerRecomendacionesVeterinaria();
      await this.obtenerRecomendacionesCentrosCastracion();


      this.SignupForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
        street: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        altura: new FormControl('', [Validators.required, Validators.pattern('[0-9]{0,4}')]),
        facebook: new FormControl(''),
      });


      let redIcon = Leaflet.icon({
        iconUrl: 'assets/images/leaflet/red-icon.png',
        iconSize: [25, 41], // size of the icon
        iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's locatio
        popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor
      });

      let blueIcon = Leaflet.icon({
        iconUrl: 'assets/images/leaflet/blue-icon.png',
        iconSize: [25, 41], // size of the icon
        iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's locatio
        popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor
      });

      let greenIcon = Leaflet.icon({ //para mostrar direccion a guardar
        iconUrl: 'assets/images/leaflet/blue-icon.png',
        iconSize: [25, 41], // size of the icon
        iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's locatio
        popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor
      });

      let locations = [
        ["LOCATION_1", -31.41666919552361, -64.1879917385005],
      ]

      this.map = Leaflet.map('map').setView([-31.411156, -64.191211], 12);


      Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWlsaW1vcmUxNjE2IiwiYSI6ImNrcmlpdTRsNDB2aXozMW80MTQwa3YxemwifQ.bzPgST4tdgMA5loxAX-eew'
      }).addTo(this.map);

      console.log("this.veterinaria: "+this.veterinaria.length);
      for (var i = 0; i < this.veterinaria.length; i++) {
        var marker = new Leaflet.marker([this.veterinaria[i][1], this.veterinaria[i][2]], { icon: blueIcon }).bindPopup(this.veterinaria[i][0])
          .addTo(this.map);
      }

      console.log("this.centro_castracion: "+this.centro_castracion.length);
      for (var i = 0; i < this.centro_castracion.length; i++) {
        var marker = new Leaflet.marker([this.centro_castracion[i][1], this.centro_castracion[i][2]], { icon: redIcon }).bindPopup(this.centro_castracion[i][0])
          .addTo(this.map);
      }
    }
    else {
      window.scrollTo(0, 0);
      this.router.navigate(['/']);
    }


  }

  async obtenerRecomendacionesVeterinaria() {
    this.recomendacionService.getRecomendacionesVeterinaria().then((r) => {
      this.veterinaria = []
      for (var i = 0; i < r.length; i++) {
        let vete: string;
        vete = "<strong>" + r[i].nombre + "</strong><br>" + r[i].calle + " " + r[i].numero + "";

        if (r[i].sitioWeb !== undefined) {
          vete += "<br><a target='_blank' href='" + r[i].sitioWeb + "'>Sitio Web</a>";
        }
        if (r[i].abierto24hs == 1) {
          vete += "<br><u>Abierto las 24hs.</u>";
        }

        this.veterinaria[i] = [vete, r[i].latitud, r[i].longitud];
      }

      this.alertsService.infoMessage("" + this.veterinaria + "", "vetes");

      let centrosCastracion = [
        ["<strong>Centro de Castración Municipal</strong><br>Dr. Francisco Muñiz 60<br>", -31.407387, -64.209818]
      ]
  
  
      let veterinaria = [
        ["<strong>Veterinaria Alem</strong><br>Blvd. San Juan 125<br><a target='_blank' href='https://www.veterinariaalem.com/'>Sitio Web</a>", -31.424622, -64.182666],
        ["<strong>Medicina Felina</strong><br>Lopez de Vega 408", -31.382872, -64.179952],
        ["<strong>Clínica Veterinaria Eva Inguerman</strong><br>Av. Colón 6200<br><u>Abierto las 24hs.</u>", -31.394014, -64.262933]
      ];


    });
  }

  async obtenerRecomendacionesCentrosCastracion() {
    this.recomendacionService.getRecomendacionesCentrosCastracion().then((r) => {
      console.log("r: "+r.length);
      for (var i = 0; i < r.length; i++) {
        let vete: string;
        vete = "<strong>" + r[i].nombre + "</strong><br>" + r[i].calle + " " + r[i].numero + "";

        if (r[i].sitioWeb !== null) {
          vete += "<br><a target='_blank' href='" + r[i].sitioWeb + "'>Sitio Web</a>";
        }
        if (r[i].abierto24hs == 1) {
          vete += "<br><u>Abierto las 24hs.</u>";
        }

        this.centro_castracion += [
          [vete, r[i].latitud, r[i].longitud],
        ];

      }
    });
  }

  proximamente() {
    this.alertsService.infoMessage('La visualización del centro rescatista aún no se encuentra disponible', 'Información')
  }

  close() {
    //this.dialogref.close();
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


  registrarRecomendacion() {
    if (this.SignupForm.valid) {
      this.isLoading = true;
      let recomendacion: Recomendacion = new Recomendacion();
      recomendacion.tipoRecomendacion = 1;  //des harcodear
      recomendacion.nombre = this.SignupForm.controls.name.value;
      recomendacion.calle = this.SignupForm.controls.street.value;
      recomendacion.numero = this.SignupForm.controls.altura.value;
      recomendacion.abierto24hs = 0; //des harcodear
      recomendacion.latitud = -31.3481345; //des harcodear
      recomendacion.longitud = -64.2626825; //des harcodear

      if (this.SignupForm.controls.facebook.value !== "") {
        recomendacion.sitioWeb = this.SignupForm.controls.facebook.value;
      }

      let ubicacion = this.recomendacionService.buscarCoordenadas(recomendacion.calle, recomendacion.numero);
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


