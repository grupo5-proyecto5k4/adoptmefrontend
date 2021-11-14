import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { catchError, map } from 'rxjs/operators';
import { Recomendacion } from 'src/models/IRecomendacion';


@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {

  constructor(private httpClient: HttpClient) { }

  async buscarCoordenadas(calle: string, altura: number): Promise<any> {
    let text = altura + "+" + calle + ",Córdoba, Córdoba, Argentina";
    const url = encodeURI("https://nominatim.openstreetmap.org/search?q=" + text + "&format=json");
    
    const result = await this.httpClient.get<Array<any>>(url).toPromise();

    if (result.length > 0) {
      const coord = result[0];
      return {
        lat: Number.parseFloat(coord.lat),
        lon: Number.parseFloat(coord.lon)
      }
    }

    return;
  }

  registrarRecomendacion(recomendacion: Recomendacion, token: string): Observable<Recomendacion> {
    const url = `${environment.base_url}` + "/recomendacion";
    return this.httpClient.post<Recomendacion>(url, recomendacion, { headers: new HttpHeaders().set('auth-token', `${token}`) });
  }


  getRecomendacionesVeterinaria(): Promise<any[]> {
    return this.httpClient.get<any[]>(`${environment.base_url}` + '/recomendacionVeterinaria/').toPromise();
  }

  getRecomendacionesCentrosCastracion(): Promise<Recomendacion[]> {
    return this.httpClient.get<Recomendacion[]>(`${environment.base_url}` + '/recomendacionCentroCastracion/').toPromise();
  }

  getTodasRecomendaciones(): Promise<Recomendacion[]> {
    return this.httpClient.get<Recomendacion[]>(`${environment.base_url}` + '/recomendaciones/').toPromise();
  }

}

