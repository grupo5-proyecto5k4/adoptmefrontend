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
    return this.httpClient.post<Notificacion>(this.api + '/notificacion', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  notificarSolicitudProvisorio(nombreMascota:string, remitente:string, objetoId: string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Solicitud de provisorio";
    notificacion.descripcion = nombreMascota+" ha recibido una solicitud de provisorio";
    notificacion.objetoAMostrar = "Provisorio";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    return this.httpClient.post<Notificacion>(this.api + '/notificacion', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  notificarConfirmacionAdopcionAParticular(nombreMascota:string, objetoId: string, remitente:string, token:string): Promise <any>{
    console.log("llegue a la confirmacion adopcion")
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Confirmación de adopción";
    notificacion.descripcion = "La solicitud de adopción de "+nombreMascota+" ha sido aceptada";
    notificacion.objetoAMostrar = "Adopcion";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    console.log(notificacion)
    return this.httpClient.post<Notificacion>(this.api + '/notificacion', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  notificarConfirmacionProvisorioAParticular(nombreMascota:string, objetoId: string, remitente:string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Confirmación de provisorio";
    notificacion.descripcion = "La solicitud de provisorio de "+nombreMascota+" ha sido aceptada";
    notificacion.objetoAMostrar = "Provisorio";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    console.log(notificacion)
    return this.httpClient.post<Notificacion>(this.api + '/notificacion', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  notificarCancelacionAdopcionAParticular(nombreMascota:string, objetoId: string, remitente:string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Rechazo de adopción";
    notificacion.descripcion = "La solicitud de adopción de "+nombreMascota+" ha sido rechazada";
    notificacion.objetoAMostrar = "Adopcion";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    return this.httpClient.post<Notificacion>(this.api + '/notificacion', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  notificarCancelacionProvisorioAParticular(nombreMascota:string, objetoId: string, remitente:string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Rechazo de provisorio";
    notificacion.descripcion = "La solicitud de provisorio de "+nombreMascota+" ha sido rechazada";
    notificacion.objetoAMostrar = "Provisorio";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    return this.httpClient.post<Notificacion>(this.api + '/notificacion', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  notificarBajaDeProvisorioAParticular(nombreMascota:string, objetoId: string, remitente:string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Cancelación de provisorio";
    notificacion.descripcion = "El provisorio de "+nombreMascota+" ha sido finalizado por su responsable";
    notificacion.objetoAMostrar = "Mascota";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    return this.httpClient.post<Notificacion>(this.api + '/notificacion', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  notificarBajaDeAdopcionAParticular(nombreMascota:string, objetoId: string, remitente:string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Cancelación de adopción";
    notificacion.descripcion = "La tenencia de "+nombreMascota+" ha sido finalizada por su responsable";
    notificacion.objetoAMostrar = "Mascota";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    return this.httpClient.post<Notificacion>(this.api + '/notificacion', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  notificarConfirmacionAdopcionACentro(nombreMascota: string, nombreSolicitante:string, objetoId: string, remitente:string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Confirmación de adopción";
    notificacion.descripcion = nombreSolicitante+" ha confirmado la adopción de "+nombreMascota;
    notificacion.objetoAMostrar = "Adopcion";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    return this.httpClient.post<Notificacion>(this.api + '/notificacion', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  notificarCancelacionAdopcionACentro(nombreMascota: string, nombreSolicitante:string, objetoId: string, remitente:string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Cancelación de adopción";
    notificacion.descripcion = nombreSolicitante+" ha cancelado la adopción de "+nombreMascota;
    notificacion.objetoAMostrar = "Adopcion";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    return this.httpClient.post<Notificacion>(this.api + '/notificacion', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  notificarConfirmacionProvisorioACentro(nombreMascota: string, nombreSolicitante:string, objetoId: string, remitente:string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Confirmación de provisorio";
    notificacion.descripcion = nombreSolicitante+" ha confirmado el provisorio de "+nombreMascota;
    notificacion.objetoAMostrar = "Provisorio";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    return this.httpClient.post<Notificacion>(this.api + '/notificacion', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  notificarCancelacionProvisorioACentro(nombreMascota: string, nombreSolicitante:string, objetoId: string, remitente:string, token:string): Promise <any>{
    let notificacion: Notificacion = new Notificacion();
    notificacion.nombreNotificacion = "Cancelación de provisorio";
    notificacion.descripcion = nombreSolicitante+" ha cancelado el provisorio de "+nombreMascota;
    notificacion.objetoAMostrar = "Provisorio";
    notificacion.objetoAMostrarId = objetoId;
    notificacion.remitenteId = remitente;
    return this.httpClient.post<Notificacion>(this.api + '/notificacion', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
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

