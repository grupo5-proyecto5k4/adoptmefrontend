import { HttpClient } from '@angular/common/http';
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
  }

