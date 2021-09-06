import { Injectable } from '@angular/core';
import { Data, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AlertsService} from '../utils/alerts.service';
import {catchError, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import{User} from 'src/models/IUser';
import { LocalStorageService } from 'src/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token;
  api='https://adoptmebackend.herokuapp.com';
    
  constructor(private http: HttpClient,private router: Router, private alertsService: AlertsService, private localStorageService: LocalStorageService) {   }

  login(correoElectronico: string, contrasenia: string): Observable<any> {
    return this.http.post(this.api + '/login', {correoElectronico: correoElectronico,contrasenia: contrasenia})
    }
    
    async getUser(token: string): Promise<any>
    {
      return this.http.get<any>(this.api + '/login', { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise()
    }

    logout() {
      localStorage.removeItem('token');
    }

    getToken() {     
      return localStorage.getItem('auth_token');
    }

    getCurrentUser(): User {
      let user_string = localStorage.getItem("currentUser");
      if (!(user_string === null || user_string === undefined)) {
        let user: User = JSON.parse(user_string);
        return user;
      } else {
        return null;
      }
    }

    isLogued(){
      let profile =  this.localStorageService.getProfile();
      return (profile !== null && profile !== undefined)
    }

    getProfile(){
      return this.localStorageService.getProfile();
    }

    setUser(user: any): void {
      let user_string = JSON.stringify(user);
      localStorage.setItem("currentUser", user_string);
    }

    cerrarSesion(){
      localStorage.removeItem("auth_token");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("Profile");
    }

}

