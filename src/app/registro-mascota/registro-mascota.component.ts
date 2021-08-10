import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-mascota',
  templateUrl: './registro-mascota.component.html',
  styleUrls: ['./registro-mascota.component.scss']
})
export class RegistroMascotaComponent implements OnInit {
  Titulo="Registro de Mascota";

  constructor() { }

  ngOnInit(): void {
  }

  signupGato(){}

  signupPerro(){}

}
