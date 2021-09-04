import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormularioGatoComponent} from '../formulario-mascota/formulario-mascota.component';

@Component({
  selector: 'app-registro-mascota',
  templateUrl: './registro-mascota.component.html',
  styleUrls: ['./registro-mascota.component.scss']
})
export class RegistroMascotaComponent implements OnInit {
Titulo="Registro de mascota";

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  signupGato(){
    this.dialog.open(FormularioGatoComponent)
  }

  signupPerro(){
    this.dialog.open(FormularioGatoComponent)
  }

}
