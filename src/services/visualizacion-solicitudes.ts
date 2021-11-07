import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { FormularioProvisorio } from 'src/models/IFormularioProvisorio';
import { FormularioAdopcion } from 'src/models/IFormularioAdopcion';

@Injectable({
    providedIn: 'root'
})

export class VisualizacionSolicitudesService {

    endpointSolicitudesAdoptar='https://adoptmebackend.herokuapp.com/formulario/buscar/solicitudadopcion/adopcion';
    endpointSolicitudesProvisorio='https://adoptmebackend.herokuapp.com/formulario/buscar/solicitudadopcion/provisorio';
    endpointGetSolicitudes='https://adoptmebackend.herokuapp.com/formulario/adopcion';
    endpointConfirmarSolicitud = 'https://adoptmebackend.herokuapp.com/formulario/actualizarEstado/Aprobado/'
    endpointRechazarSolicitud = 'https://adoptmebackend.herokuapp.com/formulario/actualizarEstado/Rechazado/'
    //endpointPutSolicitud = 'https://adoptmebackend.herokuapp.com/formulario/actualizarEstado/:estado/:idSolicitud'

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

    confirmarSolicitud(solicitud, token:string): Observable<any> {
        return this.http.put<any>(this.endpointConfirmarSolicitud + solicitud._id, solicitud, { headers: new HttpHeaders().set('auth-token', `${token}`)});
    }

    rechazarSolicitud(idSolicitud: string, token:string): Observable<any> {
        return this.http.put<any>(this.endpointRechazarSolicitud + idSolicitud, "some-string", { headers: new HttpHeaders().set('auth-token', `${token}`)});

    }

    getSolicitudesRealizadas(tipoSolicitud: string, token:string): Observable<any> {
        return this.http.get(('https://adoptmebackend.herokuapp.com/formulario/buscar/solicitudrealizada/'+tipoSolicitud), { headers: new HttpHeaders().set('auth-token', `${token}`)});
    }

    /*
    actualizarSolicitudProvisorio(solicitud: FormularioProvisorio, token:string): Observable <FormularioProvisorio> {
        return this.http.put<FormularioProvisorio>('url', solicitud ,{ headers: new HttpHeaders().set('auth-token', `${token}`) });
      //AGREGAR LA URL DEL BACK
    }

    actualizarSolicitudAdopcion(solicitud: FormularioAdopcion, token:string): Observable <FormularioAdopcion> {
        return this.http.put<FormularioAdopcion>('url', solicitud ,{ headers: new HttpHeaders().set('auth-token', `${token}`) });
      //AGREGAR LA URL DEL BACK
    }
    */
}
