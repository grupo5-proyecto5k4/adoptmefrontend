import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { RegistroMascotasService } from 'src/services/registro-mascotas.service';
import { MatDialog } from '@angular/material/dialog';
import { Mascota } from 'src/models/IMascota';
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


@Component({
  selector: 'app-publicaciones-adop',
  templateUrl: './publicaciones-adop.component.html',
  styleUrls: ['./publicaciones-adop.component.scss']
})

export class PublicacionesAdopComponent implements OnInit {

  mascotasPubAdopcion = [];
  FilterForm: FormGroup;
  tamanos = ['Pequeño','Mediano','Grande'];
  gatoSeleccionado = false;
  filtroAplicado = false;

  myControl = new FormControl();
  selectedBarrio; 
  filteredBarrios: Observable<string[]>;
  barrios: string[] = [];
  barriosBack;
  /*
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Pet> = new MatTableDataSource<Pet>(DATA);
*/
  constructor(private BarriosService: BarriosService,public registroMascotasService: RegistroMascotasService, private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) {
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
    /*
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    this.paginator._intl.itemsPerPageLabel = "Animales por página";
    */ 
    // "En adopcion"
    this.registroMascotasService.getMascotas(1).subscribe(dataOne => {

      // "En adopcion y en provisorio"
      this.registroMascotasService.getMascotas(0).subscribe(dataBoth => {
        this.unirMascotas(dataBoth, dataOne)
      })
    },
    err => {

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

  changeTipoAnimal(){
    if (this.FilterForm.controls.tipoMascota.value == 1){
      this.gatoSeleccionado = true;
    }
    else{
      this.gatoSeleccionado = false;
    }
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.barrios.filter(option => option.toLowerCase().includes(filterValue));
  }
  OnHumanSelected(SelectedHuman) {
    this.selectedBarrio = SelectedHuman;
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
    this.mascotasPubAdopcion = [];
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
    this.mascotasPubAdopcion = data;
    //Recorro mascotas
    console.log("cantidad de mascotas a mostrar:")
    console.log(this.mascotasPubAdopcion)
    if (this.mascotasPubAdopcion.length > 0) {
      for (let x = 0; x < (this.mascotasPubAdopcion.length); x++) {
        // Edad 
        this.mascotasPubAdopcion[x].edad = this.calculateAge(data[x].fechaNacimiento);
        if (data[x].Foto.length > 0) {
          //Recorro imágenes
          for (let i = 0; i < data[x].Foto.length; i++) {
            // Foto Principal
            if (data[x].Foto[i].esPrincipal) {
              this.mascotasPubAdopcion[x].imagenCard = data[x].Foto[i].foto;
            }
          }
        }
      }
    }
  }


  async buscar() {
    this.filtroAplicado = true;
    let filters: any = {};
    if (this.FilterForm.controls.tamanoFinal.value !== '') {
      if (this.FilterForm.controls.tipoMascota.value === 1){
        filters.tamañoFinal = 'No aplica';
      }
        else {
      filters.tamañoFinal = this.FilterForm.controls.tamanoFinal.value;
      }
    }
    if (this.FilterForm.controls.sexo.value !== '') {
      filters.sexo = this.FilterForm.controls.sexo.value;
    }
    if (this.selectedBarrio !== '') {
      filters.barrio = this.selectedBarrio;
    }
    if (this.FilterForm.controls.tipoMascota.value !== '') {
      filters.tipoMascota = this.FilterForm.controls.tipoMascota.value;
    }

    filters.estado = "Disponible Adopción";
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
  }

  openMascota(mascota: Mascota){
    this.dialog.open(VerMascotaComponent, {
      data: {
          mascota: mascota,
          accion: 1
      }
  })
  }

  activarTamanio(){
    this.FilterForm.controls['tamanoFinal'].setValue("");
    this.FilterForm.controls.tamanoFinal.enable();
  }

  desactivarTamanio(){
    this.FilterForm.controls['tamanoFinal'].setValue("No aplica");
    this.FilterForm.controls.tamanoFinal.disable();
  }

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
}