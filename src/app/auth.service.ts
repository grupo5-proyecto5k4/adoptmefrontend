import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Data, Router } from '@angular/router';
import {AlertsService} from '../utils/alerts.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token;
  api='https://adoptmebackend.herokuapp.com';

  constructor(private http: HttpClient,private router: Router, private alertsService: AlertsService) {   }

  login(email: string, password: string) {
    
    this.http.post(this.api + '/login', {correoElectronico: email,contrasenia: password})
    .subscribe((resp:Data) => {
      this.router.navigate(['landing']);
      localStorage.setItem('auth_token', resp.token);
      this.alertsService.confirmMessage("Inicio de sesión exitoso");
    },
      error => {
        if (error.error.error.code == 400) {
          this.alertsService.errorMessage("Email y/o contraseña incorrectos")

          return;
        }
        if (error.error.error.code == 401) {
          this.alertsService.errorMessage("Usuario bloqueado, comuníquese con el administrador desde la sección contáctenos.")
          return;
        }
        this.alertsService.errorMessage("Email y/o contraseña incorrectos");     
  
      }
      );
    }
    

    logout() {
      localStorage.removeItem('token');
    }

    public get logIn(): boolean {
      return (localStorage.getItem('token') !== null);
    }

}

