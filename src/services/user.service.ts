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
 
  constructor(private httpClient: HttpClient,  private errorHandler: HttpErrorHandlerService) {}
 
  /*
  getCentrosRescatistasPendientes(user: User, token: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.base_url}${environment.user.base_url}` + '/centros/', { headers: new HttpHeaders().set('Authorization', `${token}`) })
      .pipe(catchError(this.errorHandler.handleError))
      .pipe(
        map((res: any) => {
          return res.payload.users;
        }));
  }*/
  getCentrosRescatistasPendientes(estado: string, token:string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.base_url}${environment.user.base_url}` + '/centros/' + estado, { headers: new HttpHeaders().set('Authorization', `${token}`) })
      .pipe(catchError(this.errorHandler.handleError))
      .pipe(
        map((res: any) => {
          return res.payload.users;
        }));
  }

  }

