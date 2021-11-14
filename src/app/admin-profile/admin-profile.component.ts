import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertsService } from 'src/utils/alerts.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { SignupService } from 'src/services/signup.service';
import { User } from 'src/models/IUser';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})

export class AdminProfileComponent implements OnInit {
  ProfileForm: FormGroup;
  profile: any;
  currentUser: any;
  enEdicion:boolean;
  editarDatos:boolean;
  esconder:boolean;
  token:any;
  edadInvalida: Boolean = false;
  mensajeEdad: string = "";
  nuevotoken: string;
  esconderContra: Boolean= false;
  editarDatosPerfil: Boolean=true;
  EditarContra: Boolean= false;

  constructor(private editUser: SignupService, private authservice: AuthService, private router: Router, private alertsService: AlertsService, private localStorageService: LocalStorageService) {

  }

  ngOnInit() {

    this.enEdicion=false;
    this.editarDatos=false;
    this.esconder=false;
    

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

    this.inicializarFormulario();

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

  cancelar(){
    
    this.enEdicion=false;
    this.editarDatos=false;
    this.esconder=false;
    this.esconderContra=false;
    this.editarDatosPerfil=true;
    this.EditarContra= false;

    this.inicializarFormulario();
  }

  editar(){

    this.enEdicion=true;
    this.editarDatos=true;
    this.esconder=true;
    this.esconderContra=false;
    this.editarDatosPerfil=false;
    this.EditarContra= false;
  
    this.inicializarFormulario();
        
  }

  editarContrasenia(){
    this.enEdicion=true;
    this.editarDatos=false;
    this.esconder=false;
    this.esconderContra=true;
    this.editarDatosPerfil=false;
    this.EditarContra= true;

    this.ProfileForm = new FormGroup({
      nombres: new FormControl({ value: this.currentUser.nombres, disabled: true }),
      apellidos: new FormControl({ value: this.currentUser.apellidos, disabled: true }),
      correoElectronico: new FormControl({ value: this.currentUser.correoElectronico, disabled: true }),
      dni: new FormControl({ value: this.currentUser.dni, disabled: true }),
      numeroContacto: new FormControl({ value: this.currentUser.numeroContacto, disabled: true }),
      fechaNacimiento: new FormControl({ value:this.currentUser.fechaNacimiento, disabled: true }),
      facebook: new FormControl({ value: this.currentUser.facebook, disabled: true }),
      instagram: new FormControl({ value: this.currentUser.instagram, disabled: true }),
      contrasenia: new FormControl({ value: '', disabled: false },[Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[^A-Z]*[A-Z])(?=.*[^a-z]*[a-z])(?=.*[^0-9]*[0-9])[a-zA-Z0-9!@$.]{8,15}$')])
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
        fechaNacimiento: new FormControl({ value:this.currentUser.fechaNacimiento, disabled: true }),
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
        contrasenia: new FormControl({ value: this.currentUser.pwd, disabled: true })
        //contrasenia: new FormControl({ value: '', disabled: false },[Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[^A-Z]*[A-Z])(?=.*[^a-z]*[a-z])(?=.*[^0-9]*[0-9])[a-zA-Z0-9!@$.]{8,15}$')])
      });
  
    }

  }

  guardarContra(){
    let userContra: User= new User();
    userContra.contrasenia= this.ProfileForm.controls.contrasenia.value;

    this.editUser.editUser(userContra,this.authservice.getToken()).subscribe(
      (resp:Data) => {
        localStorage.setItem('auth_token', resp.token);
        this.currentUser=this.editUser.getUsuarioModificado(resp.token).subscribe((r)=>{
          this.currentUser=this.authservice.setUser(r);
          this.localStorageService.setProfile(r.tipoUsuario); 
          this.alertsService.confirmMessage("La contraseña ha sido modificada con exito!").then( ()=>
          window.location.href = "/perfiladmin");
        });  
 
      },
      (err: any) => {
        this.alertsService.errorMessage(err.error.error).then((result) => {
         
        }
      )
      }
    )
  }

  guardar(){

    let particularUser: User = new User();
    particularUser.nombres = this.ProfileForm.controls.nombres.value;
    particularUser.apellidos = this.ProfileForm.controls.apellidos.value;
    particularUser.numeroContacto = this.ProfileForm.controls.numeroContacto.value;
    
    if (this.ProfileForm.controls.facebook.value !== "") {
      particularUser.facebook = this.ProfileForm.controls.facebook.value;
    }
    if (this.ProfileForm.controls.instagram.value !== "") {
      particularUser.instagram = this.ProfileForm.controls.instagram.value;
    }
    
   // particularUser.contrasenia = this.ProfileForm.controls.contrasenia.value;
  
    
    this.editUser.editUser(particularUser,this.authservice.getToken()).subscribe(
      (resp:Data) => {
        localStorage.setItem('auth_token', resp.token);
        this.currentUser=this.editUser.getUsuarioModificado(resp.token).subscribe((r)=>{
          this.currentUser=this.authservice.setUser(r);
          this.localStorageService.setProfile(r.tipoUsuario); 
          this.alertsService.confirmMessage("Sus datos han sido modificados con exito!").then( ()=>
          window.location.href = "/perfiladmin");
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



