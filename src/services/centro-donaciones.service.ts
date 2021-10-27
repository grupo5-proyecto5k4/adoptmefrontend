import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentroDonacionesService {

  endpointCentroDonacionHabilitada = "https://adoptmebackend.herokuapp.com/donaciones/centroRescatistas";

  constructor(private http: HttpClient) { }

  getCentrosDonaciones(): Observable<any> {
    return this.http.get(this.endpointCentroDonacionHabilitada);
}
}
