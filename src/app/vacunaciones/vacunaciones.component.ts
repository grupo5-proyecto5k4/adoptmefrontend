import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FormGroup, FormGroupDirective, NgForm,FormControl, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {AlertsService} from '../../utils/alerts.service';
import {Router, ActivatedRoute, Data} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-vacunaciones',
  templateUrl: './vacunaciones.component.html',
  styleUrls: ['./vacunaciones.component.scss']
})
export class VacunacionesComponent implements OnInit {
  Titulo="Registro de Vacunaciones";
  SignupForm: FormGroup;
  

  constructor(private dialog:MatDialog) { }

  columnas: string[] = ['nombre', 'fecha', 'dosis','proxDosis'];

  
  dataSource = null;

  ngOnInit() {

    this.SignupForm= new FormGroup({
      nombreVac:new FormControl('',Validators.required),
      fecha: new FormControl('',Validators.required),
      dosis: new FormControl('',Validators.required),
      proxDosis: new FormControl('',Validators.required),
    });
    
    
  }

  registrarVacuna(){
    //vacunas:Vacuna[] = [new Vacuna('papas',11,'sadfa',55),];

    this.dataSource = new MatTableDataSource();
  }
  
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  
}

export class Vacuna {
  constructor(public nombre: string, public fecha: Date, public dosis: string, public proxDosis: Date) {
  }
}


