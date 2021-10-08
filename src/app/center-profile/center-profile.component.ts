import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertsService } from 'src/utils/alerts.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-center-profile',
  templateUrl: './center-profile.component.html',
  styleUrls: ['./center-profile.component.scss']
})

export class CenterProfileComponent implements OnInit {
  ProfileForm: FormGroup;
  profile: any;
  currentUser: any;

  constructor(private authservice: AuthService, private router: Router, private alertsService: AlertsService, private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.profile = this.localStorageService.getProfile();
    if (this.profile == "2") {
      this.currentUser = this.authservice.getCurrentUser();

      if (this.currentUser.facebook == null) {
        this.currentUser.facebook = "No especificado"
      };
      if (this.currentUser.instagram == null) {
        this.currentUser.instagram = "No especificado"
      };
      if (this.currentUser.Direccion.numero == null) {
        this.currentUser.Direccion.numero == "No especificado"
      }

      if (this.currentUser.Direccion.referencia == null) {
        this.currentUser.Direccion.referencia = "No especificado"
      }
      // Formato fecha   
      this.currentUser.pwd = "********";
    }
    else {
      window.scrollTo(0, 0);
      this.router.navigate(['/']);
    }

    this.ProfileForm = new FormGroup({

      nombres: new FormControl({ value: this.currentUser.nombres, disabled: true }),
      correoElectronico: new FormControl({ value: this.currentUser.correoElectronico, disabled: true }),
      calle: new FormControl({ value: this.currentUser.Direccion.calle, disabled: true }),
      altura: new FormControl({ value: this.currentUser.Direccion.numero, disabled: true }),
      localidad: new FormControl({ value: this.currentUser.Direccion.localidad, disabled: true }),
      barrio: new FormControl({ value: this.currentUser.Direccion.barrio, disabled: true }),
      referencia: new FormControl({ value: this.currentUser.Direccion.referencia, disabled: true }),
      numeroContacto: new FormControl({ value: this.currentUser.numeroContacto, disabled: true }),
      facebook: new FormControl({ value: this.currentUser.facebook, disabled: true }),
      instagram: new FormControl({ value: this.currentUser.instagram, disabled: true }),
      contrasenia: new FormControl({ value: this.currentUser.pwd, disabled: true })
    });
  }
  logOut() {
    this.alertsService.questionMessage("¿Desea cerrar la sesión?", "Cerrar sesión", "Salir", "Cancelar")
      .then((result) => {
        if (result.value) {
          this.authservice.cerrarSesion();
          window.location.href = "/landing";
        }
      });
  }

  isLogued() {
    return (this.profile !== null && this.profile !== undefined)
  }
}