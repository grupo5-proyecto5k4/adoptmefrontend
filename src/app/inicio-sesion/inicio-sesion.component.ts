import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import{AuthService} from '../auth.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl:'./inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent {

  email: '';
  password: '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password)
  }

}
