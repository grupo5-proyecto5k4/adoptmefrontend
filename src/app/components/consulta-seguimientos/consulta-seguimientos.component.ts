import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificacionService } from 'src/services/notificacion.service';

@Component({
  selector: 'app-consulta-seguimientos',
  templateUrl:'./consulta-seguimientos.component.html',
  styleUrls: ['./consulta-seguimientos.component.scss']
})
export class ConsultaSeguimientosComponent implements OnInit {
  seguimientos = [];
  accion: any;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private notificacionService: NotificacionService) { }

  ngOnInit(): void {
    this.accion = this.data.accion;

  }

 async cancelarProceso(){


    await this.enviarNotificacionDeBaja()

  }


 async enviarNotificacionDeBaja(){
    if(this.accion.data === 1){
      //this.notificacionService.notificarBajaDeAdopcionAParticular()
    }
    else{
      //this.notificacionService.notificarBajaDeProvisorioAParticular()
    }
  }
}
