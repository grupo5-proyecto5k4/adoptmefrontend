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
import { Mascota } from 'src/models/IMascota';
import { UserFormComponent } from '../user-form/user-form.component';
import { MascotaService } from 'src/services/mascota.service';
import { SolicitudProvisorioComponent } from 'src/app/solicitud-provisorio/solicitud-provisorio.component';
import { LocalStorageService } from 'src/services/local-storage.service';


@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.scss']
})

export class VerMascotaComponent implements OnInit {
  ProfileForm: FormGroup;
  mascota: any;
  Titulo = "";
  columnas = ['Nombre', 'Fecha de aplicacion'];
  listaVacunas: any = []; //aca se guardaran todas las vacunas
  slideIndex = 0;
  fotos: any = [];
  fotoVisualizar: any = [];
  accion: any;
  profile: any;

  constructor(private authservice: AuthService, private mascotaService: MascotaService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private alertsService: AlertsService, private router: Router, private localStorageService: LocalStorageService) {

  }

  ngOnInit() {

    this.profile = this.localStorageService.getProfile();
    //this.usuarioId = this.localStorageService.

    //obtengo el usuario
    this.mascota = this.data.mascota;
    this.accion = this.data.accion;

    this.Titulo = this.mascota.nombreMascota;
    // Formato fecha  
    if (this.mascota.fechaNacimiento !== null && this.mascota.fechaNacimiento !== undefined) {
      var date = this.mascota.fechaNacimiento.substring(0, 10);
      var [yyyy, mm, dd] = date.split("-");
      var revdate = `${dd}/${mm}/${yyyy}`;
      this.mascota.fechaNacimiento = revdate;
    }

    if (this.mascota.Foto.length != 0) {
      //Recorro imágenes
      for (let i = 0; i < this.mascota.Foto.length; i++) {
        // Foto Principal

        const object1 = {
          path: this.mascota.Foto[i].foto,
        };
        if (this.mascota.Foto[i].esPrincipal) {
          this.fotos.unshift(object1);
          this.fotoVisualizar = [];
          this.fotoVisualizar.push(object1);
        }
        else {
          this.fotos.push(object1);
        }
      }
    }


    this.ProfileForm = new FormGroup({
      nombres: new FormControl({ value: this.mascota.nombreMascota, disabled: true }),
      tamañoFinal: new FormControl({ value: this.mascota.tamañoFinal, disabled: true }),
      sexo: new FormControl({ value: this.mascota.sexo, disabled: true }),
      fechaNacimiento: new FormControl({ value: this.mascota.fechaNacimiento, disabled: true }),
      raza: new FormControl({ value: this.mascota.raza, disabled: true }),
      castrado: new FormControl({ value: this.mascota.castrado, disabled: true }),
      conductaGatos: new FormControl({ value: this.mascota.conductaGatos, disabled: true }),
      conductaPerros: new FormControl({ value: this.mascota.conductaPerros, disabled: true }),
      conductaNiños: new FormControl({ value: this.mascota.conductaNiños, disabled: true }),
      descripcion: new FormControl({ value: this.mascota.descripcion, disabled: true }),
    });


    this.mascotaService.getVacunas(this.mascota._id).then((r) => {
      if (r.length > 0) {
        this.listaVacunas = r;
      }
    });


  }


  // Next/previous controls
  plusSlides(action: number) {

    this.slideIndex + action
    let object1 = {};
    if ((this.slideIndex + action) >= 0 && (this.slideIndex + action) < this.fotos.length) {
      object1 = {
        path: this.fotos[this.slideIndex + action].path,
      };
      this.slideIndex += action;
    }
    else if (action == 1) {
      object1 = {
        path: this.fotos[0].path,
      };
      this.slideIndex = 0;
    }
    else{
      object1 = {
        path: this.fotos[this.fotos.length - 1].path,
      };
      this.slideIndex = this.fotos.length - 1;
    }

    this.fotoVisualizar = [];
    this.fotoVisualizar.push(object1);
  }


  openUserForm() {
    this.dialog.open(UserFormComponent, {
      data: {
        mascota: this.data.mascota,
      }
    })
  }

  openProvisorioForm() {
    this.dialog.open(SolicitudProvisorioComponent, {
      data: {
        mascota: this.data.mascota,
      }
    })
  }

  esResponsable(){
    console.log("Repsonsable");
  }

  esParticular(){
    console.log("this.profile", this.profile); 
    if (this.profile == "1"){
      console.log("mascota", this.data.mascota);
      return true;
    } else if (this.profile == "2"){
      return false;
    } else if (this.profile == "3"){
      return false;
    } else if (this.profile == null){
      return false;
    }
  }

  indicarLogueo(){
    if (this.profile == null){
      return true;
    } else {return false;}
  }

  goToSesion(){
    this.dialog.closeAll();
    this.router.navigate(['/inicio-sesion']);
  }

  
}