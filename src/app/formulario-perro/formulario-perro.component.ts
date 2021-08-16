import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertsService } from 'src/utils/alerts.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-formulario-perro',
  templateUrl: './formulario-perro.component.html',
  styleUrls: ['./formulario-perro.component.scss']
})
export class FormularioPerroComponent implements OnInit {
  SignupForm: FormGroup;
  Titulo = "Registrar Perro";

  constructor(private matdialog: MatDialog ,private alertsService: AlertsService, private dialogref: MatDialogRef<FormularioPerroComponent>) { }

  ngOnInit(): void {
    this.SignupForm= new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
      tamaño: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
      razaPadre:new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
    })

  this.dialogref.disableClose=true;

  }

}
