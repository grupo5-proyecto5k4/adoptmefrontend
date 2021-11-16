import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { RegistroMascotasService } from 'src/services/registro-mascotas.service';
import { MatDialog } from '@angular/material/dialog';
import { Mascota } from 'src/models/IMascota';
import { VerMascotaComponent } from '../components/ver-mascota/ver-mascota.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BarriosService } from 'src/services/barrios.service';
import {map, startWith} from 'rxjs/operators';
export interface Pet {
  name: string;
  age: number;
  esCachorro: string;
  sexo: string;
}


@Component({
  selector: 'app-visualizar-adopciones',
  templateUrl: './visualizar-adopciones.component.html',
  styleUrls: ['./visualizar-adopciones.component.scss']
})

export class VisualizarAdopcionesComponent implements OnInit {

  mascotasPubAdopcion = [];
  FilterForm: FormGroup;
  tamanos = ['Pequeño','Mediano','Grande'];
  gatoSeleccionado = false;
  filtroAplicado = false;
  countNoDisponibles = 0;

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

    this.iniciarForm();
    /*
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    this.paginator._intl.itemsPerPageLabel = "Animales por página";
    */ 
    // "En adopcion"
    this.buscar();
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

  unirMascotas(dataOne: any) {
    this.mascotasPubAdopcion = [];
    // Junto los de "En adopción" con los de "En adopción y en provisorio"
    let data = undefined;
    data = dataOne;
    this.mascotasPubAdopcion = data;
    //Recorro mascotas
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
    this.countNoDisponibles++;
    if (this.countNoDisponibles > 1) {
      this.filtroAplicado = true;
    }
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
    } if (this.selectedBarrio !== '') {
      filters.barrio = this.selectedBarrio;
    }
    if (this.FilterForm.controls.tipoMascota.value !== '') {
      filters.tipoMascota = this.FilterForm.controls.tipoMascota.value;
    }

    filters.estado = "Adoptado";
    this.registroMascotasService.getMascotasFiltradasAdmin(filters).subscribe(dataOne => {
      console.log(dataOne);
      this.unirMascotas(dataOne);
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