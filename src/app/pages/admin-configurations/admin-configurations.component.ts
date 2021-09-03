import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SignupParticularComponent } from 'src/app/components/signup-particular/signup-particular.component';
import { SignupRescatistComponent } from 'src/app/components/signup-rescatist/signup-rescatist.component';



@Component({
  selector: 'app-admin-configurations',
  templateUrl: './admin-configurations.component.html',
  styleUrls: ['./admin-configurations.component.scss'],
})


export class AdminConfigurationsComponent {
  Titulo = "Configuraciones";
  profile: any;

  constructor(private dialog: MatDialog, private router: Router, private authService: AuthService) { }

  ngOnInit() { 
    this.profile = this.authService.getProfile();
    if(this.profile == '0'){

    }
    else{
      window.scrollTo(0, 0);
      this.router.navigate(['/']);
    }
  }

  
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
