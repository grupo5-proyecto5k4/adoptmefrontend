import { Component, OnInit,Inject } from '@angular/core';
import{MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {FormControl,NgForm, FormGroup,Validators, FormGroupDirective} from '@angular/forms';
import { Data, Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import{AuthService} from '../auth.service';
import {AlertsService} from 'src/utils/alerts.service';
import{User} from 'src/models/IUser';
import {ErrorStateMatcher} from '@angular/material/core';
import { LocalStorageService } from 'src/services/local-storage.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl:'./inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})

export class InicioSesionComponent implements OnInit {
     titulo="Iniciar Sesión";
     SignUpForm: FormGroup;
     isLoading: Boolean = false;
    
  constructor(private dialog: MatDialog, private authservice: AuthService,private localStorageService: LocalStorageService, private router: Router, private alertsService: AlertsService) {}
    
  ngOnInit() { 
    this.SignUpForm= new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      password: new FormControl('',[Validators.required])
    })
  }


  validateButton() {
    if (this.SignUpForm.valid) {
      document.getElementById("confirmar").classList.remove("buttonDisabled");
    } else {
      document.getElementById("confirmar").classList.add("buttonDisabled");
    }
  }

  login(){
    if(this.SignUpForm.valid){
      this.isLoading = true;
      let loginUser: User= new User;
      loginUser.correoElectronico= this.SignUpForm.controls.email.value;
      loginUser.contrasenia=this.SignUpForm.controls.password.value;
      this.authservice.login(loginUser.correoElectronico,loginUser.contrasenia).subscribe((resp:Data) => {
        localStorage.setItem('auth_token', resp.token);
        let currentUser = this.authservice.getUser(resp.token).then((r) => {
          this.authservice.setUser(r);
          this.localStorageService.setProfile(r.tipoUsuario);  
          this.alertsService.confirmMessage("Inicio de sesión exitoso").then(() => window.location.href = "/landing");
        });        
      },
        error => {
          this.isLoading = false;
          this.alertsService.errorMessage(error.error.error).then((result) => {
            this.isLoading = false;  
          });  
    
        }
        );
    }
  }
  

}
