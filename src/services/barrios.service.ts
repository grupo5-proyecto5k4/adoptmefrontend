import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarriosService {
  endpointBarrios = "https://adoptmebackend.herokuapp.com/barrios/barrio";

  constructor(private http: HttpClient) { }

  getBarrios(): Observable<any> {
    return this.http.get(this.endpointBarrios);
  }
}