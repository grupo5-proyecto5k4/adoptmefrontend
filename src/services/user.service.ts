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
 
  /*
  getCentrosRescatistasPendientes(user: User, token: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.base_url}${environment.user.base_url}` + '/centros/', { headers: new HttpHeaders().set('Authorization', `${token}`) })
      .pipe(catchError(this.errorHandler.handleError))
      .pipe(
        map((res: any) => {
          return res.payload.users;
        }));


    async getUser(token: string): Promise<any>
    {
      return this.http.get<any>(this.api + '/login', { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise()
    }
  }*/

  async getCentrosRescatistasPendientes(estado: string, token:string): Promise <any[]> {
    return this.httpClient.get<any[]>(this.api + '/centros/' + estado, { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise();
  }

  updateAccount(user: User, token:string): Observable <any> {
    debugger;
    return this.httpClient.put<any>(this.api + '/centros/' + user.id, { headers: new HttpHeaders().set('auth-token', `${token}`) });
  }

  }

