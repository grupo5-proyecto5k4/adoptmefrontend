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
  seguimientos: any;
  accion: any;
  mascota: any;
  proceso = "";
  solicitud: any;
  fotos: any = [];
  fotoVisualizar: any = [];
  slideIndex = 0;

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


    if (this.seguimientos.length > 0) {
      if (this.seguimientos.Visita.length > 0){
      for (let x = 0; x < (this.seguimientos.Visita.length); x++) {
        // Edad 
        if (this.seguimientos.Visita[x].visitaFotos.length > 0) {
          //Recorro imágenes
          for (let i = 0; i < this.seguimientos.Visita[x].visitaFotos.length; i++) {
            // Foto Principal
         //   if (this.seguimientos.Visita[x].visitaFotos[i].esPrincipal) {
              this.seguimientos.Visita[x].imagenCard = this.seguimientos.Visita[x].Foto[i].foto;

              const object1 = {
                path: this.seguimientos.Visita[x].imagenCard
              };
              if (this.seguimientos.Visita[x].imagenCard.esPrincipal) {
                this.seguimientos.Visita[x].fotos.unshift(object1);
                this.fotoVisualizar = [];
                this.fotoVisualizar.push(object1);
              }
              else {
                this.seguimientos.Visita[x].push(object1);
              }

         //   }
          }
        }
      }
    }
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
