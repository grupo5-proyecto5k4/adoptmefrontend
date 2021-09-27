import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-solicitudes',
  templateUrl: './listado-solicitudes.component.html',
  styleUrls: ['./listado-solicitudes.component.scss']
})
export class ListadoSolicitudesComponent implements OnInit {

  listadoSolicitudes = [1, 2, 3, 4];


  constructor() { }

  ngOnInit(): void {
  }

}
