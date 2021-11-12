import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VisualizacionSolicitudesService } from 'src/services/visualizacion-solicitudes';
import { AuthService } from '../auth.service';
import { VisualizacionSolicitudComponent } from '../visualizacion-solicitud/visualizacion-solicitud.component';
import { VisualizacionSolicitudProviComponent } from '../visualizacion-solicitud-provi/visualizacion-solicitud-provi.component';
import { LocalStorageService } from 'src/services/local-storage.service';
@Component({
  selector: 'app-listado-solicitudes',
  templateUrl: './listado-solicitudes.component.html',
  styleUrls: ['./listado-solicitudes.component.scss']
})
export class ListadoSolicitudesComponent implements OnInit {
  solicitudes: any;
  solicitudesProvi: any;
  solicitudesRealizadasAdop: any;
  solicitudesRealizadasProv: any;
  isCentro: Boolean = false;


  constructor(private LocalStorageService: LocalStorageService, public visualizacionSolicitudesService: VisualizacionSolicitudesService, private dialog: MatDialog, private auth: AuthService) { }

  ngOnInit(): void {

    if (this.LocalStorageService.getProfile() === 2) {
      this.isCentro = true;
    }

    this.visualizacionSolicitudesService.getSolicitudesAdoptar(this.auth.getToken()).subscribe(data => {
      this.solicitudes = data;

      for (let x = 0; x < this.solicitudes.length; x++) {

        //Formato fecha de creación de solicitud
        var date = this.solicitudes[x].Solicitud.fechaCreacion.substring(0, 10);
        var [yyyy, mm, dd] = date.split("-");
        var revdate = `${dd}-${mm}-${yyyy}`;
        this.solicitudes[x].fechaSolicitud = revdate;

        //Estado de solicitud
        var estado = this.solicitudes[x].Solicitud.estadoId;
        if (estado === "Aprobado Por Responsable"){
          this.solicitudes[x].estado = "Aprobada";
        } else if (estado === "Abierta"){
          this.solicitudes[x].estado = "Pendiente de análisis";
        } else if (estado === "Suspendido por Solicitante"){
          this.solicitudes[x].estado = "Rechazada por solicitante";
        } else if (estado === "Bloqueada"){
          this.solicitudes[x].estado = "Bloqueada";
        } else if (estado === "Aprobado"){
          this.solicitudes[x].estado = "Exitosa";
        } else if (estado === "Suspendido"){
          this.solicitudes[x].estado = "Rechazada por responsable";
        }
      

      }
    })


    this.visualizacionSolicitudesService.getSolicitudesProvisorio(this.auth.getToken()).subscribe(dataProvi => {
      this.solicitudesProvi = dataProvi;

      for (let x = 0; x < this.solicitudesProvi.length; x++) {
        //Formato fecha de creación de solicitud
        var date = this.solicitudesProvi[x].Solicitud.fechaCreacion.substring(0, 10);
        var [yyyy, mm, dd] = date.split("-");
        var revdate = `${dd}-${mm}-${yyyy}`;
        this.solicitudesProvi[x].fechaSolicitud = revdate;

        var estado = this.solicitudesProvi[x].Solicitud.estadoId;
        if (estado === "Aprobado Por Responsable"){
          this.solicitudesProvi[x].estado = "Aprobada";
        } else if (estado === "Abierta"){
          this.solicitudesProvi[x].estado = "Pendiente de análisis";
        } else if (estado === "Suspendido por Solicitante"){
          this.solicitudesProvi[x].estado = "Rechazada por solicitante";
        } else if (estado === "Bloqueada"){
          this.solicitudesProvi[x].estado = "Bloqueada";
        } else if (estado === "Aprobado"){
          this.solicitudesProvi[x].estado = "Exitosa";
        }
      }
    })

    this.visualizacionSolicitudesService.getSolicitudesRealizadas('adopcion', this.auth.getToken()).subscribe(dataRealizadasAdop => {
      this.solicitudesRealizadasAdop = dataRealizadasAdop;

      for (let x = 0; x < this.solicitudesRealizadasAdop.length; x++) {
        //Formato fecha de creación de solicitud
        var date = this.solicitudesRealizadasAdop[x].Solicitud.fechaCreacion.substring(0, 10);
        var [yyyy, mm, dd] = date.split("-");
        var revdate = `${dd}-${mm}-${yyyy}`;
        this.solicitudesRealizadasAdop[x].fechaSolicitud = revdate;

        //Estado de solicitud
        var estado = this.solicitudesRealizadasAdop[x].Solicitud.estadoId;
        if (estado === "Aprobado Por Responsable"){
          this.solicitudesRealizadasAdop[x].estado = "Aprobada";
        } else if (estado === "Abierta"){
          this.solicitudesRealizadasAdop[x].estado = "Siendo analizada";
        } else if (estado === "Suspendido por Solicitante"){
          this.solicitudesRealizadasAdop[x].estado = "Rechazada";
        } else if (estado === "Bloqueada"){
          this.solicitudesRealizadasAdop[x].estado = "Bloqueada";
        } else if (estado === "Aprobado"){
          this.solicitudesRealizadasAdop[x].estado = "Exitosa";
        }
      }
    })

    this.visualizacionSolicitudesService.getSolicitudesRealizadas('provisorio', this.auth.getToken()).subscribe(dataRealizadasProv => {
      this.solicitudesRealizadasProv = dataRealizadasProv;

      for (let x = 0; x < this.solicitudesRealizadasProv.length; x++) {
        //Formato fecha de creación de solicitud
        var date = this.solicitudesRealizadasProv[x].Solicitud.fechaCreacion.substring(0, 10);
        var [yyyy, mm, dd] = date.split("-");
        var revdate = `${dd}-${mm}-${yyyy}`;
        this.solicitudesRealizadasProv[x].fechaSolicitud = revdate;
        
        //Estado de solicitud
        var estado = this.solicitudesRealizadasProv[x].Solicitud.estadoId;
        if (estado === "Aprobado Por Responsable"){
          this.solicitudesRealizadasProv[x].estado = "Aprobada";
        } else if (estado === "Abierta"){
          this.solicitudesRealizadasProv[x].estado = "Siendo analizada";
        } else if (estado === "Suspendido por Solicitante"){
          this.solicitudesRealizadasProv[x].estado = "Rechazada";
        } else if (estado === "Bloqueada"){
          this.solicitudesRealizadasProv[x].estado = "Bloqueada";
        } else if (estado === "Aprobado"){
          this.solicitudesRealizadasProv[x].estado = "Exitosa";
        }
      }
    })
  }

  openSolicitud(soli) {
    this.dialog.open(VisualizacionSolicitudComponent, { data: { solicitud: soli } });
  }

  openSolicitudProvi(soli) {
    this.dialog.open(VisualizacionSolicitudProviComponent, { data: { solicitud: soli } });
  }
}
