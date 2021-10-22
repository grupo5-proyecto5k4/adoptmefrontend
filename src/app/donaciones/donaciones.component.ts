import { Component, OnInit } from '@angular/core';
import { DatosDonacionComponent } from '../datos-donacion/datos-donacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-donaciones',
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.scss']
})
export class DonacionesComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  centros:any;

  ngOnInit(): void {
    this.centros = [
      {
        "Nombre":"Pepe",
      "Banco": "Frances"
      },
      {
          "Nombre":"CR Mili",
        "Banco": "Galicia"
      },
    ]
  }

  openInfo(centro) {
    this.dialog.open(DatosDonacionComponent, { data: { centrores: centro } });
  }
}