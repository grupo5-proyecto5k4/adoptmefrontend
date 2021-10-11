import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VisualizacionSolicitudesService} from 'src/services/visualizacion-solicitudes';
import { AuthService } from '../auth.service';
import { VisualizacionSolicitudComponent } from '../visualizacion-solicitud/visualizacion-solicitud.component';
import { VisualizacionSolicitudProviComponent } from '../visualizacion-solicitud-provi/visualizacion-solicitud-provi.component';
@Component({
  selector: 'app-listado-solicitudes',
  templateUrl: './listado-solicitudes.component.html',
  styleUrls: ['./listado-solicitudes.component.scss']
})
export class ListadoSolicitudesComponent implements OnInit {
  solicitudes:any;
  solicitudesProvi:any;


  constructor(public visualizacionSolicitudesService: VisualizacionSolicitudesService, private dialog: MatDialog, private auth: AuthService) { }

  ngOnInit(): void {

    this.visualizacionSolicitudesService.getSolicitudesAdoptar(this.auth.getToken()).subscribe(data => {
      this.solicitudes = data;

      for (let x = 0 ; x < this.solicitudes.length; x++){

        //Formato fecha de creación de solicitud
        var date = this.solicitudes[x].Solicitud.fechaCreacion.substring(0, 10);
        var [yyyy, mm, dd] = date.split("-");
        var revdate = `${dd}-${mm}-${yyyy}`;
        this.solicitudes[x].fechaSolicitud = revdate;
      }
  })

  
    this.visualizacionSolicitudesService.getSolicitudesProvisorio(this.auth.getToken()).subscribe(dataProvi => {
      this.solicitudesProvi = dataProvi;

      for (let x = 0 ; x < this.solicitudesProvi.length; x++){
        //Formato fecha de creación de solicitud
        var date = this.solicitudesProvi[x].Solicitud.fechaCreacion.substring(0, 10);
        var [yyyy, mm, dd] = date.split("-");
        var revdate = `${dd}-${mm}-${yyyy}`;
        this.solicitudesProvi[x].fechaSolicitud = revdate;
      }
  })
  }

  openSolicitud(soli){
    this.dialog.open(VisualizacionSolicitudComponent, {data: {solicitud: soli}});
  }

  openSolicitudProvi(soli){
    console.log("Datos de la solicitud", soli);
    this.dialog.open(VisualizacionSolicitudProviComponent, {data: {solicitud: soli}});
  }
}
