import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  endpointTiempoAdopcion = "";

  constructor(private http: HttpClient) {}

  getAdoptionsTimeArray(): Observable<any> {  
    return this.http.get(this.endpointTiempoAdopcion);
    }


  getReporteProvisoriosAdoptados(desde: string, hasta: string, token: string): Observable<any>{
    const urlFiltered = new URL('https://adoptmebackend.herokuapp.com/reporte/animales/provisorio')
    if (desde) {
      urlFiltered.searchParams.append("fechaDesde", desde)
  }
  if (hasta) {
      urlFiltered.searchParams.append("fechaHasta", hasta)
  }
    return this.http.get<any>(urlFiltered.toString(), { headers: new HttpHeaders().set('auth-token', `${token}`) });
  }


  }

