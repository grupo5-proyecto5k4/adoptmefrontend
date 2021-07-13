import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

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
  selector: 'app-publicaciones-adop',
  templateUrl: './publicaciones-adop.component.html',
  styleUrls: ['./publicaciones-adop.component.scss']
})

export class PublicacionesAdopComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Pet> = new MatTableDataSource<Pet>(DATA);

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    this.paginator._intl.itemsPerPageLabel = "Animales por página";
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

}
