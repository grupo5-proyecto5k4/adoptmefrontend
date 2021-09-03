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
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import {FileItem, FileUploader,FileUploaderOptions,ParsedResponseHeaders} from 'ng2-file-upload';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import {MatProgressBar} from '@angular/material/progress-bar';
import { Foto } from 'src/models/IFoto';
import {AuthService} from '../auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';



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
  Titulo="Registro de Mascota";
  public archivos: any = [];
  private fileToUpload: File = null;
 
  public previsualizacion: string;
  public loading: boolean;
  

  constructor(private http:HttpClient,private sanitizer: DomSanitizer,private auth: AuthService, private  alerts: AlertsService,private photo: photoService,private route:Router,private matdialog: MatDialog, private dialogRef: MatDialogRef<FormularioGatoComponent>) { }
    
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
      conductaNiños: new FormControl('',Validators.required),
      conductaGatos: new FormControl('',Validators.required),
      conductaPerros: new FormControl('',Validators.required),
      descripcion: new FormControl('',[Validators.required,Validators.maxLength(150),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      imagen: new FormControl('',Validators.required),
    });

    this.dialogRef.disableClose=true;

    
  }

  capturarFile(event): any {
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);

    })
    this.archivos.push(archivoCapturado)
    
  }


  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })


  /**
   * Limpiar imagen
   */

  clearImage(): any {
    this.previsualizacion = '';
    this.archivos = [];
  }



  /**
   * Subir archivo
   */

  subirArchivo(): any {
    try {
      this.loading = true;
      const formularioDeDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('imagen', archivo)
      })
      
      this.http.post(`https://adoptmebackend.herokuapp.com/fotos/imagen/add`, formularioDeDatos)
        .subscribe(res => {
          this.loading = false;
          console.log('Respuesta del servidor', res);

        }, () => {
          this.loading = false;
          alert('Error 1 ');
        })
    } catch (e) {
      this.loading = false;
      console.log('ERROR 2', e);

    }
  }

 

  fileTypeValidator() {

    if (this.SignupForm.controls.imagen.dirty && this.SignupForm.controls.imagen.value != '') {
      let fileInput = this.SignupForm.controls.imagen.value;
      let allowedExtensions = /(\.jpg|\.png)$/i;
      if (!allowedExtensions.exec(fileInput)) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
  }

  fileSizeValidator() {
    if (this.fileToUpload) {
      let fileSize = this.fileToUpload.size;
      let fileSizeKb = Math.round(fileSize / 1024);
      if (fileSizeKb > 5120) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
  }
   
  
     registrarAnimal(){
            
       if(this.SignupForm.valid){
         let mascota: Mascota = new Mascota();
       mascota.tipoMascota=1; //gato si es perro es 0 
       mascota.nombreMascota= this.SignupForm.controls.nombre.value;
       mascota.esCachorro=this.SignupForm.controls.cachorro.value;
       mascota.tamañoFinal=this.SignupForm.controls.tamaño.value;
       mascota.sexo=this.SignupForm.controls.sexo.value;
       mascota.edad=this.SignupForm.controls.edad.value;
       mascota.razaPadre=this.SignupForm.controls.razaPadre.value;
       mascota.razaMadre=this.SignupForm.controls.razaMadre.value;
       mascota.castrado=this.SignupForm.controls.castrado.value;
       mascota.conductaNiños=this.SignupForm.controls.conductaNiños.value;
       mascota.conductaGatos=this.SignupForm.controls.conductaGatos.value;
       mascota.conductaPerros=this.SignupForm.controls.conductaPerros.value;
       mascota.descripcion=this.SignupForm.controls.descripcion.value;
      
     
       this.photo.registroAnimal(mascota, this.auth.getToken()).subscribe({
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
