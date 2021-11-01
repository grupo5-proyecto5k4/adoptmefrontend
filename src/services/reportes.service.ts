import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  endpointTiempoAdopcion = " https://adoptmebackend.herokuapp.com/animales/reportes/reporteTiempoAdopcion";

  constructor(private http: HttpClient) {}

  getAdoptionsTimeArray(desde, hasta, token): Observable<any> {
    return this.http.get(this.endpointTiempoAdopcion + "?fechaDesde=" + desde + "&fechaHasta=" + hasta, { headers: new HttpHeaders().set('auth-token', `${token}`) });
    }
  }

