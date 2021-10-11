import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class VisualizacionSolicitudesService {

    endpointSolicitudesAdoptar='https://adoptmebackend.herokuapp.com/formulario/buscar/solicitudadopcion/adopcion';
    endpointSolicitudesProvisorio='https://adoptmebackend.herokuapp.com/formulario/buscar/solicitudadopcion/provisorio';
    endpointGetSolicitudes='https://adoptmebackend.herokuapp.com/formulario/adopcion';
    endpointConfirmarSolicitud = 'https://adoptmebackend.herokuapp.com/formulario/actualizarEstado/Aprobado/'
    endpointRechazarSolicitud = 'https://adoptmebackend.herokuapp.com/formulario/actualizarEstado/Rechazado/'

    constructor(private http: HttpClient) {}

    getSolicitudesAdoptar(token:string): Observable<any> {
        return this.http.get((this.endpointSolicitudesAdoptar), { headers: new HttpHeaders().set('auth-token', `${token}`)});
    }

    getSolicitudesProvisorio(token:string): Observable<any> {
        return this.http.get((this.endpointSolicitudesProvisorio), { headers: new HttpHeaders().set('auth-token', `${token}`)});
    }

    async getSolicitud(idSolictud: string): Promise<any> {
        return this.http.get((this.endpointGetSolicitudes+'/'+idSolictud)).toPromise();
    }

    confirmarSolicitudProvisorio(token:string, idSolicitud: string): Observable<any> {
        return this.http.put((this.endpointConfirmarSolicitud + idSolicitud), { headers: new HttpHeaders().set('auth-token', `${token}`)});
    }

    rechazarSolicitudProvisorio(token:string, idSolicitud: string): Observable<any> {
        return this.http.put((this.endpointRechazarSolicitud + idSolicitud), { headers: new HttpHeaders().set('auth-token', `${token}`)});
    }
}