import { Component, OnInit } from '@angular/core';
import { MatDialog }  from '@angular/material/dialog';

import { RegistroMascotasService } from 'src/services/registro-mascotas.service';


@Component({
  selector: 'app-registro-mascota',
  templateUrl: './registro-mascota.component.html',
  styleUrls: ['./registro-mascota.component.scss']
})
export class RegistroMascotaComponent implements OnInit {

Titulo="Registro de mascota";
mascotasPubAdopcion: any;

  
constructor(public registroMascotasService:RegistroMascotasService, private dialog: MatDialog) {
}

ngOnInit() {

  this.registroMascotasService.getMascotas(1).subscribe(data => {
    this.mascotasPubAdopcion = data;
    console.log(data);
  },
  err => {
    console.log('VER SMS ERROR')
  }
  )
}

}
