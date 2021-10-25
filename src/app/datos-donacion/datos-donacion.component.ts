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
    if (this.data.centrores.facebook == null) {
      this.data.centrores.facebook = "No especificado"
    };
    if (this.data.centrores.instagram == null) {
      this.data.centrores.instagram = "No especificado"
    };

    this.SolicitudForm = new FormGroup({
      banco: new FormControl({value: this.data.centrores.banco, disabled:true}),
      cbu: new FormControl({ value: this.data.centrores.cbu, disabled: true}),
      alias: new FormControl({value: this.data.centrores.alias, disabled: true}),
      telefono: new FormControl({value: this.data.centrores.numeroContacto, disabled:true}),
      email: new FormControl({value: this.data.centrores.correoElectronico, disabled:true}),
      instagram: new FormControl({value: this.data.centrores.instagram, disabled:true}),
      facebook: new FormControl({value: this.data.centrores.facebook, disabled:true})
    });  
  }

}
