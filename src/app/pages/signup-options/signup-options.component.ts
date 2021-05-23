import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupParticularComponent } from 'src/app/components/signup-particular/signup-particular.component';



@Component({
    selector: 'app-signup-options',
    templateUrl: './signup-options.component.html',
    styleUrls: ['./signup-options.component.scss']
})


export class SignupOptionsComponent {
    Titulo = "¿Cómo querés registrarte?";
    
    constructor(private dialog: MatDialog) { }

    ngOnInit() { }

    signupParticular(){
        this.dialog.open(SignupParticularComponent)
      }
      signupRescatist(){
    
      }

}
