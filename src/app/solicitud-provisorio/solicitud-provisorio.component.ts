import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { AlertsService } from 'src/utils/alerts.service';
import { TermsAndConditionsComponent } from 'src/app/terms-and-conditions/terms-and-conditions.component';
import { UserService } from 'src/services/user.service';
import { FormularioProvisorio } from 'src/models/IFormularioProvisorio';
import { Address } from 'src/models/IAddress';
import { AuthService } from 'src/app/auth.service';
import { NotificacionService } from 'src/services/notificacion.service';


@Component({
  selector: 'app-solicitud-provisorio',
  templateUrl: './solicitud-provisorio.component.html',
  styleUrls: ['./solicitud-provisorio.component.scss']
})

export class SolicitudProvisorioComponent implements OnInit {
  UserForm: FormGroup;
  Titulo = "Solicitud de provisorio";
  siNo: string[] = ['Sí', 'No'];
  opcionesVivienda: string[] = ['Casa', 'Departamento'];
  opcionesPatioBalcon: string[] = ['Patio', 'Balcón', 'Ambos', 'Ninguno'];
  isLoading: Boolean = false;
  otrasMascotasSelected: number;
  viviendaSelected: number;
  seguimientoSelected: number;
  balconSelected: number;
  permisoEdificioSelected: number;
  TerminosChecked = false;

  tiempoSuficienteSelected: number;
  
  opcionesDuracion = ["7 días", "14 días", "1 mes", "Indefinido"];
  duracionSelected: number;
  presupuestoSelected: number;


  constructor(private alertsService: AlertsService, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private notificacionService: NotificacionService, private dialog: MatDialog,private userService: UserService, private dialogref: MatDialogRef<SolicitudProvisorioComponent>) { }

  ngOnInit() {
    this.UserForm = new FormGroup({
      descripcionOtraMascota: new FormControl('', [Validators.maxLength(250)]),
      descripcionCercamiento: new FormControl(''),
      localidad: new FormControl({value: 'Córdoba Capital', disabled: true}),
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

  radioPermisoEdificioChange(value: string) {
    this.permisoEdificioSelected = this.siNoFuncion(value);
  }

  radioTiempoSuficienteChange(value: string){
    this.tiempoSuficienteSelected = this.siNoFuncion(value);
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
    this.updateCercamientoValidator();
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

  radioDuracionChange(value: string) {
    let answer: number;
    switch (value) {
      case this.opcionesDuracion[0]: { //7 días
        answer = 1;
        break;
      }
      case this.opcionesDuracion[1]: { //14 días
        answer = 0;
        break;
      }
      case this.opcionesDuracion[2]: { //1 mes
        answer = 2;
        break;
      }
      case this.opcionesDuracion[3]: { //Indefinido
        answer = 3;
        break;
      }
    }
    this.duracionSelected = answer;
  }

  radioPresupuestoChange(value: string) {
    this.presupuestoSelected = this.siNoFuncion(value);
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


  allRadioSelected(){
    return (this.viviendaSelected !== undefined && this.otrasMascotasSelected !== undefined && this.permisoEdificioSelected !== undefined && this.balconSelected != undefined && this.seguimientoSelected !== undefined && this.duracionSelected != undefined && this.TerminosChecked && this.tiempoSuficienteSelected != undefined && this.presupuestoSelected != undefined)
  }

  async signup() {
    console.log("Todos seleccionados?", this.allRadioSelected());
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
      let formulario: FormularioProvisorio = new FormularioProvisorio();
      formulario.otraMascota = this.otrasMascotasSelected;
      if (this.otrasMascotasSelected == 1 && this.UserForm.controls.descripcionOtraMascota.value !== "") {
        formulario.descripcionOtraMascota = this.UserForm.controls.descripcionOtraMascota.value;
      }
      if (this.balconSelected !== 3 && this.UserForm.controls.descripcionCercamiento.value !== "") {
        formulario.descripcionCercamiento = this.UserForm.controls.descripcionCercamiento.value;
      }

      formulario.gastosCubiertos = this.presupuestoSelected;
      formulario.seguimiento = this.seguimientoSelected;
      formulario.vivienda = this.viviendaSelected;
      formulario.permiso = this.permisoEdificioSelected;
      formulario.tiempoTenencia = this.duracionSelected;
      formulario.espacioAbierto = this.balconSelected;
      formulario.tiempoSuficiente = this.tiempoSuficienteSelected;
      formulario.Direccion = userAddress;
      formulario.mascotaId = this.data.mascota._id;

      
      this.userService.registrarFormularioProvisorio(formulario, this.authService.getToken()).subscribe((resp:Data) => {
        console.log(this.data.mascota.nombreMascota+" "+resp._id+" "+this.data.mascota.responsableId);
        this.notificacionService.notificarSolicitudProvisorio(this.data.mascota.nombreMascota,resp._id,this.data.mascota.responsableId, this.authService.getToken())
        this.alertsService.confirmMessage("Su solicitud de provisorio ha sido registrada").then((result) => window.location.href = '/');        
      },
        error => {
          this.alertsService.errorMessage(error.error.error).then((result) => {
            this.isLoading = false;  })
        }
        );
    } 
  }

  async init() {

  }
}