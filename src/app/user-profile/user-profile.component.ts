import { Component, OnInit } from '@angular/core';
import{AuthService} from '../auth.service';
import { AlertsService } from 'src/utils/alerts.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  ProfileForm: FormGroup;
  profile: string;
  currentUser: any;

  constructor(private authservice: AuthService, private alertsService: AlertsService, private localStorageService: LocalStorageService) { 
    this.profile = this.localStorageService.getProfile();
    if (this.isLogued()){
      this.currentUser = this.authservice.getCurrentUser();
    if (this.currentUser.facebook == null){
      this.currentUser.facebook = "No especificado"
      };
    if (this.currentUser.instagram == null){
      this.currentUser.instagram = "No especificado"
      };
    // Formato fecha   
    var date = this.currentUser.fechaNacimiento.substring(0,10);
    var [yyyy, mm, dd] = date.split("-");
    var revdate = `${dd}-${mm}-${yyyy}`;
    this.currentUser.fechaNacimiento = revdate;
  }
}

ngOnInit() {
  this.ProfileForm = new FormGroup({

    nombres: new FormControl({value: this.currentUser.nombres, disabled:true}),
    apellidos: new FormControl({value: this.currentUser.apellidos, disabled:true}),
    correoElectronico: new FormControl({value: this.currentUser.correoElectronico, disabled:true}),
    dni: new FormControl({value: this.currentUser.dni, disabled:true}),
    numeroContacto: new FormControl({value: this.currentUser.numeroContacto, disabled:true}),
    fechaNacimiento: new FormControl({value: this.currentUser.fechaNacimiento, disabled:true}),
    facebook: new FormControl({value: this.currentUser.facebook, disabled:true}),
    instagram: new FormControl({value: this.currentUser.instagram, disabled:true})
});
}



  // El logout tiene que pasarse a otro boton dentro del  nuevo componente
  logOut() {
    this.alertsService.questionMessage("¿Desea cerrar la sesión?", "Cerrar sesión", "Salir", "Cancelar")
    .then((result) => {
      if (result.value) {
        this.authservice.cerrarSesion();
        window.location.href = "/landing";
      }});
    }

    isLogued(){
      return (this.profile !== null && this.profile !== undefined)
    }
  }