import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Mascota } from '../models/IMascota';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NuevaVacuna } from '../models/INuevaVacuna';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})

export class photoService {

    uri = 'https://adoptmebackend.herokuapp.com/animales/animal';
    urlVacuna = 'https://adoptmebackend.herokuapp.com/vacunas/vacuna';
    fotoenv = environment.base_url;
    regVisita = 'https://adoptmebackend.herokuapp.com/seguimiento/crearVisita/';
    visitaFoto = 'https://adoptmebackend.herokuapp.com/seguimiento/modificarSeguimiento/visita';

    constructor(private http: HttpClient) { }

    registroAnimal(request: Mascota, token: string): Observable<any> {
        console.log("llgue")
        return this.http.post<Mascota>(this.uri, request, { headers: new HttpHeaders().set('auth-token', `${token}`) });

    }

    registrarVacuna(request: NuevaVacuna): Observable<any> {
        return this.http.post<NuevaVacuna>(this.urlVacuna, request)
    }

    upload(file: File, id_Animal: string): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('imagen', file);
        formData.append('id_Animal', id_Animal)

        const req = new HttpRequest('POST', `${this.fotoenv}/fotos/imagen/add`, formData);
        return this.http.request(req);
    }

//PASO 2)
    uploadFotoVisita(file: File, id_Animal: string, token:string): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('imagen', file);
        formData.append('id_Animal', id_Animal)

        return this.http.put<any>(this.visitaFoto, formData, { headers: new HttpHeaders().set('auth-token', `${token}`) });
    }

//PASO 1)
    registroVisita(request: any, token: string): Observable<any> {
        console.log("llgue")
        return this.http.post<any>(this.regVisita+request.seguimientoId, request, { headers: new HttpHeaders().set('auth-token', `${token}`) });
    }


}