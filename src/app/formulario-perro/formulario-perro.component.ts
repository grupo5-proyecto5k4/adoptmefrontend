import { Component, OnInit } from '@angular/core';
import {FormGroup, FormGroupDirective, NgForm,FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {AlertsService} from '../../utils/alerts.service';
import {Router, ActivatedRoute} from '@angular/router';
import {R3TargetBinder} from '@angular/compiler';
import {photoService} from '../../services/photo.service';
import {Mascota} from '../../models/IMascota';
import {validateVerticalPosition} from '@angular/cdk/overlay';
import {CloudinaryModule, CloudinaryConfiguration} from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';
import {FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders} from 'ng2-file-upload';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-formulario-perro',
  templateUrl:'./formulario-perro.component.html',
  styleUrls: ['./formulario-perro.component.scss']
})
export class FormularioPerroComponent implements OnInit {
  
  SignupForm: FormGroup;
  Titulo="Registrar Perro";
  image: File;
  photoSelected: string | ArrayBuffer;
  public uploader: FileUploader;

  constructor(private alerts: AlertsService, private photo: photoService,private route: Router, private matdialog: MatDialog, private dialogRef: MatDialogRef<FormularioPerroComponent>) { }

  ngOnInit(): void {
    this.SignupForm= new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.maxLength(30),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      cachorro: new FormControl('', Validators.required),
      tamaño:new FormControl('',[Validators.required,Validators.maxLength(30),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      sexo: new FormControl('',Validators.required),
      edad: new FormControl('',Validators.required),
      razaPadre: new FormControl('',[Validators.required,Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      razaMadre: new FormControl('', [Validators.required,Validators.maxLength(30),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      castrado: new FormControl('',Validators.required),
      fechaAlta: new FormControl('',Validators.required),
      conductaNiños: new FormControl('',[Validators.required,Validators.maxLength(150),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      conductaPerros:new FormControl('',[Validators.required,Validators.maxLength(150),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      conductaGatos: new FormControl('',[Validators.required,Validators.maxLength(150),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      descripcion:new FormControl('',[Validators.required,Validators.maxLength(150),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
    });

    this.dialogRef.disableClose=true;

    const uploaderOptions: FileUploaderOptions ={
      url:`https://api.cloudinary.com/v1_1/${'dsfz7jmoi'}/image/upload`,
      autoUpload:true,
      isHTML5: true,
      headers:[{name: 'X-Requested-With',
    value: 'XMLHttpRequest'}]
    }

    const upsertResponse = FileItem =>{
      if(FileItem.status!==200){
        console.log('upload to cloudinary failed!');
        console.log(FileItem);
        return false;
      }
      console.log(FileItem);
      console.log(FileItem.data.url);
    }

    this.uploader= new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm=(FileItem:any, form:FormData):any =>{
      form.append("file",FileItem);
      form.append("upload_preset","fotos_mascotas");
      FileItem.withCredentials =false;
      return {FileItem,form};
    } 
  };


  onPhotoSelected(event: HtmlInputEvent): void{
    if(event.target.files && event.target.files[0]){
      this.image=<File>event.target.files[0];

      const reader=new FileReader();
      reader.onload= e => this.photoSelected=reader.result;
      reader.readAsDataURL(this.image);
    }
  }



  registrarAnimal(){
    if(this.SignupForm.valid){
      let mascota:Mascota= new Mascota();

      mascota.nombreMascota=this.SignupForm.controls.nombre.value;
      mascota.esCachorro=this.SignupForm.controls.cachorro.value;
      mascota.tamañoFinal=this.SignupForm.controls.tamaño.value;
      mascota.sexo=this.SignupForm.controls.sexo.value;
      mascota.edad=this.SignupForm.controls.edad.value;
      mascota.razaMadre=this.SignupForm.controls.razaPadre.value;
      mascota.razaMadre=this.SignupForm.controls.razaMadre.value;
      mascota.castrado=this.SignupForm.controls.castrado.value;
      mascota.fechaAlta=this.SignupForm.controls.fechaAlta.value;
      mascota.conductaNiños=this.SignupForm.controls.conductaNiños.value;
      mascota.conductaPerros=this.SignupForm.controls.conductaPerros.value;
      mascota.conductaGatos=this.SignupForm.controls.conductaGatos.value;
      mascota.descripcion=this.SignupForm.controls.descripcion.value;

      this.photo.registroAnimal(mascota).subscribe({
        complete: () => {
          this.alerts.confirmMessage("Su mascota ha sido registrada").then((result) => window.location.href='/mascotas')
        },
        error: (err:any) => {
          this.alerts.errorMessage(err.error.error);
        }
      })
    }
  }

}
