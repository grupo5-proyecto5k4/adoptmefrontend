import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import {FormularioGatoComponent} from '../formulario-gato/formulario-gato.component';
import {FormularioPerroComponent} from '../formulario-perro/formulario-perro.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroMascotasService } from 'src/services/registro-mascotas.service';
import { MatPaginator} from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


export interface Pet {
  name: string;
  age: number;
  esCachorro: string;
  sexo: string;
}

const DATA: Pet[] = [
  {name: "Pepe", age: 3, esCachorro: "Adulto", sexo: "Hembra"},
  {name: "Limon", age: 2,  esCachorro: "Cachorro", sexo: "Macho"},
  {name: "Teodoro", age: 1,  esCachorro: "Adulto", sexo: "Hembra"},
  {name: "Zeus", age: 2,  esCachorro: "Cachorro", sexo: "Macho"},
  {name: "Jamón", age: 2,  esCachorro: "Cachorro", sexo: "Macho"},
  {name: "Messi", age: 1,  esCachorro: "Adulto", sexo: "Hembra"},
  {name: "Totin", age: 2,  esCachorro: "Cachorro", sexo: "Macho"},
  {name: "Jose", age: 2,  esCachorro: "Cachorro", sexo: "Macho"},
  {name: "Ragnar", age: 1,  esCachorro: "Adulto", sexo: "Hembra"},
  {name: "Osiris", age: 2,  esCachorro: "Cachorro", sexo: "Macho"},
  {name: "Jack", age: 5,  esCachorro: "Cachorro", sexo: "Macho"}
]

@Component({
  selector: 'app-nueva-mascota',
  templateUrl: './nueva-mascota.component.html',
  styleUrls: ['./nueva-mascota.component.scss']
})

export class NuevaMascotaComponent implements OnInit {

Titulo="Registro de mascota";
mascotasPubAdopcion: any;


@ViewChild(MatPaginator) paginator: MatPaginator;
obs: Observable<any>;
dataSource: MatTableDataSource<Pet> = new MatTableDataSource<Pet>(DATA);
  
constructor(public registroMascotasService:RegistroMascotasService, private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) {
}


ngOnInit() {
  this.changeDetectorRef.detectChanges();
  this.dataSource.paginator = this.paginator;
  this.obs = this.dataSource.connect();
  this.paginator._intl.itemsPerPageLabel = "Animales por página";

  this.registroMascotasService.getMascotas(1).subscribe(data => {
    this.mascotasPubAdopcion = data;
    console.log(data);
  },
  err => {
    console.log('VER SMS ERROR')
  }
  )
}

  signupGato(){
    this.dialog.open(FormularioGatoComponent)
  }

  signupPerro(){
    this.dialog.open(FormularioPerroComponent)
  }

}
