import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertsService } from 'src/utils/alerts.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { User } from 'src/models/IUser';
import { SignupService } from 'src/services/signup.service';

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
  token:any;
  edadInvalida: Boolean = false;
  mensajeEdad: string = "";

  constructor(private editUser: SignupService,private authservice: AuthService, private alertsService: AlertsService, private router: Router, private localStorageService: LocalStorageService) {

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


  cancelar(){
    window.location.href = "/miperfil";
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
      apellidos: new FormControl({ value: this.currentUser.apellidos, disabled: false },[Validators.required,Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
      dni: new FormControl({ value: this.currentUser.dni, disabled: true }),
      fechaNacimiento: new FormControl({ value: this.currentUser.fechaNacimiento, disabled: true}),
      correoElectronico: new FormControl({ value: this.currentUser.correoElectronico, disabled: true }),
      numeroContacto: new FormControl({ value: this.currentUser.numeroContacto, disabled: false },[Validators.required, Validators.pattern('[0-9]{10,13}')]),
      facebook: new FormControl({ value: this.currentUser.facebook, disabled: false }),
      instagram: new FormControl({ value: this.currentUser.instagram, disabled: false }),
      contrasenia: new FormControl({ value: '', disabled: false },[Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[^A-Z]*[A-Z])(?=.*[^a-z]*[a-z])(?=.*[^0-9]*[0-9])[a-zA-Z0-9!@$.]{8,15}$')])
    });

  }
  }
 

editar(){

  this.enEdicion=true;
  this.editarDatos=true;
  this.esconder=false;

  this.inicializarFormulario();
      
}

   

validateName() {
  return (((this.ProfileForm.get('nombres').touched ||
    this.ProfileForm.get('nombres').dirty) &&
    this.ProfileForm.get('nombres').errors));
}

validateLastname() {
  return (((this.ProfileForm.get('apellidos').touched ||
    this.ProfileForm.get('apellidos').dirty) &&
    this.ProfileForm.get('apellidos').errors));
}


validateContactNumber() {
  return (((this.ProfileForm.get('numeroContacto').touched ||
    this.ProfileForm.get('numeroContacto').dirty) &&
    this.ProfileForm.get('numeroContacto').errors));
}

validatePassword() {
  return (((this.ProfileForm.get('contrasenia').touched ||
    this.ProfileForm.get('contrasenia').dirty) &&
    this.ProfileForm.get('contrasenia').errors));
}


guardar(){
 if(this.ProfileForm.valid){
  let particularUser: User = new User();
  particularUser.nombres = this.ProfileForm.controls.nombres.value;
  particularUser.apellidos = this.ProfileForm.controls.apellidos.value;
  particularUser.numeroContacto = this.ProfileForm.controls.numeroContacto.value;
  particularUser.dni = this.ProfileForm.controls.dni.value;
  
  particularUser.fechaNacimiento = (this.ProfileForm.controls.fechaNacimiento.value).toLocaleString();;
  if (this.ProfileForm.controls.facebook.value !== "") {
    particularUser.facebook = this.ProfileForm.controls.facebook.value;
  }
  if (this.ProfileForm.controls.instagram.value !== "") {
    particularUser.instagram = this.ProfileForm.controls.instagram.value;
  }
  
  if (this.ProfileForm.controls.facebook.value !== "") {
    particularUser.facebook = this.ProfileForm.controls.facebook.value;
  }
  particularUser.contrasenia = this.ProfileForm.controls.contrasenia.value;
  console.log(particularUser);
  
  this.editUser.editUser(particularUser,this.authservice.getToken()).subscribe(
    (resp:Data) => {
      localStorage.setItem('auth-token', resp.token);
      this.alertsService.confirmMessage("Sus datos han sido modificados con exito!").then((result) => {
        this.enEdicion=false;
        this.editarDatos=false;
        this.esconder=true;
      });
    },
    (err: any) => {
      this.alertsService.errorMessage(err.error.error).then((result) => {
       
      }
    )
    }
  )
 }
} 
}

