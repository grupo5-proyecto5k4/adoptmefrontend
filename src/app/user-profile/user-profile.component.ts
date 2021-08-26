import { Component, OnInit } from '@angular/core';
import{AuthService} from '../auth.service';
import { AlertsService } from 'src/utils/alerts.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private authservice: AuthService, private alertsService: AlertsService) { }

  ngOnInit(): void {
  }

  // El logout tiene que pasarse a otro boton dentro del  nuevo componente
  logOut() {
    this.alertsService.questionMessage("¿Desea cerrar la sesión?", "Cerrar sesión", "Salir", "Cancelar")
    .then((result) => {
      if (result.value) {
        this.authservice.cerrarSesion();
        window.location.href = "/landing";
      }});
    }
}
