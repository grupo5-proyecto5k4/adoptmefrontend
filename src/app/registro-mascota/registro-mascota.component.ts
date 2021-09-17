import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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

constructor(public registroMascotasService:RegistroMascotasService, private dialog: MatDialog, private auth: AuthService) {
}

ngOnInit() {

  // EN ESPERA - SE NECESITA CAMBIO DEL BACK DEL 404 NOT FOUND A UN ARRAY VACIO 
  // Borrador para armar card
  this.registroMascotasService.getMascotas(0).subscribe( prueba => {
    this.mascotasPrueba = prueba;
    console.log(this.mascotasPrueba);
    
        //Recorro mascotas
        for (let x = 0; x < (prueba.length); x++){
          if (prueba[x].Foto.length != 0){
            //Recorro imágenes
            for (let i = 0; i < prueba[x].Foto.length; i++){
              // Foto Principal
              if (prueba[x].Foto[i].esPrincipal){
                this.mascotasPrueba[x].imagenCard = prueba[x].Foto[i].foto;
              }
            }
          }
        }  
  })

  // Sección DISPONIBLES: Disponible Adopción, Disponible Provisorio y Disponible Adopción y Provisorio
  // Disponible Provisorio
  this.registroMascotasService.getMascotasUser(2, this.auth.getToken()).subscribe(dataProvi => {
    this.mascotasUsuarioProvi = dataProvi;

    // Provisorio y Adopcion 
    this.registroMascotasService.getMascotasUser(0, this.auth.getToken()).subscribe(dataProAdop => {
      this.mascotasUsuarioProAdop = dataProAdop;

      // Disponible Adopción
      this.registroMascotasService.getMascotasUser(1, this.auth.getToken()).subscribe(dataAdop => {
        this.mascotasUsuarioAdop = dataAdop;

        //Junto los de "D.provisorio", "D.Adopción" y "D.Adopción y provisorio"
        var data = [].concat(dataProvi, dataAdop, dataProAdop); 
        this.mascotasUsuario = data;

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
      }) 
    })
  },
  err => {
    console.log('ERROR...')
  }
  )
}
}
