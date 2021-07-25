import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import{AuthService} from '../auth.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlertsService } from 'src/utils/alerts.service';
import { User } from 'src/models/IUser';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl:'./inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})

export class InicioSesionComponent{
  SignupForm: FormGroup;
  Titulo = "Iniciar Sesión"; 
  
  
  constructor(private authService: AuthService,private alertsService: AlertsService,private dialogref: MatDialogRef<InicioSesionComponent> ) {}
  
  
  ngOnInit() {
    this.SignupForm = new FormGroup({
      
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[^A-Z]*[A-Z])(?=.*[^0-9]*[0-9])[a-zA-Z0-9!@$.]{8,15}$')]),
     });

   this.dialogref.disableClose =true;

  }

  validatePassword() {
    return (((this.SignupForm.get('password').touched ||
    this.SignupForm.get('password').dirty) &&
    this.SignupForm.get('password').errors));
  }


  login() {

    if (this.SignupForm.valid) {
      let loginUser: User = new User();
      loginUser.correoElectronico= this.SignupForm.controls.email.value;
      loginUser.contrasenia=this.SignupForm.controls.password.value;
      this.authService.login(loginUser.correoElectronico, loginUser.contrasenia); 
    }
    
  }

  async init() {  }

}
