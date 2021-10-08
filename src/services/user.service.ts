import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {catchError, map} from 'rxjs/operators';
import { User } from 'src/models/IUser';
import { HttpErrorHandlerService } from 'src/utils/ErrorHandler';
import { FormularioAdopcion } from 'src/models/IFormularioAdopcion';
import { FormularioProvisorio } from 'src/models/IFormularioProvisorio';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  api='https://adoptmebackend.herokuapp.com';
 

  constructor(private httpClient: HttpClient,  private errorHandler: HttpErrorHandlerService) {}
 

  async getCentrosRescatistasPendientes(estado: string, token:string): Promise <any[]> {
    return this.httpClient.get<any[]>(this.api + '/centros/' + estado, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }


  updateAccount(user: User, token:string): Observable <any> {
    return this.httpClient.put<any>(this.api + '/centros/' + user._id, user ,{ headers: new HttpHeaders().set('auth-token', `${token}`) });
  }

  

  async getUsuarios(estado: string, token:string): Promise <any[]> {
    return this.httpClient.get<any[]>(this.api + '/usuarios/' + estado, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  /*
  updateAccount(user: User, token:string): Observable <any> {
    this.alert.infoMessage(token, "token");
    return this.httpClient.put(this.api + '/centros/' + user._id, { headers: new HttpHeaders().set('auth-token', `${token}`) })
    .pipe(
      map((res: any) => {
        return res.payload;
      }));
  }
  */

  registrarFormularioAdopcion(formulario: FormularioAdopcion, token: string): Observable<FormularioAdopcion> {
    console.log('ruta: '+this.api + '/formulario/adopcion');
    console.log(formulario);
    return this.httpClient.post<FormularioAdopcion>(this.api + '/formulario/adopcion', formulario, { headers: new HttpHeaders().set('auth-token', `${token}`) });
  }

  registrarFormularioProvisorio(formulario: FormularioProvisorio, token: string): Observable<FormularioProvisorio> {
    return this.httpClient.post<FormularioProvisorio>(this.api + '/formulario/provisorio', formulario, { headers: new HttpHeaders().set('auth-token', `${token}`) });
  }

  }

