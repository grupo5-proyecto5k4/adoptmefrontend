import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { RegistrarVisitaComponent } from 'src/app/registrar-visita/registrar-visita.component';
import { MascotaService } from 'src/services/mascota.service';
import { NotificacionService } from 'src/services/notificacion.service';
import { VisualizacionSolicitudesService } from 'src/services/visualizacion-solicitudes';

@Component({
  selector: 'app-consulta-seguimientos',
  templateUrl: './consulta-seguimientos.component.html',
  styleUrls: ['./consulta-seguimientos.component.scss']
})
export class ConsultaSeguimientosComponent implements OnInit {
  seguimientos = [];
  accion: any;
  mascota: any;
  proceso = "";
  solicitud: any;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private visualizarService: VisualizacionSolicitudesService, private mascotaService: MascotaService, private notificacionService: NotificacionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.accion = this.data.accion;
    this.mascota = this.data.mascota;

    this.mascotaService.getSeguimientosAnimal(this.mascota._id, this.authService.getToken()).subscribe(seguimiento => {
      this.seguimientos = seguimiento;
    });

    if (this.mascota.estado == "Adoptado") {
      this.proceso = "Cancelar adopción"
    }
    else {
      this.proceso = "Cancelar provisorio"
    }

  }

  async cancelarProceso(seguimiento) {
    await this.buscarSolicitante(seguimiento.SolicitudId);
    await this.enviarNotificacionDeBaja()
  }

  consultarEstadoMascota() {
    return false; // despues eliminar este false y descomentar la linea de abajo
    //return (this.mascota.estado == 'Adoptado' || this.mascota.estado == 'En provisorio')
  }

  registrarVisita(seguim: any) {
    console.log(seguim)
    this.dialog.open(RegistrarVisitaComponent, {
      data: {
        seguimiento: seguim,
      }
    });

  }


  async enviarNotificacionDeBaja() {



    if (this.mascota.estado == "Adoptado") {
      this.notificacionService.notificarBajaDeAdopcionAParticular(this.mascota.nombreMascota, this.mascota._id, this.solicitud.solicitanteId, this.authService.getToken())
    }
    else {
      this.notificacionService.notificarBajaDeProvisorioAParticular(this.mascota.nombreMascota, this.mascota._id, this.solicitud.Solicitud.solicitanteId, this.authService.getToken())
    }
  }


  async buscarSolicitante(id: string) {
    this.solicitud = await this.visualizarService.getSolicitud(id);
  }
}
