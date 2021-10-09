import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertsService } from 'src/utils/alerts.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
 
  ProfileForm: FormGroup;
  profile: any;
  currentUser: any;
  enEdicion:boolean=false;
  editarDatos:boolean=false;
  esconder:boolean=true;

  constructor(private authservice: AuthService, private alertsService: AlertsService, private router: Router, private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.profile = this.localStorageService.getProfile();
    if (this.profile == "1") {
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
        this.inicializarFormulario();
      
    }
    else {
      window.scrollTo(0, 0);
      this.router.navigate(['/']);
    }
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

  inicializarFormulario(){

    if(this.enEdicion==false){

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
    else{

      this.ProfileForm = new FormGroup({
        nombres: new FormControl({ value: this.currentUser.nombres, disabled: false },[Validators.required,Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
        apellidos: new FormControl({value: this.currentUser.apellidos, disabled:false},[Validators.required,Validators.maxLength(30),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
        correoElectronico: new FormControl({ value: this.currentUser.correoElectronico, disabled: true }),
        dni: new FormControl({ value: this.currentUser.dni, disabled:false},[Validators.required, Validators.pattern('[0-9]{7,8}')]),
        numeroContacto: new FormControl({ value: this.currentUser.numeroContacto, disabled:false }, [Validators.required, Validators.pattern('[0-9]{10,13}')]),
        fechaNacimiento: new FormControl({ value: this.currentUser.fechaNacimiento, disabled:false},[Validators.required]),
        facebook: new FormControl({ value: this.currentUser.facebook, disabled:false }),
        instagram: new FormControl({ value: this.currentUser.instagram, disabled:false }),
        contrasenia: new FormControl({ value: this.currentUser.pwd, disabled:false})
      });

    }

  }

  editar(){

    this.enEdicion=true;
    this.editarDatos=true;
    this.esconder=false;

        this.inicializarFormulario();
      

    
  }

  isLogued() {
    return (this.profile !== null && this.profile !== undefined)
  }

  cancelar(){
    window.scrollTo(0, 0);
    window.location.href = "/miperfil";
 
  }

  guardar(){
    window.scrollTo(0, 0);
    window.location.href = "/miperfil";
    
  }

}