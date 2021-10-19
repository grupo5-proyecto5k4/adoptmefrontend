import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/services/local-storage.service';
import { AuthService } from '../auth.service';
import { stringify } from '@angular/compiler/src/util';
import { AlertsService } from 'src/utils/alerts.service';
import { NotificacionService } from 'src/services/notificacion.service';
import { Notificacion } from 'src/models/INotificacion';
import { VisualizacionSolicitudesService } from 'src/services/visualizacion-solicitudes';
import { ThrowStmt } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { VisualizacionSolicitudComponent } from '../visualizacion-solicitud/visualizacion-solicitud.component';
import { VisualizacionSolicitudProviComponent } from '../visualizacion-solicitud-provi/visualizacion-solicitud-provi.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  faPaw = faPaw;
  profile: any;
  iniciales: string = "";
  currentUser: any;
  vista: string;
  cantNotifNoLeidas: number = 0;
  mostrarNotificaciones: Boolean = false;
  notificaciones = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private notificacionService: NotificacionService, private visualizarService: VisualizacionSolicitudesService, private authservice: AuthService, private alertsService: AlertsService, private router: Router, private localStorageService: LocalStorageService) {
    this.profile = this.localStorageService.getProfile();
    if (this.isLogued()) {
      this.currentUser = this.authservice.getCurrentUser();
      if (this.currentUser.apellidos !== undefined && this.currentUser.apellidos !== null) {
        this.iniciales = ((this.currentUser.nombres).split("", 1) + (this.currentUser.apellidos).split("", 1));
      }
      else {
        let nombre = (this.currentUser.nombres).split("");
        this.iniciales = nombre[0] + nombre[1];
      }
    }
  }


  async ngOnInit() {
    // Danger slow the server
    if (this.isLogued()) {
      this.consultarNotificaciones();
    }
   // setInterval(() => {    DESCOMENTAR ESTAS DOS LINEAS PARA QUE FUNCIONEN LAS NOTIFICACIONES DE NUEVO
   //     this.consultarNotificaciones();
   // }, 5000);
    }

  




  async consultarNotificaciones(){
  let nuevasNotificaciones = await this.notificacionService.getNotificaciones(this.authservice.getToken())
  if (nuevasNotificaciones.length > this.notificaciones.length) {
    this.notificaciones = nuevasNotificaciones;
    let cantNotifNoLeidas = 0;
    for (let i = 0; i < this.notificaciones.length; i++) {
      if (nuevasNotificaciones[i].leida == 0) {
        cantNotifNoLeidas ++;
      }
    }

    this.cantNotifNoLeidas = cantNotifNoLeidas;
  }
}

isSignupOptions(){
  return (this.router.url == '/opciones-de-registro');

}

showNotifications(){
  if (this.mostrarNotificaciones) {
    this.mostrarNotificaciones = false;
  }
  else {
    this.mostrarNotificaciones = true;
  }

}

async abrirNotificacion(notificacion: Notificacion){
  this.marcarLeida(notificacion);
  if (notificacion.objetoAMostrar == "Adopcion"){
    
    let solicitud = await this.visualizarService.getSolicitud(notificacion.objetoAMostrarId);

    this.dialog.open(VisualizacionSolicitudComponent, {
      data: {
        solicitud: solicitud,
      }
    });
  } else if (notificacion.objetoAMostrar == "Provisorio"){
    let solicitudProvi = await this.visualizarService.getSolicitud(notificacion.objetoAMostrarId);

    this.dialog.open(VisualizacionSolicitudProviComponent, {
      data: {
        solicitud: solicitudProvi,
      }
    });
  }
}




async marcarLeida(notificacion: Notificacion){
  if (notificacion.leida == 0) {
    notificacion.leida = 1;
    this.cantNotifNoLeidas --;
    let notificacionLeida: Notificacion = { _id: notificacion._id, leida: 1, nombreNotificacion: notificacion.nombreNotificacion, descripcion: notificacion.descripcion };
    await this.notificacionService.updateNotificacion(notificacionLeida, this.authservice.getToken())
  }
  //acá va el código o la llamada a la función que abra el modal o página en base al tipo de objeto que se esté abriendo
}


isInicioSesion(){
  return (this.router.url == '/inicio-sesion');
}

isLogued(){
  return (this.profile !== null && this.profile !== undefined)
}

scrollTop(){
  document.getElementsByTagName('mat-sidenav-content')[0].scrollTo(0, 0)
}

isParticular(){
  return (this.profile == '1')
}

isRescatist(){
  return (this.profile == '2')
}

isAdmin(){
  return (this.profile == '0')
}

goToProfile(){
  if (this.currentUser.tipoUsuario == "1") {
    this.router.navigate(['/miperfil']);
  } else if (this.currentUser.tipoUsuario == "2") {
    this.router.navigate(['/micentro']);
  } else {
    this.router.navigate(['/perfiladmin']);
  }
}
}
