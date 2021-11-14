import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { VisualizacionSolicitudesService } from 'src/services/visualizacion-solicitudes';
import { AuthService } from '../auth.service';
import { AlertsService } from 'src/utils/alerts.service';
import { NotificacionService } from 'src/services/notificacion.service';
import { FormularioProvisorio } from 'src/models/IFormularioProvisorio';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-visualizacion-solicitud-provi',
  templateUrl: './visualizacion-solicitud-provi.component.html',
  styleUrls: ['./visualizacion-solicitud-provi.component.scss']
})
export class VisualizacionSolicitudProviComponent implements OnInit {

  SolicitudForm: any;
  opcionesVivienda: string[] = ['Casa', 'Departamento'];
  idSolicitud: string;
  isLoading: Boolean = false;
  dataSolicitud: any;
  dataSolicitante: any;
  dataAnimal: any;
  seguimientoChecked = false;
  seguimientoSolicitud = false;
  observacionExplicacion;
  isFechaFinLoaded = false;
  
    // Date picker ------------------
    today = new Date();

    // since tomorrow
    numberOfDays = 1;
    //minDate = new Date().setDate(this.today.getDate() + this.numberOfDays);
    minDate = new Date(new Date().setHours(new Date().getHours() + 24))
    // until 1 year
    reportesFlag: boolean = false;
    maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    // -----------------------
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dateAdapter: DateAdapter<Date>, public dialog: MatDialog, private notificacionService: NotificacionService, public visualizacionSolicitudesService: VisualizacionSolicitudesService, private auth: AuthService, private alertsService: AlertsService) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  
  ngOnInit(): void {
    var dataAnimal = this.data.solicitud.Animales;
    var dataSolicitud = this.data.solicitud.Solicitud;
    var dataSolicitante = this.data.solicitud.Solicitante;
    this.dataSolicitud = dataSolicitud;
    this.dataAnimal = dataAnimal;
    this.dataSolicitante = dataSolicitante;


    if (this.dataSolicitud.estadoId != "Abierta"){
          // Formato fecha   
    var date = this.dataSolicitud.fechaFinProvisorio.substring(0, 10);
    var [yyyy, mm, dd] = date.split("-");
    var revdate = `${dd}-${mm}-${yyyy}`;
    this.dataSolicitud.fechaFinProvisorioString = revdate;
    } 

    //SolicitudId
    this.idSolicitud = this.data.solicitud.Solicitud._id;
    //camposOpcionales
    if (dataSolicitud.Direccion.numero == null) {
      this.data.solicitud.Solicitud.Direccion.numero = "No especificado"
    }
    if (dataSolicitante.facebook == null) {
      this.data.solicitud.Solicitante.facebook = "No especificado"
    }
    if (dataSolicitante.instagram == null) {
      this.data.solicitud.Solicitante.instagram = "No especificado"
    }

    if (this.dataSolicitud.observacionCancelacion != "" || this.dataSolicitud.observacionCancelacion != null ){
      this.observacionExplicacion = this.dataSolicitud.observacionCancelacion;
    }

    //camposBooleanos
    if (dataSolicitud.fechaFinProvisorio != undefined || dataSolicitud.fechaFinProvisorio != null){
      this.isFechaFinLoaded = true;
    } 

    // Vivienda 0:casa/1:depto
    console.log("vivienda", dataSolicitud.vivienda)
    if (dataSolicitud.vivienda === 0) {
      this.data.solicitud.Solicitud.viviendaString = "Casa"
    } else { this.data.solicitud.Solicitud.viviendaString = "Departamento" }

    // Permiso mascotas en vivienda 0:No/1:Si
    if (dataSolicitud.permiso === 1) {
      this.data.solicitud.Solicitud.permisoString = "Sí"
    } else {
      this.data.solicitud.Solicitud.permisoString = "No"
    }

    // Espacio abierto 0:Balcon,/1:Patio/2:P,B/3:Ninguno
    if (dataSolicitud.espacioAbierto === 0) {
      dataSolicitud.espacioAbiertoString = "Balcón"
    } else if (dataSolicitud.espacioAbierto === 1) {
      dataSolicitud.espacioAbiertoString = "Patio"
    }
    else if (dataSolicitud.espacioAbierto === 2) { dataSolicitud.espacioAbiertoString = "Patio y Balcón" }
    else if (dataSolicitud.espacioAbierto === 3) {
      dataSolicitud.espacioAbiertoString = "No posee"
    }

    // Tiene otras mascotas 0:No/1:Si
    if (dataSolicitud.otraMascota === 1) {
      dataSolicitud.otraMascotaString = "Sí"
    } else {
      dataSolicitud.otraMascotaString = "No"
    }

    // Tiene tiempo 0:No/1:Sí
    if (dataSolicitud.tiempoSuficiente === 1) {
      this.data.solicitud.Solicitud.tiempoSuficienteString = "Sí"
    } else {
      this.data.solicitud.Solicitud.tiempoSuficienteString = "No"
    }

    // Seguimiento
    if (dataSolicitud.seguimiento === 1) {
      this.data.solicitud.Solicitud.seguimientoString = "De acuerdo";
      this.seguimientoSolicitud = true;
    } else {
      this.data.solicitud.Solicitud.seguimientoString = "En desacuerdo"
    }

    // Quiere cubrir gastos
    if (dataSolicitud.gastosCubiertos === 1) {
      this.data.solicitud.Solicitud.gastosCubiertosString = "Sí"
    } else {
      this.data.solicitud.Solicitud.gastosCubiertosString = "No"
    }

    // Tiempo de provisorio
    if (dataSolicitud.tiempoTenencia === 0) {
      dataSolicitud.tiempoTenenciaString = "7 días"
    } else if (dataSolicitud.tiempoTenencia === 1) {
      dataSolicitud.tiempoTenenciaString = "14 días"
    }
    else if (dataSolicitud.tiempoTenencia === 2) { dataSolicitud.tiempoTenenciaString = "Un Mes" }
    else if (dataSolicitud.tiempoTenencia === 3) {
      dataSolicitud.tiempoTenenciaString = "Indefinido"
    }


    //nombreSolicitante
    this.data.solicitud.Solicitante.nombreSolicitante = this.data.solicitud.Solicitante.nombre + " " + this.data.solicitud.Solicitante.apellido;

    this.SolicitudForm = new FormGroup({
      nombreMascota: new FormControl({ value: dataAnimal.nombreMascota, disabled: true }),
      fechaSolicitud: new FormControl({ value: this.data.solicitud.fechaSolicitud, disabled: true }),
      vivienda: new FormControl({ value: dataSolicitud.viviendaString, disabled: true }),
      nombreSolicitante: new FormControl({ value: dataSolicitante.nombreSolicitante, disabled: true }),
      calle: new FormControl({ value: dataSolicitud.Direccion.calle, disabled: true }),
      altura: new FormControl({ value: dataSolicitud.Direccion.numero, disabled: true }),
      localidad: new FormControl({ value: dataSolicitud.Direccion.localidad, disabled: true }),
      barrio: new FormControl({ value: dataSolicitud.Direccion.barrio, disabled: true }),
      referencia: new FormControl({ value: dataSolicitud.Direccion.referencia, disabled: true }),
      telefono: new FormControl({ value: dataSolicitante.telefono, disabled: true }),
      email: new FormControl({ value: dataSolicitante.email, disabled: true }),
      instagram: new FormControl({ value: dataSolicitante.instagram, disabled: true }),
      facebook: new FormControl({ value: dataSolicitante.facebook, disabled: true }),
      permiso: new FormControl({ value: dataSolicitud.permisoString, disabled: true }),
      espacioAbierto: new FormControl({ value: dataSolicitud.espacioAbiertoString, disabled: true }),
      descripcionCercamiento: new FormControl({ value: dataSolicitud.descripcionCercamiento, disabled: true }),
      otraMascota: new FormControl({ value: dataSolicitud.otraMascotaString, disabled: true }),
      descripcionOtraMascota: new FormControl({ value: dataSolicitud.descripcionOtraMascota, disabled: true }),
      tiempoSuficiente: new FormControl({ value: dataSolicitud.tiempoSuficienteString, disabled: true }),
      seguimiento: new FormControl({ value: dataSolicitud.seguimientoString, disabled: true }),
      gastosCubiertos: new FormControl({ value: dataSolicitud.gastosCubiertosString, disabled: true }),
      tiempoTenencia: new FormControl({ value: dataSolicitud.tiempoTenenciaString, disabled: true }),
      frecuencia: new FormControl('', [Validators.required]),
      fechaFinProvisorio: new FormControl('', [Validators.required]),
      fechaFinProvisorioString: new FormControl({ value: dataSolicitud.fechaFinProvisorioString, disabled:true},[Validators.required]),
      comentario: new FormControl(''),
      comentarioRespuesta: new FormControl({ value: this.dataSolicitud.observacionCancelacion, disabled:true}),
      motivo: new FormControl(''),
      cancelacionMotivoSolicitante: new FormControl({ value: this.dataSolicitud.cancelacionMotivoSolicitante, disabled:true})
    });

    if (!this.faltaAceptar()) {
      let frecuencia = 'No se realizará seguimiento';
      if (dataSolicitud.cadaCuanto !== null && dataSolicitud.cadaCuanto !== undefined) {
        if (dataSolicitud.cadaCuanto == 7) {
          frecuencia = 'Cada 1 semana'
        }
        else if (dataSolicitud.cadaCuanto == 14) {
          frecuencia = 'Cada 2 semanas'
        }
      }
      this.SolicitudForm.controls['frecuencia'].setValue(frecuencia);
      this.SolicitudForm.controls['frecuencia'].disable();
    }
  }


  faltaAceptar() {
    return (this.dataSolicitud.estadoId == 'Abierta' && this.auth.getCurrentUser()._id == this.dataAnimal.responsableId)
  }

  faltaConfirmar() {
    return (this.dataSolicitud.estadoId == 'Aprobado Por Responsable' && this.auth.getCurrentUser()._id == this.dataSolicitud.solicitanteId)
  }

    // ACEPTACIÓN POR PARTE DEL CENTRO/RESPONSABLE A LA SOLICITUD CARGADA POR EL SOLICITANTE
  async aceptarSolicitud() {
    if ((!this.seguimientoChecked && this.SolicitudForm.controls.fechaFinProvisorio.value !== '') || (this.seguimientoChecked && this.SolicitudForm.controls.fechaFinProvisorio.value !== '' && this.SolicitudForm.controls.frecuencia.value !== '' && !this.validarFrecuencia())) {
      this.isLoading = true;
      var solicitud: FormularioProvisorio = new FormularioProvisorio();
      solicitud._id = this.idSolicitud;
      solicitud.observacion = this.SolicitudForm.controls.comentario.value;
      solicitud.fechaFinProvisorio = this.SolicitudForm.controls.fechaFinProvisorio.value;
      if (this.seguimientoChecked){
        var y: number = +this.SolicitudForm.controls.frecuencia.value;
        solicitud.cadaCuanto = y;
        //this.visualizacionSolicitudesService.actualizarSolicitudProvisorio(solicitud, this.auth.getToken()).subscribe(async soli => { })
      } 
        //this.visualizacionSolicitudesService.actualizarSolicitudProvisorio(solicitud, this.auth.getToken()).subscribe(async soli => { })
      // Añade fecha de fin de provisorio y acepta/rechaza solicitud
      console.log("AceptarSolicitud()", solicitud);
      this.visualizacionSolicitudesService.confirmarSolicitud(solicitud, this.auth.getToken()).subscribe(async dataProvi => {
        this.data = dataProvi;
        this.notificacionService.notificarConfirmacionProvisorioAParticular(this.dataAnimal.nombreMascota, this.idSolicitud, this.dataSolicitud.solicitanteId, this.auth.getToken())
        this.alertsService.confirmMessage("La solicitud ha sido aceptada").then((result) => window.location.href = '/solicitudes')
          , () => {
            this.alertsService.errorMessage("En estos momentos no se puede aceptar la solicitud");
            this.isLoading = false;
          }
      })
    }
  }

/*
  async aceptarSolicitud() {
    if (!this.seguimientoChecked || (this.seguimientoChecked && this.SolicitudForm.controls.frecuencia.value != '' && !this.validarFrecuencia())) {
      this.isLoading = true;
      console.log(this.data.solicitud.Animales.nombreMascota + " " + this.idSolicitud + ' ' + this.data.solicitud.solicitanteId)
      this.visualizacionSolicitudesService.confirmarSolicitud(this.idSolicitud, this.auth.getToken()).subscribe(async dataProvi => {
        this.data = dataProvi;
        let solicitud: FormularioProvisorio = new FormularioProvisorio();
        solicitud._id = this.idSolicitud;
        solicitud.cadaCuanto = this.SolicitudForm.controls.frecuencia.value;
        this.notificacionService.notificarConfirmacionProvisorioAParticular(this.dataAnimal.nombreMascota, this.idSolicitud, this.dataSolicitud.solicitanteId, this.auth.getToken())
        this.visualizacionSolicitudesService.actualizarSolicitud(this.idSolicitud, this.auth.getToken()).subscribe(async solicitud => {
          this.alertsService.confirmMessage("La solicitud ha sido aceptada").then((result) => window.location.href = '/solicitudes')
            , () => {
              this.alertsService.errorMessage("En estos momentos no se puede aceptar la solicitud");
              this.isLoading = false;
            }
        })
      })
    }
  }

*/

  // RECHAZO POR PARTE DEL CENTRO/RESPONSABLE A LA SOLICITUD CARGADA POR EL SOLICITANTE
  async rechazarSolicitud() {
    let solicitud: FormularioProvisorio = new FormularioProvisorio();
    solicitud._id = this.idSolicitud;
    solicitud.observacion = this.SolicitudForm.controls.comentario.value;
    this.isLoading = true;
    this.visualizacionSolicitudesService.rechazarSolicitud(solicitud, this.auth.getToken()).subscribe(dataProvi => {
      this.data = dataProvi;
      this.notificacionService.notificarCancelacionProvisorioAParticular(this.dataAnimal.nombreMascota, this.idSolicitud, this.dataSolicitud.solicitanteId, this.auth.getToken());
      this.alertsService.confirmMessage("La solicitud ha sido rechazada").then((result) => window.location.href = '/solicitudes')
        , () => {
          this.alertsService.errorMessage("En estos momentos no se puede rechazar la solicitud");
          this.isLoading = false;
        }
    })
  }

  async confirmarSolicitud() {
    //var solicitud;
    //solicitud._id = this.idSolicitud;
    //console.log("confirmarSolicitud()", solicitud);
    
    this.isLoading = true;
    let solicitud: FormularioProvisorio = new FormularioProvisorio();
    solicitud._id = this.idSolicitud;
    solicitud.motivo = this.SolicitudForm.controls.motivo.value;
    this.visualizacionSolicitudesService.confirmarSolicitud(solicitud, this.auth.getToken()).subscribe(dataProvi => {
      this.data = dataProvi;
      this.notificacionService.notificarConfirmacionProvisorioACentro(this.dataAnimal.nombreMascota, this.dataSolicitante.nombre + ' ' + this.dataSolicitante.apellido, this.idSolicitud, this.dataSolicitud.responsableId, this.auth.getToken());
      this.alertsService.confirmMessage("La solicitud ha sido confirmada").then((result) => window.location.href = '/solicitudes')
        , () => {
          this.alertsService.errorMessage("En estos momentos no se puede confirmar la solicitud");
          this.isLoading = false;
        }
    })


  }

  SeguimientoChange() {
    this.seguimientoChecked = !this.seguimientoChecked;
  }

  validarFrecuencia(){
    let tiempo_provisorio: number;
    if (this.dataSolicitud.tiempoTenencia == 0){
      tiempo_provisorio = 7;
    }
    else if(this.dataSolicitud.tiempoTenencia == 1){
      tiempo_provisorio = 14;
    }
    else if(this.dataSolicitud.tiempoTenencia == 2){
      tiempo_provisorio = 30;
    }
    else{
      tiempo_provisorio = 999;
    }
    
    return ((this.SolicitudForm.controls.frecuencia.value >= tiempo_provisorio)&&(this.SolicitudForm.controls.frecuencia.value != ''))
  }

  confirmado() {
    return (this.dataSolicitud.estadoId == 'Aprobado' && this.auth.getCurrentUser()._id == this.dataAnimal.responsableId)
  }

  rechazado() {
    return (this.dataSolicitud.estadoId == 'Suspendido por Solicitante' && this.auth.getCurrentUser()._id == this.dataAnimal.responsableId)
  }

  validateInitialDate() {
    return (this.SolicitudForm.get('fechaFinProvisorio').touched && (this.SolicitudForm.controls.fechaFinProvisorio.value == ""));
  }

  validateButton() {
    console.log("Formulario", this.SolicitudForm);
    if ((!this.seguimientoChecked && this.SolicitudForm.controls.fechaFinProvisorio.value !== '') || (this.seguimientoChecked && this.SolicitudForm.controls.fechaFinProvisorio.value !== '' && this.SolicitudForm.controls.frecuencia.value !== '' && !this.validarFrecuencia())) {
      document.getElementById("confirmar").classList.remove("buttonDisabled");
    } else {
      document.getElementById("confirmar").classList.add("buttonDisabled");
    }
  }

  async rechazarSolicitudAprobada() {
    this.isLoading = true;
    let solicitud: FormularioProvisorio = new FormularioProvisorio();
    solicitud._id = this.idSolicitud;
    solicitud.motivo = this.SolicitudForm.controls.motivo.value;
    this.visualizacionSolicitudesService.rechazarSolicitud(solicitud, this.auth.getToken()).subscribe(dataProvi => {
      this.data = dataProvi;
      this.notificacionService.notificarCancelacionProvisorioACentro(this.dataAnimal.nombreMascota, this.dataSolicitante.nombre + ' ' + this.dataSolicitante.apellido, this.idSolicitud, this.dataSolicitud.responsableId, this.auth.getToken());
      this.alertsService.confirmMessage("La solicitud ha sido rechazada").then((result) => window.location.href = '/solicitudes')
        , () => {
          this.alertsService.errorMessage("En estos momentos no se puede rechazar la solicitud");
          this.isLoading = false;
        }
    })
  }

  faltaRechazar() {
    return (this.auth.getCurrentUser()._id == this.dataSolicitud.solicitanteId)
  }


}
