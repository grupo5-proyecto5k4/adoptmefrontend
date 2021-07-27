import { Component, OnInit,Inject } from '@angular/core';
import{MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {FormControl,NgForm, FormGroup,Validators, FormGroupDirective} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import{AuthService} from '../auth.service';
import {AlertsService} from 'src/utils/alerts.service';
import{User} from 'src/models/IUser';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl:'./inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})

export class InicioSesionComponent implements OnInit {
     titulo="Iniciar Sesión";
     SignUpForm: FormGroup;

  constructor(private dialog: MatDialog, private authservice: AuthService, private alertService: AlertsService) {}
    
  ngOnInit() { 
    this.SignUpForm= new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      password: new FormControl('',[Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[^A-Z]*[A-Z])(?=.*[^0-9]*[0-9])[a-zA-Z0-9!@$.]{8,15}$')])
    })
  }

  login(){
    if(this.SignUpForm.valid){
      let loginUser: User= new User;
      loginUser.correoElectronico= this.SignUpForm.controls.email.value;
      loginUser.contrasenia=this.SignUpForm.controls.password.value;
      this.authservice.login(loginUser.correoElectronico,loginUser.contrasenia);

    }
  }
  

}
