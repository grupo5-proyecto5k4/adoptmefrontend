import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { catchError, map } from 'rxjs/operators';
import { Notificacion } from 'src/models/INotificacion';
import { HttpErrorHandlerService } from 'src/utils/ErrorHandler';
import { Mascota } from 'src/models/IMascota';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  api = 'https://adoptmebackend.herokuapp.com';

  constructor(private httpClient: HttpClient, private errorHandler: HttpErrorHandlerService) { }


  registrarVacunas(listaVacunas: any[]): Observable<any[]> {
    return this.httpClient.post<any[]>(this.api + '/vacunas/vacuna', listaVacunas);
  }

  actualizarMascota(mascota: any, token: string): Observable<any> {
    return this.httpClient.put<any[]>(this.api + '/animales/mascota/modificarMascota', mascota, { headers: new HttpHeaders().set('auth-token', `${token}`) });
  }

  updateNotificacion(notificacion: Notificacion, token: string): Promise<any> {
    return this.httpClient.put(this.api + '/notificacion/' + notificacion._id, notificacion, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  async getVacunas(idMascota: string): Promise<any[]> {
    return this.httpClient.get<any[]>(this.api + '/vacunas/filtrarVacunaAnimal/' + idMascota).toPromise();
  }
}