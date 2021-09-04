import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {catchError, map} from 'rxjs/operators';
import { User } from 'src/models/IUser';
import { HttpErrorHandlerService } from 'src/utils/ErrorHandler';


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

  }

