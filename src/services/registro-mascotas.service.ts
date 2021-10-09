import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegistroMascotasService {

    endpointAnimal='https://adoptmebackend.herokuapp.com/animales/animal/';
    endpointUser = 'https://adoptmebackend.herokuapp.com/animales/respestados/'

    constructor(private http: HttpClient) {}

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
        let ruta = this.endpointAnimal + status;
        return this.http.get(this.endpointAnimal + status);
    }

    getMascotasUser(statusCode:number, token:string): Observable<any>{
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
        return this.http.get((this.endpointUser + status), { headers: new HttpHeaders().set('auth-token', `${token}`)});
    }



    getMascotasFiltradas(filters: any): Promise <any[]> {
        return this.http.get<any[]>('https://adoptmebackend.herokuapp.com/animales/filtrosMascota/filtroAnimal'+filters).toPromise();
    }

}