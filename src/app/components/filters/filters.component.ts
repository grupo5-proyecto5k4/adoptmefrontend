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
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent implements OnInit {
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
  tiempoPresupuestoSelected: number;


  constructor(private alertsService: AlertsService, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private notificacionService: NotificacionService, private dialog: MatDialog, private userService: UserService, private dialogref: MatDialogRef<FiltersComponent>) { }

  ngOnInit() {
    this.UserForm = new FormGroup({
      descripcionOtraMascota: new FormControl('', [Validators.maxLength(250)]),
      accionViaje: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      accionImpedimento: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      descripcionCercamiento: new FormControl('', [Validators.maxLength(250)]),
      composicionFamilia: new FormControl('', [Validators.required]),
      localidad: new FormControl({ value: 'Córdoba Capital', disabled: true }),
      street: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      altura: new FormControl('', [Validators.pattern('[0-9]{0,4}')]),
      reference: new FormControl('', [Validators.maxLength(150)]),
      barrio: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
    this.dialogref.disableClose = true;
  }

  close() {
    this.dialogref.close();
  }

  validateInitialDate() {
    return (this.UserForm.get('birthDate').touched && (this.UserForm.controls.birthDate.value == ""));
  }

  validateButton() {
    document.getElementById("confirmado").classList.add("buttonDisabled");
    if (this.UserForm.valid && this.allRadioSelected()) {
      document.getElementById("confirmado").classList.remove("buttonDisabled");
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
    this.updateOtraMascotaValidator();
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
    this.updateCercamientoValidator()
  }

  updateCercamientoValidator() {
    let site_id_control = this.UserForm.controls['descripcionCercamiento'];
    if (this.balconSelected !== 3 && this.balconSelected !== undefined) {
      site_id_control.setValidators(Validators.compose([Validators.required, Validators.maxLength(300)]));
    }
    else {
      site_id_control.setValidators(Validators.compose([Validators.maxLength(300)]));
    }

    site_id_control.updateValueAndValidity();

  }

  updateOtraMascotaValidator() {
    let site_id_control = this.UserForm.controls['descripcionOtraMascota'];
    if (this.otrasMascotasSelected == 1) {
      site_id_control.setValidators(Validators.compose([Validators.required, Validators.maxLength(300)]));
    }
    else {
      site_id_control.setValidators(Validators.compose([Validators.maxLength(300)]));
    }

    site_id_control.updateValueAndValidity();

  }

  radioTiempoPresupuestoChange(value: string) {
    this.tiempoPresupuestoSelected = this.siNoFuncion(value);
  }

  radioSeguimientoChange(value: string) {
    this.seguimientoSelected = this.siNoFuncion(value);
  }

  TerminosCheckedChange() {
    this.TerminosChecked = !this.TerminosChecked;
  }

  openTermsAndConditions() {
    this.dialog.open(TermsAndConditionsComponent);
  }

  siNoFuncion(value: string) {
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

  allRadioSelected() {
    return (this.viviendaSelected !== undefined && this.otrasMascotasSelected !== undefined && this.permisoEdificioSelected !== undefined && this.balconSelected != undefined && this.seguimientoSelected !== undefined && this.vacunacionSelected != undefined && this.tiempoSoloSelected !== undefined && this.TerminosChecked)
  }

  async signup() {
    if (this.UserForm.valid && this.allRadioSelected()) {
      this.isLoading = true;

      //Acá seteamos los valores de la dirección
      let userAddress: Address = new Address();
      userAddress.calle = this.UserForm.controls.street.value;
      userAddress.numero = this.UserForm.controls.altura.value;
      userAddress.referencia = this.UserForm.controls.reference.value;
      userAddress.localidad = "Córdoba Capital";
      userAddress.barrio = this.UserForm.controls.barrio.value;

      //Acá seteamos los valores del formulario
      let formulario: FormularioAdopcion = new FormularioAdopcion();
      formulario.otraMascota = this.otrasMascotasSelected;
      if (this.UserForm.controls.descripcionOtraMascota.value !== "") {
        formulario.descripcionOtraMascota = this.UserForm.controls.descripcionOtraMascota.value;
      }
      if (this.UserForm.controls.descripcionCercamiento.value !== "") {
        formulario.descripcionCercamiento = this.UserForm.controls.descripcionCercamiento.value;
      }
      formulario.tiempoSolo = this.tiempoSoloSelected;
      formulario.tiempoPresupuesto = this.tiempoPresupuestoSelected;
      formulario.accionViaje = this.UserForm.controls.accionViaje.value;
      formulario.vacunacionCastracion = this.vacunacionSelected;
      formulario.seguimiento = this.seguimientoSelected;
      formulario.vivienda = this.viviendaSelected;
      formulario.permiso = this.permisoEdificioSelected;
      formulario.espacioAbierto = this.balconSelected;
      formulario.Direccion = userAddress;
      formulario.mascotaId = this.data.mascota._id;
      formulario.accionImpedimento = this.UserForm.controls.accionImpedimento.value;
      formulario.composicionFamilia = this.UserForm.controls.composicionFamilia.value;


      this.userService.registrarFormularioAdopcion(formulario, this.authService.getToken()).subscribe((resp: Data) => {
        this.notificacionService.notificarSolicitudAdopcion(this.data.mascota.nombreMascota, this.data.mascota.responsableId, resp._id, this.authService.getToken())
        this.alertsService.confirmMessage("Su solicitud de adopción ha sido registrada").then((result) => window.location.href = '/');
      },
        error => {
          this.alertsService.errorMessage(error.error.error).then((result) => {
            this.isLoading = false;
          })
        }
      );
    }
  }

  async init() {

  }
}