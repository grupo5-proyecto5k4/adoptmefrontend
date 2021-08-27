import { Component, OnInit } from '@angular/core';
import{AuthService} from '../auth.service';
import { AlertsService } from 'src/utils/alerts.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})

export class AdminProfileComponent implements OnInit {
  ProfileForm: FormGroup;
  profile: string;
  currentUser: any;

  constructor(private authservice: AuthService, private alertsService: AlertsService, private localStorageService: LocalStorageService) { 
    this.profile = this.localStorageService.getProfile();
    if (this.isLogued()){
      this.currentUser = this.authservice.getCurrentUser();
    // Formato fecha   
    this.currentUser.pwd = "********";
  }
}

ngOnInit() {
  this.ProfileForm = new FormGroup({
    correoElectronico: new FormControl({value: this.currentUser.correoElectronico, disabled:true}),
    contrasenia: new FormControl({value: this.currentUser.pwd, disabled:true})
});
}
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