import { Component, OnInit } from '@angular/core';
import { DatosDonacionComponent } from '../datos-donacion/datos-donacion.component';
import { MatDialog } from '@angular/material/dialog';
import { CentroDonacionesService } from 'src/services/centro-donaciones.service';

@Component({
  selector: 'app-donaciones',
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.scss']
})
export class DonacionesComponent implements OnInit {

  constructor(private dialog: MatDialog, private CentroDonacionesService: CentroDonacionesService) {}

  centros:any;

  ngOnInit(): void {
    this.CentroDonacionesService.getCentrosDonaciones().subscribe(data => {
      console.log("DATA", data);
      this.centros = data;
  })}

  openInfo(centro) {
    this.dialog.open(DatosDonacionComponent, { data: { centrores: centro } });
  }
}

