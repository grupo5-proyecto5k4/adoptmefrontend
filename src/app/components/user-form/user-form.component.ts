import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SignupService } from 'src/services/signup.service';
import { User } from 'src/models/IUser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertsService } from 'src/utils/alerts.service';
import { TermsAndConditionsComponent } from 'src/app/terms-and-conditions/terms-and-conditions.component';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {
  UserForm: FormGroup;
  Titulo = "Solicitud de adopción";
  siNo: string[] = ['Sí', 'No'];
  tiempoSolo: string[] = ['1-3hs', '4-8hs', 'más de 8hs'];
  opcionesVivienda: string[] = ['Casa', 'Departamento'];
  opcionesPatioBalcon: string[] = ['Patio', 'Balcón', 'Ambos', 'Ninguno'];
  opcionesCompromiso: string[] = ['Vacunación', 'Vacunación y castración'];
  isLoading: Boolean = false;
  otrasMascotasSelected: number;
  tiempoSoloSelected: number;
  viviendaSelected: number;
  vacunacionSelected: number;
  seguimientoSelected: number;
  balconSelected: number;
  permisoEdificioSelected: number;
  TerminosChecked = false;


  constructor(private alertsService: AlertsService, private dialog: MatDialog, private dialogref: MatDialogRef<UserFormComponent>) { }

  ngOnInit() {
    this.UserForm = new FormGroup({
      otraMascota: new FormControl('', [Validators.required]),
      descripcionOtraMascota: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      tiempoPresupuesto: new FormControl('', [Validators.required]),
      accionViaje: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      vacunacionCastracion: new FormControl('', [Validators.required]),
      seguimiento: new FormControl('', [Validators.required]),
      vivienda: new FormControl('', [Validators.required]),
      permiso: new FormControl('', [Validators.required]),
      espacioAbierto: new FormControl('', [Validators.required]),
      descripcionCercamiento: new FormControl('', [Validators.required]),
      composicionFamilia: new FormControl('', [Validators.required]),

      street:  new FormControl('', [Validators.required, Validators.maxLength(50)]),
      altura:  new FormControl('', [Validators.pattern('[0-9]{0,4}')]),
      reference: new FormControl('', [Validators.maxLength(150)]),
      barrio: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
    this.dialogref.disableClose = true;
  }

  close(){
    this.dialogref.close();
  }

  validateInitialDate() {
    return (this.UserForm.get('birthDate').touched && (this.UserForm.controls.birthDate.value == ""));
  }

  validateButton() {
    if (this.UserForm.valid) {
      document.getElementById("confirmar").classList.remove("buttonDisabled");
    } else {
      document.getElementById("confirmar").classList.add("buttonDisabled");
    }
  }


  validarCampos() {
    if (this.UserForm.valid && !this.UserForm.pristine) {
      document.getElementById("changePassword").classList.remove('disabledBtnPassword');
    }
    else{
      document.getElementById("changePassword").classList.add('disabledBtnPassword');
  }
  }

  validateCalle() {
    return (((this.UserForm.get('street').touched ||
      this.UserForm.get('street').dirty) &&
      this.UserForm.get('street').errors));
  }

  validateAltura() {
    return (((this.UserForm.get('altura').touched ||
      this.UserForm.get('altura').dirty) &&
      this.UserForm.get('altura').errors));
  }

  validateBarrio() {
    return (((this.UserForm.get('barrio').touched ||
      this.UserForm.get('barrio').dirty) &&
      this.UserForm.get('barrio').errors));
  }

  validatePassword() {
    return (((this.UserForm.get('password').touched ||
      this.UserForm.get('password').dirty) &&
      this.UserForm.get('password').errors));
  }

  radioOtrasMascotasChange(value: string) {
    this.otrasMascotasSelected = this.siNoFuncion(value);
  }

  radioVacunacionChange(value: string) {
    let answer: number;
    switch (value) {
      case this.opcionesCompromiso[0]: { //vacunación
        answer = 0;
        break;
      }
      case this.opcionesCompromiso[1]: { //vacunación y castración
        answer = 1;
        break;
      }
    }
    this.vacunacionSelected = answer;    
  }

  radioPermisoEdificioChange(value: string) {
    this.permisoEdificioSelected = this.siNoFuncion(value);
  }

  radioBalconChange(value: string) {
    let answer: number;
    switch (value) {
      case this.opcionesPatioBalcon[0]: { //patio
        answer = 1;
        break;
      }
      case this.opcionesPatioBalcon[1]: { //balcón
        answer = 0;
        break;
      }
      case this.opcionesPatioBalcon[2]: { //ambos
        answer = 2;
        break;
      }
      case this.opcionesPatioBalcon[3]: { //ninguno
        answer = 3;
        break;
      }
    }
    this.balconSelected = answer;
  }

  radioSeguimientoChange(value: string) {
    this.seguimientoSelected = this.siNoFuncion(value);
  }

  TerminosCheckedChange(){
      this.TerminosChecked = !this.TerminosChecked;
  }

  openTermsAndConditions(){
    this.dialog.open(TermsAndConditionsComponent);
  }

  siNoFuncion(value: string){
    let answer: number;
    switch (value) {
      case this.siNo[0]: { //si
        answer = 1;
        break;
      }
      case this.siNo[1]: { //no
        answer = 0;
        break;
      }
    }
    return answer;
  }


  radioViviendaChange(value: string) {
    let answer: number;
    switch (value) {
      case this.opcionesVivienda[0]: { //casa
        answer = 0;
        break;
      }
      case this.opcionesVivienda[1]: { //departamento
        answer = 1;
        break;
      }
    }
    this.viviendaSelected = answer;
  }

  radioTiempoSoloChange(value: string) {
    let answer: number;
    switch (value) {
      case this.tiempoSolo[0]: { //1-3 hs
        answer = 0;
        break;
      }
      case this.tiempoSolo[1]: { //4-8 hs
        answer = 1;
        break;
      }
      case this.tiempoSolo[2]: { //más de 8 hs
        answer = 2;
        break;
      }
    }
    this.tiempoSoloSelected = answer;
  }


  signup() {
    if (this.UserForm.valid) {
      this.isLoading = true;
      let particularUser: User = new User();
      particularUser.nombres = this.UserForm.controls.name.value;
      particularUser.apellidos = this.UserForm.controls.lastname.value;
      particularUser.correoElectronico = this.UserForm.controls.email.value;
      particularUser.numeroContacto = this.UserForm.controls.contactNumber.value;
      particularUser.dni = this.UserForm.controls.dni.value;
      particularUser.fechaNacimiento = (this.UserForm.controls.birthDate.value).toLocaleString();;
      if (this.UserForm.controls.facebook.value !== "") {
        particularUser.facebook = this.UserForm.controls.facebook.value;
      }
      if (this.UserForm.controls.instagram.value !== "") {
        particularUser.instagram = this.UserForm.controls.instagram.value;
      }

      particularUser.contrasenia = this.UserForm.controls.password.value;
      /*
      this.SignupService.registerUser(particularUser).subscribe({
        complete: () => {
          this.alertsService.confirmMessage("Su cuenta ha sido registrada").then((result) => window.location.href = '/');
        },
        error: (err: any) => {
          this.alertsService.errorMessage(err.error.error).then((result) => {
            this.isLoading = false;
          }
        )
        }
      }) */
    } 
  }

  async init() {

  }
}