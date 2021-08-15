import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FormularioPerroComponent} from '../formulario-perro/formulario-perro.component';

@Component({
  selector: 'app-registro-mascota',
  templateUrl: './registro-mascota.component.html',
  styleUrls: ['./registro-mascota.component.scss']
})
export class RegistroMascotaComponent implements OnInit {
  Titulo="Registro de Mascota";

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  signupGato(){
  }

  signupPerro(){
    this.dialog.open(FormularioPerroComponent)
  }

}


