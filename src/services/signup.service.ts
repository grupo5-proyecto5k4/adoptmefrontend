import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {catchError, map} from 'rxjs/operators';
import { User } from 'src/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
 
  urlEdit='https://adoptmebackend.herokuapp.com/user/modificacionPerfil';
  urlEditCentro='https://adoptmebackend.herokuapp.com/user/modificacion/centrorescatista';
  
  constructor(private httpClient: HttpClient) {}
 
  registerUser(request: User): Observable<User> {
    
      const url = `${environment.base_url}${environment.user.base_url}`;
      return this.httpClient.post<User>(url, request);
    }

   
    editUser(user: User, token:string): Observable <User> {
      return this.httpClient.put<User>(this.urlEdit, user ,{ headers: new HttpHeaders().set('auth-token', `${token}`) });
    }

    
    editCentro(user: User, token:string): Observable <User> {
      return this.httpClient.put<User>(this.urlEditCentro, user ,{ headers: new HttpHeaders().set('auth-token', `${token}`) });
    }

    
  }

