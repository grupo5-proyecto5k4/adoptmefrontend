
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Mascota } from 'src/models/IMascota';
import { MatDialog } from '@angular/material/dialog';
import { RegistroMascotasService} from 'src/services/registro-mascotas.service';
import { VerMascotaComponent } from '../components/ver-mascota/ver-mascota.component';

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
  selector: 'app-publicaciones-prov',
  templateUrl: './publicaciones-prov.component.html',
  styleUrls: ['./publicaciones-prov.component.scss']
})


export class PublicacionesProvComponent implements OnInit {
  mascotasPubProvisorio: any;
  mascotasPub:any;

  /*
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Pet> = new MatTableDataSource<Pet>(DATA);
  */
  constructor(public registroMascotasService:RegistroMascotasService, private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    /*
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    this.paginator._intl.itemsPerPageLabel = "Animales por página";
    */
    // En provisorio
    this.registroMascotasService.getMascotas(2).subscribe(dataOne => {
      this.mascotasPub = dataOne;

      // "En adopcion y en provisorio"
      this.registroMascotasService.getMascotas(0).subscribe(dataBoth => {
        
        // Junto los de "En provisorio" con los de "En adopción y en provisorio"
            var data = [].concat(dataBoth, dataOne);
            this.mascotasPubProvisorio = data;
            //Recorro mascotas
            for (let x = 0; x < (data.length); x++){
              // Edad 
              this.mascotasPubProvisorio[x].edad = this.calculateAge(data[x].fechaNacimiento);
              if (data[x].Foto.length != 0){
                //Recorro imágenes
                for (let i = 0; i < data[x].Foto.length; i++){
                  // Foto Principal
                  if (data[x].Foto[i].esPrincipal){
                    this.mascotasPubProvisorio[x].imagenCard = data[x].Foto[i].foto;
                  }
                }
              }
            }
          }
          )
          
    },
    err => {
      console.log('ERROR...')
    }
    )
  }
  /*
  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
  */
  calculateAge(fechaNacimiento) {
    var today = new Date();
    var fechaNacimientoFormato = new Date(fechaNacimiento);
    var difference = (today.getTime() - fechaNacimientoFormato.getTime()) / (1000 * 60 * 60 * 24);
    var sms: String;
    if (difference < 365){
      sms = "Cachorro"
    } else {
      sms = "Adulto"
    }
    return sms
}

openMascota(mascota: Mascota){
  this.dialog.open(VerMascotaComponent, {
    data: {
        mascota: mascota,
        accion: 0
    }
})
}
}
