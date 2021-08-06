import { Injectable } from '@angular/core';
import { Data, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AlertsService} from '../utils/alerts.service';
import {catchError, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import{User} from 'src/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token;
  api='https://adoptmebackend.herokuapp.com';
    
  constructor(private http: HttpClient,private router: Router, private alertsService: AlertsService) {   }

  login(correoElectronico: string, contrasenia: string): Observable<any> {
    return this.http.post(this.api + '/login', {correoElectronico: correoElectronico,contrasenia: contrasenia})
    }
    
    async getUser(token: string): Promise<User>
    {
      //token = 'eyJ1c2VyIjp7Il9pZCI6IjYxMGFkM2ExMWM1ZGRjMDAxNWZiY2Y2ZSIsIm5vbWJyZXMiOiJNaWNhIiwiYXBlbGxpZG9zIjoiRmxvcmVhbm8iLCJkbmkiOjQwODE1NDk2LCJmZWNoYU5hY2ltaWVudG8iOiIxOTk4LTAxLTAzVDAwOjAwOjAwLjAwMFoiLCJjb3JyZW9FbGVjdHJvbmljbyI6Im1pY2FAZ21haWwuY29tIiwiY29udHJhc2VuaWEiOiIkMmIkMTAkUVhiVTBKd2drSFVWWC5Cd0JycnNUZWgwMUJScE1nd0U1ZlByZGRTTWRyZnJhNmFBeUVnU2kiLCJ0aXBvVXN1YXJpbyI6MSwibnVtZXJvQ29udGFjdG8iOjM1MTYzNjI1MDksImlkRXN0YWRvIjoxLCJmZWNoYUNyZWFjaW9uIjoiMjAyMS0wOC0wNFQxNzo1MToyOS42MTVaIiwiZmVjaGFNb2RpZmljYWNpb24iOiIyMDIxLTA4LTA0VDE3OjUxOjI5LjYxNVoiLCJfX3YiOjB9LCJpYXQiOjE2MjgyMjIzMDR9.2IHcWlS17sd'
      return this.http.get<User>(this.api + '/login', { headers: new HttpHeaders().set('auth-token', `${token}`) }).toPromise()
    }

    logout() {
      localStorage.removeItem('token');
    }

    public get logIn(): boolean {     
      return (localStorage.getItem('token') !== null);
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

    setUser(user: User): void {
      let user_string = JSON.stringify(user);
      localStorage.setItem("currentUser", user_string);
    }

}

