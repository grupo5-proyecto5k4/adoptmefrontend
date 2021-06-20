import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {catchError, map} from 'rxjs/operators';
import { User } from 'src/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class SignupParticularService {
 
  constructor(private httpClient: HttpClient) {}
 
  registerParticularUser(request: User): Observable<User> {
      const url = `${environment.base_url}${environment.user.base_url}`;
      return this.httpClient.post<User>(url, request);
    }
  }

