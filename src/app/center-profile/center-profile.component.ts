import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertsService } from 'src/utils/alerts.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { SignupService } from 'src/services/signup.service';
import { Address } from 'src/models/IAddress';
import { User } from 'src/models/IUser';
import { Donacion } from 'src/models/IDonacion';
@Component({
  selector: 'app-center-profile',
  templateUrl: './center-profile.component.html',
  styleUrls: ['./center-profile.component.scss']
})

export class CenterProfileComponent implements OnInit {
  ProfileForm: FormGroup;
  profile: any;
  currentUser: any;
  enEdicion:boolean=false;
  editarDatos:boolean=false;
  esconder:boolean=true;

  constructor(private editUser: SignupService, private authservice: AuthService, private router: Router, private alertsService: AlertsService, private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.profile = this.localStorageService.getProfile();
    if (this.profile == "2") {
      this.currentUser = this.authservice.getCurrentUser();

      this.editUser.getCentrosDonaciones(this.currentUser._id, this.authservice.getToken()).subscribe(data => {
        console.log("datos del banco", data);
        this.currentUser.Donacion.banco= this.ProfileForm.controls['banco'].setValue(data.banco);
        this.currentUser.Donacion.cbu= this.ProfileForm.controls['cbu'].setValue(data.cbu);
        this.currentUser.Donacion.alias=this.ProfileForm.controls['alias'].setValue(data.alias);
  
        if(data.banco==null || data.banco==undefined){
          this.ProfileForm.controls['banco'].setValue("No especificado"); 
        }
        if(data.cbu==null || data.cbu==undefined){
          this.ProfileForm.controls['cbu'].setValue("No especificado"); 
        }
        if(data.alias==null || data.alias==undefined){
          this.ProfileForm.controls['alias'].setValue("No especificado"); 
        }
      
      })

      console.log(this.currentUser);
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
      console.log(JSON.stringify(this.currentUser.Direccion));
      console.log(this.currentUser.Direccion.calle);
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

  inicializarFormulario(){
    if(this.enEdicion==false){
      this.ProfileForm = new FormGroup({
        nombres: new FormControl({ value: this.currentUser.nombres, disabled: true }),
        correoElectronico: new FormControl({ value: this.currentUser.correoElectronico, disabled: true }),
        calle: new FormControl({ value: this.currentUser.Direccion.calle, disabled: true }),
        altura: new FormControl({ value: this.currentUser.Direccion.numero, disabled: true }),
        localidad: new FormControl({ value: this.currentUser.Direccion.localidad, disabled: true }),
        barrio: new FormControl({ value: this.currentUser.Direccion.barrio, disabled: true }),
        referencia: new FormControl({ value: this.currentUser.Direccion.referencia, disabled: true }),
        banco: new FormControl({ value: this.currentUser.Donacion.banco, disabled: true }),
        cbu: new FormControl({ value: this.currentUser.Donacion.cbu, disabled: true }),
        alias: new FormControl({ value:this.currentUser.Donacion.alias, disabled: true }),
        numeroContacto: new FormControl({ value: this.currentUser.numeroContacto, disabled: true }),
        facebook: new FormControl({ value: this.currentUser.facebook, disabled: true }),
        instagram: new FormControl({ value: this.currentUser.instagram, disabled: true }),
        contrasenia: new FormControl({ value: this.currentUser.pwd, disabled: true }),
                
      });
    }
    else{

      this.ProfileForm = new FormGroup({

        nombres: new FormControl({ value: this.currentUser.nombres, disabled:false }, [Validators.required,Validators.maxLength(60), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
        correoElectronico: new FormControl({ value: this.currentUser.correoElectronico, disabled: true }),
        calle: new FormControl({ value: this.currentUser.Direccion.calle, disabled: false },[Validators.required, Validators.maxLength(50)]),
        altura: new FormControl({ value: this.currentUser.Direccion.numero, disabled: false }, [Validators.pattern('[0-9]{0,4}')]),
        localidad: new FormControl({ value: this.currentUser.Direccion.localidad, disabled: true }),
        barrio: new FormControl({ value: this.currentUser.Direccion.barrio, disabled: false },[Validators.required, Validators.maxLength(50)]),
        referencia: new FormControl({ value: this.currentUser.Direccion.referencia, disabled: false },[Validators.maxLength(150)]),
        banco: new FormControl({ value: 'No especificado', disabled: true }),
        cbu: new FormControl({ value: 'No especificado', disabled: true }),
        alias: new FormControl({ value:'No especificado', disabled: true }),
        numeroContacto: new FormControl({ value: this.currentUser.numeroContacto, disabled: false },[Validators.required, Validators.pattern('[0-9]{10,13}')]),
        facebook: new FormControl({ value: this.currentUser.facebook, disabled: false }),
        instagram: new FormControl({ value: this.currentUser.instagram, disabled: false }),
        contrasenia: new FormControl({ value:'', disabled: false },[Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[^A-Z]*[A-Z])(?=.*[^a-z]*[a-z])(?=.*[^0-9]*[0-9])[a-zA-Z0-9!@$.]{8,15}$')]),
        
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

  validateCalle() {
    return (((this.ProfileForm.get('calle').touched ||
      this.ProfileForm.get('calle').dirty) &&
      this.ProfileForm.get('calle').errors));
  }

  validateAltura() {
    return (((this.ProfileForm.get('altura').touched ||
      this.ProfileForm.get('altura').dirty) &&
      this.ProfileForm.get('altura').errors));
  }

  validateBarrio() {
    return (((this.ProfileForm.get('barrio').touched ||
      this.ProfileForm.get('barrio').dirty) &&
      this.ProfileForm.get('barrio').errors));
  }

  cancelar(){
    window.location.href = "/micentro";
  }

  guardar(){

    if(this.ProfileForm.valid){

      let particularUser: User = new User();
      particularUser.nombres = this.ProfileForm.controls.nombres.value;
      particularUser.numeroContacto = this.ProfileForm.controls.numeroContacto.value;
                
      let userAddress: Address = new Address();
      userAddress.calle = this.ProfileForm.controls.calle.value;
      userAddress.numero = this.ProfileForm.controls.altura.value;
      userAddress.referencia = this.ProfileForm.controls.referencia.value;
      userAddress.localidad = "Córdoba Capital";
      userAddress.barrio = this.ProfileForm.controls.barrio.value;
      particularUser.Direccion = userAddress;

     let donaciones: Donacion=new Donacion();
     donaciones.cbu=this.ProfileForm.controls.cbu.value;
      donaciones.alias=this.ProfileForm.controls.alias.value;
      donaciones.banco=this.ProfileForm.controls.banco.value;
      particularUser.Donacion=donaciones;

     
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

           this.enEdicion=false;
          this.editarDatos=false;
          this.esconder=true;

          this.alertsService.confirmMessage("Sus datos han sido modificados con exito!").then((result) => {
            window.location.href ="/micentro";
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