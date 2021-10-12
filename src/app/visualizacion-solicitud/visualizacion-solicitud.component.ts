import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertsService } from 'src/utils/alerts.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-visualizacion-solicitud',
  templateUrl: './visualizacion-solicitud.component.html',
  styleUrls: ['./visualizacion-solicitud.component.scss']
})
export class VisualizacionSolicitudComponent implements OnInit {

  SolicitudForm:any;
  opcionesVivienda: string[] = ['Casa', 'Departamento'];
  rechazoSol:boolean=false;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private alertsService: AlertsService) {
  }

  ngOnInit(): void {

    var dataAnimal = this.data.solicitud.Animales;
    var dataSolicitud = this.data.solicitud.Solicitud;
    var dataSolicitante = this.data.solicitud.Solicitante;

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

    //camposBooleanos

    // Vivienda 0:casa/1:depto
    if (dataSolicitud.vivienda === 0){
      this.data.solicitud.Solicitud.vivienda = "Casa"
    } else { this.data.solicitud.Solicitud.vivienda = "Departamento"}

    // Permiso mascotas en vivienda 0:No/1:Si
    if (dataSolicitud.permiso === 1){
      this.data.solicitud.Solicitud.permiso = "Sí"
    } else {
      this.data.solicitud.Solicitud.permiso = "No"
    }

    // Espacio abierto 0:Balcon,/1:Patio/2:P,B/3:Ninguno
    if (dataSolicitud.espacioAbierto === 0){
      dataSolicitud.espacioAbierto = "Balcón"
    } else if (dataSolicitud.espacioAbierto === 1){
      dataSolicitud.espacioAbierto = "Patio"}
      else if (dataSolicitud.espacioAbierto === 2)
      {dataSolicitud.espacioAbierto = "Patio y Balcón"}
      else if (dataSolicitud.espacioAbierto === 3){
        dataSolicitud.espacioAbierto = "No posee"
    }

    // Tiene otras mascotas 0:No/1:Si
    if (dataSolicitud.otraMascota === 1){
      dataSolicitud.otraMascota = "Sí"
    } else {
      dataSolicitud.otraMascota = "No"
    }
    
    // Tiene tiempo y presupuesto 0:No/1:Sí
    if (dataSolicitud.tiempoPresupuesto === 1){
      this.data.solicitud.Solicitud.tiempoPresupuesto = "Sí"
    } else {
      this.data.solicitud.Solicitud.tiempoPresupuesto = "No"
    }

    // Vacunacion y castracion: 0:Vacunacion/1:Castracion
    if (dataSolicitud.vacunacionCastracion === 0){
      this.data.solicitud.Solicitud.vacunacionCastracion = "Vacunación"
    } else {
      this.data.solicitud.Solicitud.vacunacionCastracion = "Vacunación y Castración"
    }

    // Tiempo solo
    if (dataSolicitud.tiempoSolo === 0){
      dataSolicitud.tiempoSolo = "Entre 1 a 3 horas"
    } else if ( dataSolicitud.tiempoSolo === 1){
      dataSolicitud.tiempoSolo = "Entre 4 a 8 horas"
    } else {
      dataSolicitud.tiempoSolo = "Más de 8 horas"
    }

    // Seguimiento
    if (dataSolicitud.seguimiento === 1){
      this.data.solicitud.Solicitud.seguimiento = "De acuerdo"
    } else {
      this.data.solicitud.Solicitud.seguimiento = "En desacuerdo"
    }


    //nombreSolicitante
    this.data.solicitud.Solicitante.nombreSolicitante = this.data.solicitud.Solicitante.nombre + " " + this.data.solicitud.Solicitante.apellido;

    this.SolicitudForm = new FormGroup({
      nombreMascota: new FormControl({value: dataAnimal.nombreMascota, disabled:true}),
      fechaSolicitud: new FormControl({ value: "27/07/2009", disabled: true}),
      vivienda: new FormControl({value: dataSolicitud.vivienda, disabled: true}),
      nombreSolicitante: new FormControl({value: dataSolicitante.nombreSolicitante, disabled:true}),
      calle: new FormControl({value: dataSolicitud.Direccion.calle, disabled:true}),
      altura: new FormControl({value: dataSolicitud.Direccion.numero, disabled:true}),
      localidad: new FormControl({value: dataSolicitud.Direccion.localidad, disabled:true}),
      barrio: new FormControl({value: dataSolicitud.Direccion.barrio, disabled:true}),
      referencia: new FormControl({value: dataSolicitud.Direccion.referencia, disabled:true}),
      telefono: new FormControl({value: dataSolicitante.telefono, disabled:true}),
      email: new FormControl({value: dataSolicitante.email, disabled:true}),
      instagram: new FormControl({value: dataSolicitante.instagram, disabled:true}),
      facebook: new FormControl({value: dataSolicitante.facebook, disabled:true}),
      permiso: new FormControl({value: dataSolicitud.permiso, disabled:true}),
      espacioAbierto: new FormControl({value: dataSolicitud.espacioAbierto, disabled:true}),
      descripcionCercamiento: new FormControl({value: dataSolicitud.descripcionCercamiento, disabled:true}),
      composicionFamilia: new FormControl({value: dataSolicitud.composicionFamilia, disabled:true}),
      otraMascota: new FormControl({value:dataSolicitud.otraMascota, disabled:true}),
      descripcionOtraMascota: new FormControl({value: dataSolicitud.descripcionOtraMascota, disabled:true}),
      tiempoPresupuesto: new FormControl({value: dataSolicitud.tiempoPresupuesto, disabled:true}),
      vacunacionCastracion: new FormControl({value: dataSolicitud.vacunacionCastracion, disabled:true}),
      tiempoSolo: new FormControl({value: dataSolicitud.tiempoSolo, disabled:true}),
      seguimiento: new FormControl({value: dataSolicitud.seguimiento, disabled:true}),
      accionViaje: new FormControl({value: dataSolicitud.accionViaje , disabled:true}),
      accionImpedimento: new FormControl({value: dataSolicitud.accionImpedimento, disabled:true})
    });  
  }

 aceptarSolicitud(){
  
  this.alertsService.confirmMessage("La solicitud ha sido confirmada")
  this.dialog.closeAll();
  
 } 
 
 cancelarSolicitud(){
  this.rechazoSol=true;
   this.alertsService.errorMessage("La solicitud ha sido rechazada")
 }

}
