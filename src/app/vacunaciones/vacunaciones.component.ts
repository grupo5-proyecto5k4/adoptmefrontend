import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FormGroup, FormGroupDirective, NgForm,FormControl, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {AlertsService} from '../../utils/alerts.service';
import {Router, ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-vacunaciones',
  templateUrl: './vacunaciones.component.html',
  styleUrls: ['./vacunaciones.component.scss']
})
export class VacunacionesComponent implements OnInit {
  Titulo="Registro de Vacunaciones";
  SignupForm: FormGroup;

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

}
