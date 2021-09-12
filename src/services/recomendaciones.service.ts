import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {catchError, map} from 'rxjs/operators';
import { Recomendacion } from 'src/models/IRecomendacion';


@Injectable({
  providedIn: 'root'
})
export class SignupService {
 
  private localidadesBaseURL = 'https://nominatim.openstreetmap.org/lookup?osm_ids=[N|W|R]<value>,…,…,&<params>';

  constructor(private httpClient: HttpClient) {}
 
  buscarCoordenadas(calle: string, altura:number): Promise <any[]> {
      calle = "27 abril";
      altura = 256
      let text = altura+calle;
      const url = "https://nominatim.openstreetmap.org/search?q="+text+"&format=geojson";
      return this.httpClient.get<any[]>(url).toPromise();
    }

    registrarRecomendacion(recomendacion: Recomendacion, token: string): Observable<Recomendacion> {
    
        const url = `${environment.base_url}`+"/recomendacion";
        return this.httpClient.post<Recomendacion>(url, recomendacion);
      }

  }

