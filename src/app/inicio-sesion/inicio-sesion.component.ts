import { Component, OnInit,Inject } from '@angular/core';
import{MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog'; 
import {FormControl,NgForm, FormGroup,Validators, FormGroupDirective} from '@angular/forms';
//import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl:'./inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})

export class InicioSesionComponent implements OnInit {
     titulo="Iniciar Sesión";
     SignUpForm: FormGroup;

  constructor(private dialog: MatDialog) {}
    
  ngOnInit() { 
    this.SignUpForm= new FormGroup({
      email: new FormControl('',Validators.required)
    }

    )
  }
   open(){
     const dialogConf= new MatDialogConfig();
     this.dialog.open(InicioSesionComponent,dialogConf);
   }


}
