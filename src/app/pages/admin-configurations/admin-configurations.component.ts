import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignupParticularComponent } from 'src/app/components/signup-particular/signup-particular.component';
import { SignupRescatistComponent } from 'src/app/components/signup-rescatist/signup-rescatist.component';



@Component({
  selector: 'app-admin-configurations',
  templateUrl: './admin-configurations.component.html',
  styleUrls: ['./admin-configurations.component.scss'],
})


export class AdminConfigurationsComponent {
  Titulo = "Configuraciones";

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit() { }

  
  gestionarUsuarios() {
    window.scrollTo(0, 0);
    this.router.navigate(['/gestionar-usuarios']);
  }

  gestionarMascotas() {
    window.scrollTo(0, 0);
    this.router.navigate(['/gestionar-mascotas']);
}

  visualizarAdopciones() {
    window.scrollTo(0, 0);
    this.router.navigate(['/visualizar-adopciones']);
  }

  visualizarProvisorios() {
        window.scrollTo(0, 0);
        this.router.navigate(['/visualizar-provisorios']);
  }

  habilitarCentros() {
    window.scrollTo(0, 0);
    this.router.navigate(['/habilitar-centros-rescatistas']);
}


}
