import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertsService } from 'src/utils/alerts.service';
import {Router, ActivatedRoute} from '@angular/router';
import { R3TargetBinder } from '@angular/compiler';
import {photoService} from '../../services/photo.service';
import {Mascota} from '../../models/IMascota';
import { validateVerticalPosition } from '@angular/cdk/overlay';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-formulario-gato',
  templateUrl: './formulario-gato.component.html',
  styleUrls: ['./formulario-gato.component.scss']
})
export class FormularioGatoComponent implements OnInit {

  SignupForm: FormGroup;
  Titulo="Registrar Gato";
  file: File;
  photoSelected: string | ArrayBuffer;
  
  constructor(private alerts: AlertsService,private photo: photoService,private route:Router,private matdialog: MatDialog, private dialogRef: MatDialogRef<FormularioGatoComponent>) { }

  ngOnInit(): void {
    this.SignupForm= new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.maxLength(30),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      cachorro: new FormControl('', Validators.required),
      tamaño: new FormControl('', [Validators.required,Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      sexo: new FormControl('', Validators.required),
      edad: new FormControl('',Validators.required),
      razaPadre: new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      razaMadre: new FormControl('',[Validators.required,Validators.maxLength(30),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      castrado: new FormControl('',Validators.required),
      fechaAlta: new FormControl('', Validators.required),
      conductaNiños: new FormControl('',[Validators.required,Validators.maxLength(150),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      conductaGatos: new FormControl('',[Validators.required,Validators.maxLength(150),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      conductaPerros: new FormControl('',[Validators.required,Validators.maxLength(150),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      descripcion: new FormControl('',[Validators.required,Validators.maxLength(150),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
    
    });

    this.dialogRef.disableClose=true;
  }

  onPhotoSelected(event: HtmlInputEvent):void{
     if(event.target.files && event.target.files[0]){
        this.file=<File>event.target.files[0];

        const reader= new FileReader();
        reader.onload = e => this.photoSelected = reader.result;
        reader.readAsDataURL(this.file);
     }

  } 
  
  uploadPhoto(titulo: HTMLInputElement, descripcion: HTMLInputElement){
       this.photo.createPhoto(titulo.value,descripcion.value,this.file)
       .subscribe(res =>{
        this.route.navigate(['/photos']);
       }, 
         err => console.log(err))
     }

     registrarAnimal(){
       if(this.SignupForm.valid){
         let mascota: Mascota = new Mascota();
       mascota.nombreMascota= this.SignupForm.controls.nombre.value;
       mascota.esCachorro=this.SignupForm.controls.cachorro.value;
       mascota.tamañoFinal=this.SignupForm.controls.tamaño.value;
       mascota.sexo=this.SignupForm.controls.sexo.value;
       mascota.edad=this.SignupForm.controls.edad.value;
       mascota.razaPadre=this.SignupForm.controls.razaPadre.value;
       mascota.razaMadre=this.SignupForm.controls.razaMadre.value;
       mascota.castrado=this.SignupForm.controls.castrado.value;
       mascota.fechaAlta=this.SignupForm.controls.fechaAlta.value;
       mascota.conductaNiños=this.SignupForm.controls.conductaNiños.value;
       mascota.conductaGatos=this.SignupForm.controls.conductaGatos.value;
       mascota.conductaPerros=this.SignupForm.controls.conductaPerros.value;
       mascota.descripcion=this.SignupForm.controls.descripcion.value;

       this.photo.registroAnimal(mascota).subscribe({
         complete: () => {
          this.alerts.confirmMessage("Su mascota ha sido registrada").then((result)=> window.location.href='/mascotas')
         },
         error: (err:any) => {
           this.alerts.errorMessage(err.error.error);
           
         }
       })

       }
       

     }

}
