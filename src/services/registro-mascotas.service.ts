import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegistroMascotasService {

    endpointAnimal = 'https://adoptmebackend.herokuapp.com/animales/animal/';
    endpointUser = 'https://adoptmebackend.herokuapp.com/animales/respestados/'

    constructor(private http: HttpClient) { }

    getMascotas(statusCode: number): Observable<any> {
        let status = "";
        // Si cambia algun estado no hay que ir buscandolo en todas los typescript files.
        if (statusCode === 0) {
            status = "Disponible Adopción y Provisorio";
        }
        else if (statusCode === 1) {
            status = "Disponible Adopción";
        }
        else if (statusCode === 2) {
            status = "Disponible Provisorio";
        }
        else if (statusCode === 3) {
            status = "Adoptado";
        }
        else if (statusCode === 4) {
            status = "En Provisorio";
        }
        let ruta = this.endpointAnimal + status;
        return this.http.get(this.endpointAnimal + status);
    }

    getMascotasUser(statusCode: number, token: string): Observable<any> {
        let status = "";
        // Si cambia algun estado no hay que ir buscandolo en todas los typescript files.
        if (statusCode === 0) {
            status = "Disponible Adopción y Provisorio";
        }
        else if (statusCode === 1) {
            status = "Disponible Adopción";
        }
        else if (statusCode === 2) {
            status = "Disponible Provisorio";
        }
        else if (statusCode === 3) {
            status = "Adoptado";
        }
        else if (statusCode === 4) {
            status = "En Provisorio";
        }
        return this.http.get((this.endpointUser + status), { headers: new HttpHeaders().set('auth-token', `${token}`) });
    }

    async getMascota(idAnimal: string): Promise<any> {
        return this.http.get(('https://adoptmebackend.herokuapp.com/animales/buscar/'+idAnimal)).toPromise();
    }



    getMascotasFiltradas(filters: any): Observable<any> {
        const urlFiltered = new URL('https://adoptmebackend.herokuapp.com/animales/filtrosMascota/filtroAnimalCentroResc')
        if (filters.nombres) {
            urlFiltered.searchParams.append("nombres", filters.nombres)
        }
        if (filters.barrio) {
            urlFiltered.searchParams.append("barrio", filters.barrio)
        }
        if (filters.sexo) {
            urlFiltered.searchParams.append("sexo", filters.sexo)
        }
        if (filters.tipoMascota) {
            urlFiltered.searchParams.append("tipoMascota", filters.tipoMascota)
        }
        if (filters.tamañoFinal) {
            urlFiltered.searchParams.append("tamañoFinal", filters.tamañoFinal)
        }
        if (filters.estado) {
            urlFiltered.searchParams.append("estado", filters.estado)
        }

        return this.http.get<any>(urlFiltered.toString());
    }


    getMascotasPropiasFiltradas(filters: any, token: string): Observable<any> {
        return this.filtrar(filters, 'https://adoptmebackend.herokuapp.com/animales/filtrosMascota/filtroAnimal', token)
    }

    filtrar(filters: any, url: string,  token: string): Observable<any> {
        const urlFiltered = new URL(url)
        if (filters.sexo) {
            urlFiltered.searchParams.append("sexo", filters.sexo)
        }
        if (filters.tipoMascota) {
            urlFiltered.searchParams.append("tipoMascota", filters.tipoMascota)
        }
        if (filters.tamañoFinal) {
            urlFiltered.searchParams.append("tamañoFinal", filters.tamañoFinal)
        }
        if (filters.estado) {
            urlFiltered.searchParams.append("estado", filters.estado)
        }
        if (filters.responsableId) {
            urlFiltered.searchParams.append("responsableId", filters.responsableId)
        }
        

        return this.http.get<any>(urlFiltered.toString(), { headers: new HttpHeaders().set('auth-token', `${token}`) });
    }

    filtrarMascotasEnTenencia(filters: any, token: string): Observable<any> {
        const urlFiltered = new URL("https://adoptmebackend.herokuapp.com/animales/buscar/solicitudConfirmada")
        if (filters.sexo) {
            urlFiltered.searchParams.append("sexo", filters.sexo)
        }
        if (filters.tipoMascota) {
            urlFiltered.searchParams.append("tipoMascota", filters.tipoMascota)
        }
        if (filters.tamañoFinal) {
            urlFiltered.searchParams.append("tamañoFinal", filters.tamañoFinal)
        }
        if (filters.modelo) {
            urlFiltered.searchParams.append("modelo", filters.modelo)
        }
        console.log(urlFiltered.toString())
        return this.http.get<any>(urlFiltered.toString(), { headers: new HttpHeaders().set('auth-token', `${token}`) });
    }


}