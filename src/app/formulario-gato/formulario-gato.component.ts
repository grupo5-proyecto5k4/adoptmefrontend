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
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import {Data} from '@angular/router';

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
  Titulo="Registro de Gato";
  public archivos: any = [];
  private fileToUpload: File = null;
  public previsualizacion: string;
  public loading: boolean;


  constructor(private http:HttpClient,private sanitizer: DomSanitizer,private auth: AuthService, private  alerts: AlertsService,private photo: photoService,private route:Router,private matdialog: MatDialog, private dialogRef: MatDialogRef<FormularioGatoComponent>) { }
    
  ngOnInit(): void {
    this.SignupForm= new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.maxLength(30),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      estado: new FormControl('', Validators.required),
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
      
    });

    this.dialogRef.disableClose=true;
    
  }

  capturarFile(event): any {
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      if (archivoCapturado) {
        let fileSize = archivoCapturado.size;
        let fileSizeKb = Math.round(fileSize / 1024);
        if (fileSizeKb > 5120) {
          this.alerts.errorMessage('El tamaño máximo de la imagen permitida es de 5MB.')
          return false;
        }
        else {
          this.previsualizacion = imagen.base;
          return true;
        }
      }
      else {
        return true;
      }       
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

  clearImage(): any {
    this.previsualizacion = '';
    this.archivos = [];
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
 
  
    registrarAnimal(){
      
      if(this.SignupForm.valid){        
        let mascota: Mascota = new Mascota();
        mascota.tipoMascota=1; 
        mascota.nombreMascota= this.SignupForm.controls.nombre.value;
        mascota.estado=this.SignupForm.controls.estado.value;
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
            
       this.photo.registroAnimal(mascota, this.auth.getToken()).subscribe(
         (resp: Data) => {
          try {
            this.loading = true;
            const formularioDeDatos = new FormData();
            this.archivos.forEach(archivo => {
              formularioDeDatos.append('imagen', archivo)
              formularioDeDatos.append('id_Animal',resp.id_Animal)
            
            })
            
            this.http.post(`https://adoptmebackend.herokuapp.com/fotos/imagen/add`, formularioDeDatos)
              .subscribe(() => {
                this.loading = false;
                
      
              }, () => {
                this.loading = false;
                alert('Error');
              })
          } catch (e) {
            this.loading = false;
            console.log('ERROR', e);
      
          }
           
          this.alerts.confirmMessage("Su mascota ha sido registrada").then((result)=> window.location.href='/mascotas')
         },
         () => {
           this.alerts.errorMessage("No se ha podido registrar su mascota");
           
         }
       )

       }
       

     }

}
