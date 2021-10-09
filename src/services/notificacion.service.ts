import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {catchError, map} from 'rxjs/operators';
import { Notificacion } from 'src/models/INotificacion';
import { HttpErrorHandlerService } from 'src/utils/ErrorHandler';


@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
 
  api='https://adoptmebackend.herokuapp.com';

  constructor(private httpClient: HttpClient,  private errorHandler: HttpErrorHandlerService) {}
 

  async getNotificaciones(token:string): Promise <any[]> {
    return this.httpClient.get<any[]>(this.api + '/notificaciones', { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }
  

  updateNotificacion(notificacion: Notificacion, token:string): Promise <any> {
    return this.httpClient.put(this.api + '/notificacion/' + notificacion._id, notificacion ,{ headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }
  
  notificarSolicitudAdopcion(nombreMascota:string, remitente:string, objetoId: string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Solicitud de adopción";
    notificacion.descripcion = nombreMascota+" ha recibido una nueva solicitud de adopción";
    notificacion.objetoAMostrar = "Adopcion";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    return this.notificar(notificacion, token)
  }

  notificarSolicitudProvisorio(nombreMascota:string, objetoId: string, remitente:string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Solicitud de provisorio";
    notificacion.descripcion = nombreMascota+" ha recibido una solicitud de provisorio";
    notificacion.objetoAMostrar = "Provisorio";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    return this.notificar(notificacion, token)
  }

  notificarConfirmacionAdopcion(nombreMascota:string, objetoId: string, remitente:string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Confirmacion de adopción";
    notificacion.descripcion = "La solicitud de adopción de "+nombreMascota+" ha sido aceptada";
    notificacion.objetoAMostrar = "Adopcion";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    return this.notificar(notificacion, token)
  }

  notificarConfirmacionProvisorio(nombreMascota:string, objetoId: string, remitente:string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Confirmacion de provisorio";
    notificacion.descripcion = "La solicitud de provisorio de "+nombreMascota+" ha sido aceptada";
    notificacion.objetoAMostrar = "Provisorio";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    return this.notificar(notificacion, token)
  }

  notificar(notificacion: Notificacion, token:string): Promise <any>{
    return this.httpClient.post<Notificacion>(this.api + '/notificacion', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();;
  }

  /*
  updateAccount(user: User, token:string): Observable <any> {
    this.alert.infoMessage(token, "token");
    return this.httpClient.put(this.api + '/centros/' + user._id, { headers: new HttpHeaders().set('auth-token', `${token}`) })
    .pipe(
      map((res: any) => {
        return res.payload;
      }));
  }
  */

  }

