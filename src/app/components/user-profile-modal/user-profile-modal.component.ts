import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SignupService } from 'src/services/signup.service';
import { User } from 'src/models/IUser';
import { Data, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertsService } from 'src/utils/alerts.service';
import { TermsAndConditionsComponent } from 'src/app/terms-and-conditions/terms-and-conditions.component';
import { UserService } from 'src/services/user.service';
import { FormularioAdopcion } from 'src/models/IFormularioAdopcion';
import { Address } from 'src/models/IAddress';
import { AuthService } from 'src/app/auth.service';
import { NotificacionService } from 'src/services/notificacion.service';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Donacion } from 'src/models/IDonacion';


@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})

export class UserProfileModalComponent implements OnInit {
  ProfileForm: FormGroup;
  currentUser: any;
  Titulo = "Perfil de usuario"
  enEdicion:boolean=false;
  editarDatos:boolean=false;
  esconder:boolean=true;
  edadInvalida: Boolean = false;
  mensajeEdad: string = "";

  constructor(private editUser: SignupService, private authservice: AuthService, @Inject(MAT_DIALOG_DATA) public data: any, private alertsService: AlertsService, private router: Router) {

  }

  ngOnInit() {
    //obtengo el usuario
    this.currentUser = this.data.User;
    console.log(this.currentUser)

    //en base al perfil, los datos que se visualizan
    //particular:
    if (this.currentUser.facebook == null) {
      this.currentUser.facebook = "No especificado"
    };
    if (this.currentUser.instagram == null) {
      this.currentUser.instagram = "No especificado"
    };


    // Formato fecha  
    if (this.currentUser.fechaNacimiento !== null && this.currentUser.fechaNacimiento !== undefined) {
    var date = this.currentUser.fechaNacimiento.substring(0, 10);
    var [yyyy, mm, dd] = date.split("-");
    var revdate = `${dd}-${mm}-${yyyy}`;
    this.currentUser.fechaNacimiento = revdate;
    }

    this.currentUser.pwd = "********";

   
    this.inicializarFormulario(); 

    if (this.currentUser.Direccion !== undefined){
      this.ProfileForm.controls['calle'].setValue(this.currentUser.Direccion.calle);
      if (this.currentUser.Direccion.numero == undefined){
        this.currentUser.Direccion.numero = "s/n";
      }
      this.ProfileForm.controls['altura'].setValue(this.currentUser.Direccion.numero);
      this.ProfileForm.controls['localidad'].setValue(this.currentUser.Direccion.localidad);
      this.ProfileForm.controls['barrio'].setValue(this.currentUser.Direccion.barrio);
      if (this.currentUser.Direccion.referencia == undefined){
        this.currentUser.Direccion.referencia = "No especificado";
      }
      this.ProfileForm.controls['referencia'].setValue(this.currentUser.Direccion.referencia);
    }

    if (this.currentUser.dni !== undefined) {
      this.ProfileForm.controls['dni'].setValue(this.currentUser.dni);
      this.ProfileForm.controls['fechaNacimiento'].setValue(this.currentUser.fechaNacimiento);
      }

      if(this.currentUser.Donacion==null){
        this.ProfileForm.controls['banco'].setValue("No especificado");
        this.ProfileForm.controls['CBU'].setValue("No especificado");
        this.ProfileForm.controls['alias'].setValue("No especificado");
      }



  }

  inicializarFormulario(){
    if(this.enEdicion==false){
      this.ProfileForm = new FormGroup({
        nombres: new FormControl({ value: this.currentUser.nombres, disabled: true }),
        apellidos: new FormControl({ value: this.currentUser.apellidos, disabled: true }),
        dni: new FormControl({value:'', disabled: true }),
        fechaNacimiento: new FormControl({ value: '', disabled: true }),
        correoElectronico: new FormControl({ value: this.currentUser.correoElectronico, disabled: true }),
        calle: new FormControl({ value: '', disabled: true }),
        altura: new FormControl({ value: '', disabled: true }),
        localidad: new FormControl({ value: '', disabled: true }),
        barrio: new FormControl({ value: '', disabled: true }),
        referencia: new FormControl({ value: '', disabled: true }),
        banco: new FormControl({ value:'', disabled: true }),
        CBU: new FormControl({ value: '', disabled: true }),
        alias: new FormControl({ value: '', disabled: true }),
        numeroContacto: new FormControl({ value: this.currentUser.numeroContacto, disabled: true }),
        facebook: new FormControl({ value: this.currentUser.facebook, disabled: true }),
        instagram: new FormControl({ value: this.currentUser.instagram, disabled: true }),
        contrasenia: new FormControl({ value: this.currentUser.pwd, disabled: true })
      });

    }
    else{

      this.ProfileForm = new FormGroup({
        nombres: new FormControl({ value: this.currentUser.nombres, disabled: false },[Validators.required,Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
        apellidos: new FormControl({ value: this.currentUser.apellidos, disabled: false },[Validators.required,Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
        dni: new FormControl({ value: this.currentUser.dni, disabled: false },[Validators.required, Validators.pattern('[0-9]{7,8}')]),
        fechaNacimiento: new FormControl({ value: '', disabled: false},[Validators.required]),
        correoElectronico: new FormControl({ value: this.currentUser.correoElectronico, disabled: true }),
        banco: new FormControl({ value: '', disabled: false },[Validators.maxLength(30)]),
        CBU: new FormControl({ value: '', disabled: false },[Validators.maxLength(150)]),
        alias: new FormControl({ value: '', disabled: false },[Validators.maxLength(30)]),
        calle: new FormControl({ value:'', disabled: false },[Validators.required, Validators.maxLength(50)]),
        altura: new FormControl({ value:'', disabled: false }, [Validators.pattern('[0-9]{0,4}')]),
        localidad: new FormControl({ value: '', disabled: true }),
        barrio: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(50)]),
        referencia: new FormControl({ value: '', disabled: false },[Validators.maxLength(150)]),
        numeroContacto: new FormControl({ value: this.currentUser.numeroContacto, disabled: false },[Validators.required, Validators.pattern('[0-9]{10,13}')]),
        facebook: new FormControl({ value: this.currentUser.facebook, disabled: false }),
        instagram: new FormControl({ value: this.currentUser.instagram, disabled: false }),
        contrasenia: new FormControl({ value: this.currentUser.pwd, disabled: false },[Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[^A-Z]*[A-Z])(?=.*[^a-z]*[a-z])(?=.*[^0-9]*[0-9])[a-zA-Z0-9!@$.]{8,15}$')])
      });
    }
  }

  editar(){

    this.enEdicion=true;
    this.editarDatos=true;
    this.esconder=false;

    this.inicializarFormulario();
        
  }

  validateInitialDate() {
    return (this.ProfileForm.get('fechaNacimiento').touched && (this.ProfileForm.controls.fechaNacimiento.value == ""));
  }



  CalculateAge() {
      const today: Date = new Date();
      const birthDate: Date = new Date(this.ProfileForm.controls.fechaNacimiento.value);
      let age: number = today.getFullYear() - birthDate.getFullYear();
      const month: number = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        this.edadInvalida = true;
        this.mensajeEdad = "Debe ser mayor a 18 años";
      }
      else if (age > 100){
        this.edadInvalida = true;
        this.mensajeEdad = "Edad no válida";
      }
      else {
        this.edadInvalida = false;
      }
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

  validateDNI() {
    return (((this.ProfileForm.get('dni').touched ||
      this.ProfileForm.get('dni').dirty) &&
      this.ProfileForm.get('dni').errors));
  }

  validateBirthdate() {
    return (((this.ProfileForm.get('fechaNacimiento').touched ||
      this.ProfileForm.get('fechaNacimiento').dirty) &&
      this.ProfileForm.get('fechaNacimiento').errors));
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
    return (((this.ProfileForm.get('altura').touched ||
      this.ProfileForm.get('altura').dirty) &&
      this.ProfileForm.get('altura').errors));
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



  guardar(){

    if(this.currentUser.tipoUsuario==2){
      let particularUser: User = new User();
      particularUser.nombres = this.ProfileForm.controls.nombres.value;
      //particularUser.apellidos = this.ProfileForm.controls.apellidos.value;
      //particularUser.correoElectronico = this.ProfileForm.controls.correoElectronico.value;
      particularUser.numeroContacto = this.ProfileForm.controls.numeroContacto.value;
      particularUser.dni = this.ProfileForm.controls.dni.value;
            
      let userAddress: Address = new Address();
      userAddress.calle = this.ProfileForm.controls.calle.value;
      userAddress.numero = this.ProfileForm.controls.altura.value;
      userAddress.referencia = this.ProfileForm.controls.referencia.value;
      userAddress.localidad = "Córdoba Capital";
      userAddress.barrio = this.ProfileForm.controls.barrio.value;
      particularUser.Direccion = userAddress;

      let donaciones: Donacion=new Donacion();
      donaciones.CBU=this.ProfileForm.controls.CBU.value;
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
      

    
    } 

    else{
      let particularUser: User = new User();
      particularUser.nombres = this.ProfileForm.controls.nombres.value;
      particularUser.apellidos = this.ProfileForm.controls.apellidos.value;
      //particularUser.correoElectronico = this.ProfileForm.controls.correoElectronico.value;
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
      

      this.editUser.editUser(particularUser,this.authservice.getToken()).subscribe({
        complete: () => {
          this.alertsService.confirmMessage("El usuario ha sido modificado con exito!").then((result) => window.location.href ="/miperfil");
        },
        error: (err: any) => {
          this.alertsService.errorMessage(err.error.error).then((result) => {
           
          }
        )
        }
      })
    } 
   }}
    
      



  
  
