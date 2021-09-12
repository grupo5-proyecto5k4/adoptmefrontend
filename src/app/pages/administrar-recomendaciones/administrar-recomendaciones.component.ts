import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { AlertsService } from 'src/utils/alerts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/models/IUser';
import { UserService } from 'src/services/user.service';



var redIcon = Leaflet.icon({
  iconUrl: 'assets/images/leaflet/red-icon.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's locatio
  popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor
});

var blueIcon = Leaflet.icon({
  iconUrl: 'assets/images/leaflet/blue-icon.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's locatio
  popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor
});

var locations = [
  ["LOCATION_1", -31.41666919552361, -64.1879917385005],
]

var centrosCastracion = [
  ["<strong>Centro de Castración Municipal</strong><br>Dr. Francisco Muñiz 60<br>", -31.407387, -64.209818]
]

var veterinaria = [
  ["<strong>Veterinaria Alem</strong><br>Blvd. San Juan 125<br><a target='_blank' href='https://www.veterinariaalem.com/'>Sitio Web</a>", -31.424622, -64.182666],
  ["<strong>Medicina Felina</strong><br>Lopez de Vega 408", -31.382872, -64.179952],
  ["<strong>Clínica Veterinaria Eva Inguerman</strong><br>Av. Colón 6200<br><u>Abierto las 24hs.</u>", -31.394014, -64.262933]
];

@Component({
  selector: 'app-administrar-recomendaciones',
  templateUrl: './administrar-recomendaciones.component.html',
  styleUrls: ['./administrar-recomendaciones.component.scss'],
})


export class AdministrarRecomendacionesComponent implements OnInit, OnDestroy {
    title = 'leafletApps';
    map: Leaflet.Map;
  Titulo = "Habilitar centros rescatistas";
  public pageSize: number = 10;
  public lowValue: number = 0;
  public highValue: number = 10;
  private pageIndex: number = 0;
  private activePageIndex: boolean = false;
  centrosPendientes: any;
  profile: any;

  constructor(private dialog: MatDialog, private userService: UserService, private alertsService: AlertsService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.profile = this.authService.getProfile();
    if (this.profile == '0') {
      await this.obtenerCentros();
    }
    else {
      window.scrollTo(0, 0);
      this.router.navigate(['/']);
    }

    this.map = Leaflet.map('map').setView([-31.411156, -64.191211], 12);


    Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibWlsaW1vcmUxNjE2IiwiYSI6ImNrcmlpdTRsNDB2aXozMW80MTQwa3YxemwifQ.bzPgST4tdgMA5loxAX-eew'
    }).addTo(this.map);

    for (var i = 0; i < veterinaria.length; i++) {
      var marker = new Leaflet.marker([veterinaria[i][1], veterinaria[i][2]], { icon: blueIcon }).bindPopup(veterinaria[i][0])
        .addTo(this.map);
    }
    for (var i = 0; i < centrosCastracion.length; i++) {
      var marker = new Leaflet.marker([centrosCastracion[i][1], centrosCastracion[i][2]], { icon: redIcon }).bindPopup(centrosCastracion[i][0])
        .addTo(this.map);
    }
  }


  /*1 - Activo (Usuario)
    2 - Pendiente (Usuario)
    3 - Bloqueado (Usuario) */


  async obtenerCentros() {
    this.userService.getCentrosRescatistasPendientes('Pendiente', this.authService.getToken()).then((r) => {
      this.centrosPendientes = r;
    });
  }

  proximamente() {
    this.alertsService.infoMessage('La visualización del centro rescatista aún no se encuentra disponible', 'Información')
  }

  cambiarEstado(user: any, estado: number) {
    let centro: User = { _id: user._id, nombres: user.nombres, correoElectronico: user.correoElectronico, idEstado: estado, dni: user.dni, numeroContacto: user.numeroContacto, fechaNacimiento: user.fechaNacimiento, facebook: user.facebook, instagram: user.instagram, fechaCreacion: user.fechaCreacion, fechaModificacion: user.fechaCreacion, tipoUsuario: user.tipoUsuario, contrasenia: '', Direccion: user.Direccion };
    this.userService.updateAccount(centro, this.authService.getToken()).subscribe({
      complete: () => {
        if (estado == 1) {
          this.alertsService.confirmMessage("El centro rescatista ha sido habilitado")
            .then((result) => {
              this.obtenerCentros();
            });
        }
        else if (estado == 3) {
          this.alertsService.confirmMessage("El centro rescatista ha sido rechazado")
            .then((result) => {
              this.obtenerCentros();
            });
        }
      },
      error: (err: any) => {
        this.alertsService.errorMessage("Se ha producido un error, vuelva a intentar más tarde")
      }
    });
  }

  ngOnDestroy(): void {
    this.map.remove();
  }

}


