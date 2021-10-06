import { Component, OnInit } from '@angular/core';
import { MatDialog }  from '@angular/material/dialog';

import { RegistroMascotasService } from 'src/services/registro-mascotas.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-registro-mascota',
  templateUrl: './registro-mascota.component.html',
  styleUrls: ['./registro-mascota.component.scss']
})
export class RegistroMascotaComponent implements OnInit {

Titulo="Registro de mascota";
mascotasUsuario:any;
mascotasUsuarioProvi:any;
mascotasUsuarioProAdop:any;
mascotasUsuarioAdop:any;

mascotasPrueba:any;
color:any;
mascotasUsuarioEnProvi:any;
mascotasUsuarioAdoptado:any;
mascotasUsuarioNoDisponibles;

constructor(public registroMascotasService:RegistroMascotasService, private dialog: MatDialog, private auth: AuthService) {
}

ngOnInit() {

  // SECCIÓN NO DISPONIBLES: Adoptado (3) y En Provisorio (4)
  //
  this.registroMascotasService.getMascotasUser(4, this.auth.getToken()).subscribe(dataEnProvi => {
    if (dataEnProvi.mesage === "[]"){
      dataEnProvi = [];
    }
    this.mascotasUsuarioEnProvi = dataEnProvi;

    this.registroMascotasService.getMascotasUser(3, this.auth.getToken()).subscribe(dataAdoptado => {
      if (dataAdoptado.mesage === "[]"){
        dataAdoptado = [];
      }
      console.log("Data en provi", dataEnProvi);
      console.log("Data adoptado", dataAdoptado);
        
      this.mascotasUsuarioAdoptado = dataAdoptado;

      var dato = [].concat(dataEnProvi, dataAdoptado); 
      this.mascotasUsuarioNoDisponibles = dato;
      console.log("Mascotas vacias", dato);

      if (dato.length > 0){
              //Recorro mascotas
              for (let x = 0; x < (dato.length); x++){
                if (dato[x].Foto.length != 0){
                  //Recorro imágenes
                  for (let i = 0; i < dato[x].Foto.length; i++){
                    // Foto Principal
                    if (dato[x].Foto[i].esPrincipal){
                      this.mascotasUsuarioNoDisponibles[x].imagenCard = dato[x].Foto[i].foto;
                    }
                  }
                }
              }   
            } else { console.log("No hay mascotas para visualizar") }
    
    },
  err => {
    console.log('ERROR...')
  }
  );

  // Sección DISPONIBLES: Disponible Adopción, Disponible Provisorio y Disponible Adopción y Provisorio
  // Disponible Provisorio
  this.registroMascotasService.getMascotasUser(2, this.auth.getToken()).subscribe(dataProvi => {
    if (dataProvi.mesage === "[]"){
      dataProvi = [];
    }
    this.mascotasUsuarioProvi = dataProvi;

    // Provisorio y Adopcion 
    this.registroMascotasService.getMascotasUser(0, this.auth.getToken()).subscribe(dataProAdop => {
      if (dataProAdop.mesage === "[]"){
        dataProAdop = [];
      }
      this.mascotasUsuarioProAdop = dataProAdop;

      // Disponible Adopción
      this.registroMascotasService.getMascotasUser(1, this.auth.getToken()).subscribe(dataAdop => {
        if (dataAdop.mesage === "[]"){
          dataAdop = [];
        }
        this.mascotasUsuarioAdop = dataAdop;

        //Junto los de "D.provisorio", "D.Adopción" y "D.Adopción y provisorio"
        var data = [].concat(dataProvi, dataAdop, dataProAdop); 
        this.mascotasUsuario = data;

        if (data.length > 0){
          //Recorro mascotas
          for (let x = 0; x < (data.length); x++){
            if (data[x].Foto.length != 0){
              //Recorro imágenes
              for (let i = 0; i < data[x].Foto.length; i++){
                // Foto Principal
                if (data[x].Foto[i].esPrincipal){
                  this.mascotasUsuario[x].imagenCard = data[x].Foto[i].foto;
                }
              }
            }
          }
        } else { console.log("No hay mascotas para visualizar") }
        

      }) 
    })
  },
  err => {
    console.log('ERROR...')
  }
  )})}}
