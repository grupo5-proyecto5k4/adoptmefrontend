import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-datos-donacion',
  templateUrl: './datos-donacion.component.html',
  styleUrls: ['./datos-donacion.component.scss']
})
export class DatosDonacionComponent implements OnInit {

  SolicitudForm:any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private auth: AuthService){}

  ngOnInit(): void {
    console.log("CENTROOO: ", this.data);

    this.SolicitudForm = new FormGroup({
      banco: new FormControl({value: this.data.centrores.Nombre, disabled:true}),
      cbu: new FormControl({ value: this.data.centrores.Nombre, disabled: true}),
      alias: new FormControl({value: this.data.centrores.Nombre, disabled: true}),
      telefono: new FormControl({value: this.data.centrores.Nombre, disabled:true}),
      email: new FormControl({value: this.data.centrores.Nombre, disabled:true}),
      instagram: new FormControl({value: this.data.centrores.Nombre, disabled:true}),
      facebook: new FormControl({value: this.data.centrores.Nombre, disabled:true})
    });  
  }

}
