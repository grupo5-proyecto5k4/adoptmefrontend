import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Mascota } from 'src/models/IMascota';
import { MatDialog } from '@angular/material/dialog';
import { RegistroMascotasService } from 'src/services/registro-mascotas.service';
import { VerMascotaComponent } from '../components/ver-mascota/ver-mascota.component';
import { FormControl, FormGroup } from '@angular/forms';
import { BarriosService } from 'src/services/barrios.service';
import {map, startWith} from 'rxjs/operators';

export interface Pet {
  name: string;
  age: number;
  esCachorro: string;
  sexo: string;
}


const DATA: Pet[] = [
  { name: "Pepe", age: 3, esCachorro: "Adulto", sexo: "Hembra" },
  { name: "Limon", age: 2, esCachorro: "Cachorro", sexo: "Macho" },
  { name: "Teodoro", age: 1, esCachorro: "Adulto", sexo: "Hembra" },
  { name: "Zeus", age: 2, esCachorro: "Cachorro", sexo: "Macho" },
  { name: "Jamón", age: 2, esCachorro: "Cachorro", sexo: "Macho" },
  { name: "Messi", age: 1, esCachorro: "Adulto", sexo: "Hembra" },
  { name: "Totin", age: 2, esCachorro: "Cachorro", sexo: "Macho" },
  { name: "Jose", age: 2, esCachorro: "Cachorro", sexo: "Macho" },
  { name: "Ragnar", age: 1, esCachorro: "Adulto", sexo: "Hembra" },
  { name: "Osiris", age: 2, esCachorro: "Cachorro", sexo: "Macho" },
  { name: "Jack", age: 5, esCachorro: "Cachorro", sexo: "Macho" }
]

@Component({
  selector: 'app-publicaciones-prov',
  templateUrl: './publicaciones-prov.component.html',
  styleUrls: ['./publicaciones-prov.component.scss']
})


export class PublicacionesProvComponent implements OnInit {
  mascotasPubProvisorio = [];
  FilterForm: FormGroup;
  tamanos = ['Pequeño','Mediano','Grande'];
  gatoSeleccionado = false;
  filtroAplicado = false;

  myControl = new FormControl();
  selectedBarrio; 
  filteredBarrios: Observable<string[]>;
  barrios: string[] = [];
  barriosBack;

  SelectedHuman = '';

  /*
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Pet> = new MatTableDataSource<Pet>(DATA);
  */
  constructor(private BarriosService: BarriosService, public registroMascotasService: RegistroMascotasService, private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {

    this.BarriosService.getBarrios().subscribe(data => {
      this.barriosBack = data;
      for (let x = 0; x < this.barriosBack.length; x++){
        this.barrios.push(this.barriosBack[x].nombre);
      }
      this.filteredBarrios = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    });

    this.iniciarForm();

    // En provisorio
    this.registroMascotasService.getMascotas(2).subscribe(dataOne => {

      // "En adopcion y en provisorio"
      this.registroMascotasService.getMascotas(0).subscribe(dataBoth => {
        this.unirMascotas(dataBoth, dataOne)
      }
      )

    },
      err => {

      }
    )
  }


  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.barrios.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  changeTipoAnimal(){
    if (this.FilterForm.controls.tipoMascota.value == 1){
      this.gatoSeleccionado = true;
    }
    else{
      this.gatoSeleccionado = false;
    }
  }

  iniciarForm(){
    this.FilterForm = new FormGroup({
      nombre: new FormControl(''),
      tipoMascota: new FormControl(''),
      tamanoFinal: new FormControl({value: '', disabled:true}),
      sexo: new FormControl(''),
      barrio: new FormControl('') 
    });
  }

  unirMascotas(dataBoth: any, dataOne: any) {
    this.mascotasPubProvisorio = [];
    // Junto los de "En adopción" con los de "En adopción y en provisorio"
    let data = undefined;
    if (dataBoth && dataOne) {
      data = [].concat(dataBoth, dataOne);
    }
    else if(dataBoth[0]._id){
      data = dataBoth;
    }
    else{
      data = dataOne;
    }
    this.mascotasPubProvisorio = data;
    //Recorro mascotas
    console.log("cantidad de mascotas a mostrar:")
    console.log(this.mascotasPubProvisorio)
    if (this.mascotasPubProvisorio.length > 0) {
      for (let x = 0; x < (this.mascotasPubProvisorio.length); x++) {
        // Edad 
        this.mascotasPubProvisorio[x].edad = this.calculateAge(data[x].fechaNacimiento);
        if (data[x].Foto.length > 0) {
          //Recorro imágenes
          for (let i = 0; i < data[x].Foto.length; i++) {
            // Foto Principal
            if (data[x].Foto[i].esPrincipal) {
              this.mascotasPubProvisorio[x].imagenCard = data[x].Foto[i].foto;
            }
          }
        }
      }
    }
  }

  OnHumanSelected(SelectedHuman) {
    this.selectedBarrio = SelectedHuman;
  }

  async buscar() {
    this.filtroAplicado = true;
    let filters: any = {};
    if (this.FilterForm.controls.nombre.value !== '') {
      filters.nombres = this.FilterForm.controls.nombre.value;
    }
    if (this.selectedBarrio !== '') {
      filters.barrio = this.selectedBarrio;
    }
    
    if (this.FilterForm.controls.sexo.value !== '') {
      filters.sexo = this.FilterForm.controls.sexo.value;
    }
    if (this.FilterForm.controls.tipoMascota.value !== '') {
      filters.tipoMascota = this.FilterForm.controls.tipoMascota.value;
    }
    if (this.FilterForm.controls.tamanoFinal.value !== '') {
      if (this.FilterForm.controls.tipoMascota.value === 1){
        filters.tamañoFinal = 'No aplica';
      }
        else {
       filters.tamañoFinal = this.FilterForm.controls.tamanoFinal.value;
      }
    }

    filters.estado = "Disponible Provisorio";
    this.registroMascotasService.getMascotasFiltradas(filters).subscribe(dataOne => {
      console.log(dataOne);

      // "En adopcion y en provisorio"
      filters.estado = "Disponible Adopción y Provisorio";
      this.registroMascotasService.getMascotasFiltradas(filters).subscribe(dataBoth => {
        console.log(dataBoth);
        this.unirMascotas(dataBoth, dataOne);
      })
    },
      err => {

      }
    )
    window.scrollTo(0, 0);
  }



  clean() {
    this.iniciarForm();
    this.SelectedHuman = '';
    this.selectedBarrio = '';
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
    if (difference < 365) {
      sms = "Cachorro"
    } else {
      sms = "Adulto"
    }
    return sms
  }

  activarTamanio(){
    this.FilterForm.controls['tamanoFinal'].setValue("");
    this.FilterForm.controls.tamanoFinal.enable();
  }

  desactivarTamanio(){
    this.FilterForm.controls['tamanoFinal'].setValue("No aplica");
    this.FilterForm.controls.tamanoFinal.disable();
  }

  openMascota(mascota: Mascota) {
    this.dialog.open(VerMascotaComponent, {
      data: {
        mascota: mascota,
        accion: 0
      }
    })
  }
}