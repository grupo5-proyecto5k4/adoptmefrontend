import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FormGroup, FormGroupDirective, NgForm,FormControl, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {AlertsService} from '../../utils/alerts.service';
import {Router, ActivatedRoute, Data} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {vacuna} from '../../models/IVacuna';
import {photoService} from '../../services/photo.service';
import { MatTable } from '@angular/material/table';
import {NuevaVacuna} from '../../models/INuevaVacuna';

@Component({
  selector: 'app-vacunaciones',
  templateUrl: './vacunaciones.component.html',
  styleUrls: ['./vacunaciones.component.scss']
})
export class VacunacionesComponent implements OnInit {
  Titulo="Registro de Vacunaciones";
  SignupForm: FormGroup;
  vacunas: vacuna []= [];
  columnas = ['nombre', 'cantidadDosis','borrar'];
  vac: any= {};
  nuevaVacuna:any= {};
  nombreVac: string;
  cantDosis:number;

  constructor(private dialog:MatDialog, private servVacuna: photoService, private alertsService:AlertsService) {}
  @ViewChild(MatTable) tabla1: MatTable<vacuna>;

  borrarFila(cantD: number) {
    if (this.alertsService.errorMessage("Realmente quiere borrarlo?")) {
      this.vacunas.splice(cantD,1);
      this.tabla1.renderRows();
    }
  }
  
  ngOnInit():void {
    this.SignupForm= new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.maxLength(30),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      cantidadDosis: new FormControl('',Validators.required),
    });
       
  }

agregar() {
    this.vacunas.push(this.vac);
    this.nombreVac=this.vac.nombre;
    this.cantDosis=this.vac.cantidadDosis;
    this.tabla1.renderRows();
    this.vac={};
  } 
 
  registrarVacuna(){
    
    let nuevaVac: NuevaVacuna=new NuevaVacuna();
    nuevaVac.nombreVacuna=this.nombreVac;
    nuevaVac.cantidadDosis=this.cantDosis;
    //nuevaVac.id_Animal="idnuevo";
    console.log(nuevaVac);

    this.servVacuna.registrarVacuna(nuevaVac).subscribe({
      complete: () => {
        this.alertsService.confirmMessage("Datos de vacunación han sido registrados").then((result) => this.dialog.closeAll());
      },
      error: (err: any) => {
        this.alertsService.errorMessage(err.error.error).then((result) => {
         
        }
      )
      }
    })

  }
  
 
}





