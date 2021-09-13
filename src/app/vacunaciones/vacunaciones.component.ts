import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FormGroup, FormGroupDirective, NgForm,FormControl, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {AlertsService} from '../../utils/alerts.service';
import {Router, ActivatedRoute, Data} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';


export interface Element {
  name: string;
  fecha: string;
  dosis: string;
  ProximaDosis: string;
}

@Component({
  selector: 'app-vacunaciones',
  templateUrl: './vacunaciones.component.html',
  styleUrls: ['./vacunaciones.component.scss']
})
export class VacunacionesComponent implements OnInit {
  Titulo="Registro de Vacunaciones";
  SignupForm: FormGroup;
  displayedColumns = ['name', 'fecha', 'dosis', 'ProximaDosis'];
  datasource;

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {

    const ELEMENT_DATA: Element[] = [
      {name: 'Hydrogen', fecha:'djnw', dosis: 'H',ProximaDosis:'dss'},
      
      
    ];

    this.datasource = new MatTableDataSource(ELEMENT_DATA);

  }

  

  
  

}
