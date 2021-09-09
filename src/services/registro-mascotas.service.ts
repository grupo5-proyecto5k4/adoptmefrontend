import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegistroMascotasService {

    api='https://adoptmebackend.herokuapp.com/animales/animal/';

    constructor(private http: HttpClient) {}

    // Falta filtro de tami - parametrizar
    getMascotas(statusCode: number): Observable<any> {
        let status = "";
        // Si cambia algun estado no hay que ir buscandolo en todas los typescript files.
        if (statusCode === 0){
            status = "Disponible Adopción y Provisorio";
        }
        else if (statusCode === 1){
            status = "Disponible Adopción";
        }
        else if (statusCode === 2){
            status = "Disponible Provisorio";
        }
        else if (statusCode === 3){
            status = "Adoptado";
        }
        else if (statusCode === 4){
            status = "En Provisorio";
        }
        let ruta = this.api + status;
        console.log("Ruta", ruta);
        return this.http.get(this.api + status);
    }
}