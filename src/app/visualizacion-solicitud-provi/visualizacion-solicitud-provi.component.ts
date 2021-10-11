import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { VisualizacionSolicitudesService } from 'src/services/visualizacion-solicitudes';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-visualizacion-solicitud-provi',
  templateUrl: './visualizacion-solicitud-provi.component.html',
  styleUrls: ['./visualizacion-solicitud-provi.component.scss']
})
export class VisualizacionSolicitudProviComponent implements OnInit {

  SolicitudForm:any;
  opcionesVivienda: string[] = ['Casa', 'Departamento'];
  idSolicitud: string;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public visualizacionSolicitudesService: VisualizacionSolicitudesService, private auth: AuthService) {
  }

  ngOnInit(): void {
    var dataAnimal = this.data.solicitud.Animales;
    var dataSolicitud = this.data.solicitud.Solicitud;
    var dataSolicitante = this.data.solicitud.Solicitante;

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

    //camposBooleanos

    // Vivienda 0:casa/1:depto
    console.log("vivienda", dataSolicitud.vivienda)
    if (dataSolicitud.vivienda === 0){
      this.data.solicitud.Solicitud.viviendaString = "Casa"
    } else { this.data.solicitud.Solicitud.viviendaString = "Departamento"}

    // Permiso mascotas en vivienda 0:No/1:Si
    if (dataSolicitud.permiso === 1){
      this.data.solicitud.Solicitud.permisoString = "Sí"
    } else {
      this.data.solicitud.Solicitud.permisoString = "No"
    }

    // Espacio abierto 0:Balcon,/1:Patio/2:P,B/3:Ninguno
    if (dataSolicitud.espacioAbierto === 0){
      dataSolicitud.espacioAbiertoString = "Balcón"
    } else if (dataSolicitud.espacioAbierto === 1){
      dataSolicitud.espacioAbiertoString = "Patio"}
      else if (dataSolicitud.espacioAbierto === 2)
      {dataSolicitud.espacioAbiertoString = "Patio y Balcón"}
      else if (dataSolicitud.espacioAbierto === 3){
        dataSolicitud.espacioAbiertoString = "No posee"
    }

    // Tiene otras mascotas 0:No/1:Si
    if (dataSolicitud.otraMascota === 1){
      dataSolicitud.otraMascotaString = "Sí"
    } else {
      dataSolicitud.otraMascotaString = "No"
    }
    
    // Tiene tiempo 0:No/1:Sí
    if (dataSolicitud.tiempoSuficiente === 1){
      this.data.solicitud.Solicitud.tiempoSuficienteString = "Sí"
    } else {
      this.data.solicitud.Solicitud.tiempoSuficienteString = "No"
    }

    // Seguimiento
    if (dataSolicitud.seguimiento === 1){
      this.data.solicitud.Solicitud.seguimientoString = "De acuerdo"
    } else {
      this.data.solicitud.Solicitud.seguimientoString = "En desacuerdo"
    }

    // Quiere cubrir gastos
    if (dataSolicitud.gastosCubiertos === 1){
      this.data.solicitud.Solicitud.gastosCubiertosString = "Sí"
    } else {
        this.data.solicitud.Solicitud.gastosCubiertosString = "No"
    }

    // Tiempo de provisorio
    if (dataSolicitud.tiempoTenencia === 0){
      dataSolicitud.tiempoTenenciaString = "7 días"
    } else if (dataSolicitud.tiempoTenencia === 1){
      dataSolicitud.tiempoTenenciaString = "14 días"}
      else if (dataSolicitud.tiempoTenencia === 2)
      {dataSolicitud.tiempoTenenciaString = "Un Mes"}
      else if (dataSolicitud.tiempoTenencia === 3){
        dataSolicitud.tiempoTenenciaString = "Indefinido"
    }


    //nombreSolicitante
    this.data.solicitud.Solicitante.nombreSolicitante = this.data.solicitud.Solicitante.nombre + " " + this.data.solicitud.Solicitante.apellido;

    this.SolicitudForm = new FormGroup({
      nombreMascota: new FormControl({value: dataAnimal.nombreMascota, disabled:true}),
      fechaSolicitud: new FormControl({ value: this.data.solicitud.fechaSolicitud, disabled: true}),
      vivienda: new FormControl({value: dataSolicitud.viviendaString, disabled: true}),
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
      permiso: new FormControl({value: dataSolicitud.permisoString, disabled:true}),
      espacioAbierto: new FormControl({value: dataSolicitud.espacioAbiertoString, disabled:true}),
      descripcionCercamiento: new FormControl({value: dataSolicitud.descripcionCercamiento, disabled:true}),
      otraMascota: new FormControl({value:dataSolicitud.otraMascotaString, disabled:true}),
      descripcionOtraMascota: new FormControl({value: dataSolicitud.descripcionOtraMascota, disabled:true}),
      tiempoSuficiente: new FormControl({value: dataSolicitud.tiempoSuficienteString, disabled:true}),
      seguimiento: new FormControl({value: dataSolicitud.seguimientoString, disabled:true}),
      gastosCubiertos: new FormControl({value: dataSolicitud.gastosCubiertosString, disabled:true}),
      tiempoTenencia: new FormControl({value: dataSolicitud.tiempoTenenciaString, disabled:true})
    });  
  }

  aceptarSolicitud(){
    console.log("aceptar");
    this.visualizacionSolicitudesService.confirmarSolicitudProvisorio(this.auth.getToken(), this.idSolicitud).subscribe(dataProvi => {
      this.data = dataProvi;
      }
  )
  }

  rechazarSolicitud(){
    console.log("rechazar");
    this.visualizacionSolicitudesService.rechazarSolicitudProvisorio(this.auth.getToken(), this.idSolicitud).subscribe(dataProvi => {
      this.data = dataProvi;
      }
  )
  }
}
