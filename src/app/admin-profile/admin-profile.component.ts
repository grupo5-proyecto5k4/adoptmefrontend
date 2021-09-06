import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertsService } from 'src/utils/alerts.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})

export class AdminProfileComponent implements OnInit {
  ProfileForm: FormGroup;
  profile: any;
  currentUser: any;

  constructor(private authservice: AuthService, private router: Router, private alertsService: AlertsService, private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.profile = this.localStorageService.getProfile();
    if (this.profile == "0") {
      this.currentUser = this.authservice.getCurrentUser();
      if (this.currentUser.facebook == null) {
        this.currentUser.facebook = "No especificado"
      };
      if (this.currentUser.instagram == null) {
        this.currentUser.instagram = "No especificado"
      };
      // Formato fecha   
      var date = this.currentUser.fechaNacimiento.substring(0, 10);
      var [yyyy, mm, dd] = date.split("-");
      var revdate = `${dd}-${mm}-${yyyy}`;
      this.currentUser.fechaNacimiento = revdate;

      this.currentUser.pwd = "********";
    }
    else {
      window.scrollTo(0, 0);
      this.router.navigate(['/']);
    }

    this.ProfileForm = new FormGroup({

      nombres: new FormControl({ value: this.currentUser.nombres, disabled: true }),
      apellidos: new FormControl({ value: this.currentUser.apellidos, disabled: true }),
      correoElectronico: new FormControl({ value: this.currentUser.correoElectronico, disabled: true }),
      dni: new FormControl({ value: this.currentUser.dni, disabled: true }),
      numeroContacto: new FormControl({ value: this.currentUser.numeroContacto, disabled: true }),
      fechaNacimiento: new FormControl({ value: this.currentUser.fechaNacimiento, disabled: true }),
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