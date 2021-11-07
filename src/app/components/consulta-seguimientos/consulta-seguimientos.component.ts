import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { NotificacionService } from 'src/services/notificacion.service';

@Component({
  selector: 'app-consulta-seguimientos',
  templateUrl:'./consulta-seguimientos.component.html',
  styleUrls: ['./consulta-seguimientos.component.scss']
})
export class ConsultaSeguimientosComponent implements OnInit {
  seguimientos = [];
  accion: any;
  mascota: any;
  proceso = "";
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private notificacionService: NotificacionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.accion = this.data.accion;
    this.mascota = this.data.mascota;

    console.log(this.consultarEstadoMascota())
    if (this.mascota.estado == "Adoptado"){
      this.proceso = "Cancelar adopción"
    }
    else{
      this.proceso = "Cancelar provisorio"
    }

  }

 async cancelarProceso(){


    await this.enviarNotificacionDeBaja()
  }

  consultarEstadoMascota(){
    return (this.mascota.estado=='Adoptado'|| this.mascota.estado=='En provisorio')
  }


 async enviarNotificacionDeBaja(){
    if(this.mascota.estado == "Adoptado"){
      this.notificacionService.notificarBajaDeAdopcionAParticular(this.mascota.nombreMascota, this.mascota._id, this.mascota.responsableId, this.authService.getToken())
    }
    else{
      this.notificacionService.notificarBajaDeProvisorioAParticular(this.mascota.nombreMascota, this.mascota._id, this.mascota.responsableId, this.authService.getToken())
    }
  }
}
