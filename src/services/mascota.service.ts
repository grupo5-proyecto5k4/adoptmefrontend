import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {catchError, map} from 'rxjs/operators';
import { Notificacion } from 'src/models/INotificacion';
import { HttpErrorHandlerService } from 'src/utils/ErrorHandler';
import { Mascota } from 'src/models/IMascota';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {
 
  api='https://adoptmebackend.herokuapp.com';

  constructor(private httpClient: HttpClient,  private errorHandler: HttpErrorHandlerService) {}
 

registrarVacunas(listaVacunas: any[]): Observable <any[]> {
    return this.httpClient.post<any[]>(this.api + '/vacunas/vacuna', listaVacunas);
}
  

  updateNotificacion(notificacion: Notificacion, token:string): Promise <any> {
    return this.httpClient.put(this.api + '/notificacion/' + notificacion._id, notificacion ,{ headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }
  
  notificarSolicitudAdopcion(coleccion: String, nombreMascota:String, objetoId: string, token:string): Observable <any>{
    let notificacion: Notificacion;
    notificacion.nombreNotificacion = "Solicitud de adopción";
    notificacion.descripcion = nombreMascota+" ha recibido una nueva solicitud de adopción";
    notificacion.objetoAMostrar = "Adopcion";
    notificacion.objetoAMostrarId = objetoId;
    return this.httpClient.post<Notificacion>(this.api + '/notificacion/', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) });
  }

  notificarSolicitudProvisorio(nombreMascota:String, objetoId: string, token:string): Observable <any>{
    let notificacion: Notificacion;
    notificacion.nombreNotificacion = "Solicitud de provisorio";
    notificacion.descripcion = nombreMascota+" ha recibido una solicitud de provisorio";
    notificacion.objetoAMostrar = "Provisorio";
    notificacion.objetoAMostrarId = objetoId;
    return this.httpClient.post<Notificacion>(this.api + '/notificacion/', notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) });
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