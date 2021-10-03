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


@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})

export class UserProfileModalComponent implements OnInit {
  ProfileForm: FormGroup;
  currentUser: any;
  Titulo = "Perfil de usuario"

  constructor(private authservice: AuthService, @Inject(MAT_DIALOG_DATA) public data: any, private alertsService: AlertsService, private router: Router) {

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

    this.ProfileForm = new FormGroup({
      nombres: new FormControl({ value: this.currentUser.nombres, disabled: true }),
      apellidos: new FormControl({ value: this.currentUser.apellidos, disabled: true }),
      dni: new FormControl({ value: '', disabled: true }),
      fechaNacimiento: new FormControl({ value: '', disabled: true }),
      correoElectronico: new FormControl({ value: this.currentUser.correoElectronico, disabled: true }),
      calle: new FormControl({ value: '', disabled: true }),
      altura: new FormControl({ value: '', disabled: true }),
      localidad: new FormControl({ value: '', disabled: true }),
      barrio: new FormControl({ value: '', disabled: true }),
      referencia: new FormControl({ value: '', disabled: true }),
      numeroContacto: new FormControl({ value: this.currentUser.numeroContacto, disabled: true }),
      facebook: new FormControl({ value: this.currentUser.facebook, disabled: true }),
      instagram: new FormControl({ value: this.currentUser.instagram, disabled: true }),
      contrasenia: new FormControl({ value: this.currentUser.pwd, disabled: true })
    });

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

    if (this.currentUser.dni !== "No especificado") {
      this.ProfileForm.controls['dni'].setValue(this.currentUser.dni);
      this.ProfileForm.controls['fechaNacimiento'].setValue(this.currentUser.fechaNacimiento);
      }


  }
}