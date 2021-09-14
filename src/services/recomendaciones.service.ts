import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {catchError, map} from 'rxjs/operators';
import { Recomendacion } from 'src/models/IRecomendacion';


@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {
 
  constructor(private httpClient: HttpClient) {}
 
  buscarCoordenadas(calle: string, altura:number): Promise <Array<any>> {
      let text = altura+"+" +calle+",Córdoba, Córdoba, Argentina";
      const url = encodeURI("https://nominatim.openstreetmap.org/search?q="+text+"&format=geojson");
      return this.httpClient.get<Array<any>>(url).toPromise();
    }

    registrarRecomendacion(recomendacion: Recomendacion, token: string): Observable<Recomendacion> {
        const url = `${environment.base_url}`+"/recomendacion";
        return this.httpClient.post<Recomendacion>(url, recomendacion, { headers: new HttpHeaders().set('auth-token', `${token}`) });
      }


      getRecomendacionesVeterinaria(): Promise <any[]> {
        return this.httpClient.get<any[]>(`${environment.base_url}` + '/recomendacionVeterinaria/').toPromise();
      }

      getRecomendacionesCentrosCastracion(): Promise <any[]> {
        return this.httpClient.get<any[]>(`${environment.base_url}` + '/recomendacionCentroCastracion/').toPromise();
      }

  }

