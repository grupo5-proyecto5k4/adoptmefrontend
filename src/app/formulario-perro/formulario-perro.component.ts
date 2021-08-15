import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertsService } from 'src/utils/alerts.service';

@Component({
  selector: 'app-formulario-perro',
  templateUrl: './formulario-perro.component.html',
  styleUrls: ['./formulario-perro.component.scss']
})
export class FormularioPerroComponent implements OnInit {
  SignupForm: FormGroup;
  Titulo = "Registrar perro";

  constructor( private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.SignupForm= new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
      tamaño: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
      razaPadre:new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
    })
  }

}
