import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegistroMascotasService {

    constructor(private http: HttpClient) {}

    // Falta filtro de tami - parametrizar
    getMascotasPubAdopcion(): Observable<any> {

    return this.http.get('https://adoptmebackend.herokuapp.com/animales/idAnimal')}
    // Falta filtro de tami - parametrizar
    getMascotasPubProvisorio(): Observable<any> {
    return this.http.get('https://adoptmebackend.herokuapp.com/animales/idAnimal')}
}