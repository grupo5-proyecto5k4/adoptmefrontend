import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { RegistroMascotasService } from 'src/services/registro-mascotas.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-registro-mascota',
  templateUrl: './registro-mascota.component.html',
  styleUrls: ['./registro-mascota.component.scss']
})
export class RegistroMascotaComponent implements OnInit {

  Titulo = "Registro de mascota";
  mascotasUsuario: any;
  mascotasUsuarioProvi: any;
  mascotasUsuarioProAdop: any;
  mascotasUsuarioAdop: any;

  mascotasPrueba: any;
  color: any;
  mascotasUsuarioEnProvi: any;
  mascotasUsuarioAdoptado: any;
  mascotasUsuarioNoDisponibles;
  FilterForm: FormGroup;
  tamanos = ['Pequeño', 'Mediano', 'Grande'];
  gatoSeleccionado = false;
  filtroDisponibleAplicado = false;
  filtroNoDisponibleAplicado = false;

  constructor(public registroMascotasService: RegistroMascotasService, private dialog: MatDialog, private auth: AuthService) {
  }

  ngOnInit() {

    this.iniciarForm();

    // SECCIÓN NO DISPONIBLES: Adoptado (3) y En Provisorio (4)
    //
    this.registroMascotasService.getMascotasUser(4, this.auth.getToken()).subscribe(dataEnProvi => {
      if (dataEnProvi.mesage === "[]") {
        dataEnProvi = [];
      }
      this.mascotasUsuarioEnProvi = dataEnProvi;

      this.registroMascotasService.getMascotasUser(3, this.auth.getToken()).subscribe(dataAdoptado => {
        if (dataAdoptado.mesage === "[]") {
          dataAdoptado = [];
        }

        this.unirMascotasNoDisponibles(dataEnProvi,dataAdoptado);

      },
        err => {
          console.log('ERROR...')
        }
      );



      // Sección DISPONIBLES: Disponible Adopción, Disponible Provisorio y Disponible Adopción y Provisorio
      // Disponible Provisorio
      this.registroMascotasService.getMascotasUser(2, this.auth.getToken()).subscribe(dataProvi => {
        if (dataProvi.mesage === "[]") {
          dataProvi = [];
        }
        this.mascotasUsuarioProvi = dataProvi;

        // Provisorio y Adopcion 
        this.registroMascotasService.getMascotasUser(0, this.auth.getToken()).subscribe(dataProAdop => {
          if (dataProAdop.mesage === "[]") {
            dataProAdop = [];
          }
          this.mascotasUsuarioProAdop = dataProAdop;

          // Disponible Adopción
          this.registroMascotasService.getMascotasUser(1, this.auth.getToken()).subscribe(dataAdop => {
            if (dataAdop.mesage === "[]") {
              dataAdop = [];
            }
            this.mascotasUsuarioAdop = dataAdop;

            this.unirMascotasDisponibles(dataProvi, dataProAdop, dataAdop)
          })
        })
      },
        err => {
          console.log('ERROR...')
        }
      )

    })
  }


  changeTipoAnimal() {
    if (this.FilterForm.controls.tipoMascota.value == 1) {
      this.gatoSeleccionado = true;
    }
    else {
      this.gatoSeleccionado = false;
    }
  }


  iniciarForm() {
    this.FilterForm = new FormGroup({
      nombre: new FormControl(''),
      tipoMascota: new FormControl(''),
      tamanoFinal: new FormControl(''),
      sexo: new FormControl(''),
      barrio: new FormControl(''),
    });
  }

  async buscarMascotasNoDisponibles(){
    this.filtroNoDisponibleAplicado = true;
    let filters: any = {};
    if (this.FilterForm.controls.nombre.value !== '') {
      filters.nombres = this.FilterForm.controls.nombre.value;
    }
    if (this.FilterForm.controls.barrio.value !== '') {
      filters.barrio = this.FilterForm.controls.barrio.value;
    }
    if (this.FilterForm.controls.tamanoFinal.value !== '') {
      filters.tamañoFinal = this.FilterForm.controls.tamanoFinal.value;
    }
    if (this.FilterForm.controls.sexo.value !== '') {
      filters.sexo = this.FilterForm.controls.sexo.value;
    }
    if (this.FilterForm.controls.tipoMascota.value !== '') {
      filters.tipoMascota = this.FilterForm.controls.tipoMascota.value;
    }
    filters.responsableId = this.auth.getCurrentUser()._id;

    // SECCIÓN NO DISPONIBLES: Adoptado (3) y En Provisorio (4)
    filters.estado = "En Provisorio";
    this.registroMascotasService.getMascotasPropiasFiltradas(filters, this.auth.getToken()).subscribe(dataEnProvi => {
      this.mascotasUsuarioEnProvi = dataEnProvi;

      filters.estado = "Adoptado";
      this.registroMascotasService.getMascotasPropiasFiltradas(filters, this.auth.getToken()).subscribe(dataAdoptado => {

        this.unirMascotasNoDisponibles(dataEnProvi,dataAdoptado);

      });
    });
  }

  async buscarMascotasDisponibles() {
    this.filtroDisponibleAplicado = true;
    let filters: any = {};
    if (this.FilterForm.controls.nombre.value !== '') {
      filters.nombres = this.FilterForm.controls.nombre.value;
    }
    if (this.FilterForm.controls.barrio.value !== '') {
      filters.barrio = this.FilterForm.controls.barrio.value;
    }
    if (this.FilterForm.controls.tamanoFinal.value !== '') {
      filters.tamañoFinal = this.FilterForm.controls.tamanoFinal.value;
    }
    if (this.FilterForm.controls.sexo.value !== '') {
      filters.sexo = this.FilterForm.controls.sexo.value;
    }
    if (this.FilterForm.controls.tipoMascota.value !== '') {
      filters.tipoMascota = this.FilterForm.controls.tipoMascota.value;
    }
    filters.responsableId = this.auth.getCurrentUser()._id;

          // Sección DISPONIBLES: Disponible Adopción, Disponible Provisorio y Disponible Adopción y Provisorio
      // Disponible Provisorio
      filters.estado = "Disponible Provisorio";
      this.registroMascotasService.getMascotasPropiasFiltradas(filters, this.auth.getToken()).subscribe(dataProvi => {
        this.mascotasUsuarioProvi = dataProvi;

        // Provisorio y Adopcion 
        filters.estado = "Disponible Adopción y Provisorio";
        this.registroMascotasService.getMascotasPropiasFiltradas(filters, this.auth.getToken()).subscribe(dataProAdop => {
          this.mascotasUsuarioProAdop = dataProAdop;

          // Disponible Adopción
          filters.estado = "Disponible Adopción";
          this.registroMascotasService.getMascotasPropiasFiltradas(filters, this.auth.getToken()).subscribe(dataAdop => {
            this.mascotasUsuarioAdop = dataAdop;

            this.unirMascotasDisponibles(dataProvi, dataProAdop, dataAdop)
          })
        })
      },
        err => {
          console.log('ERROR...')
        }
      )
    window.scrollTo(0, 0);
  }


  unirMascotasDisponibles(dataProvi: any, dataProAdop: any, dataAdop: any) {
    this.mascotasUsuario = [];
    //Junto los de "D.provisorio", "D.Adopción" y "D.Adopción y provisorio"
    var data = [].concat(dataProvi, dataAdop, dataProAdop);
    this.mascotasUsuario = data;

    if (data.length > 0) {
      //Recorro mascotas
      for (let x = 0; x < (data.length); x++) {
        if (data[x].Foto.length != 0) {
          //Recorro imágenes
          for (let i = 0; i < data[x].Foto.length; i++) {
            // Foto Principal
            if (data[x].Foto[i].esPrincipal) {
              this.mascotasUsuario[x].imagenCard = data[x].Foto[i].foto;
            }
          }
        }
      }
    } 
  }

  unirMascotasNoDisponibles(dataEnProvi: any, dataAdoptado: any) {
    this.mascotasUsuarioNoDisponibles = [];

    var dato = [].concat(dataEnProvi, dataAdoptado);
    this.mascotasUsuarioNoDisponibles = dato;


    if (dato.length > 0) {
      //Recorro mascotas
      for (let x = 0; x < (dato.length); x++) {
        if (dato[x].Foto.length != 0) {
          //Recorro imágenes
          for (let i = 0; i < dato[x].Foto.length; i++) {
            // Foto Principal
            if (dato[x].Foto[i].esPrincipal) {
              this.mascotasUsuarioNoDisponibles[x].imagenCard = dato[x].Foto[i].foto;
            }
          }
        }
      }
    }
  }


  clean() {
    this.iniciarForm();
  }

}
