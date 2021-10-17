import { Component, OnInit, ViewChild } from '@angular/core';
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
import {vacuna} from '../../models/IVacuna';
import { MatTable } from '@angular/material/table';
import {NuevaVacuna} from '../../models/INuevaVacuna';
import { MascotaService } from 'src/services/mascota.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {Foto} from '../../models/IFoto';

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
  TituloVacuna="Registro de Vacunaciones";
  

  public loading: boolean;
  SignupFormVac: FormGroup;
  verTabla=false;
  edadInvalida: Boolean = false;
  mensajeEdad: string = "";
  isLoading: Boolean = false;
  adoptarChecked: Boolean = false;
  provisorioChecked: Boolean = false;
  marcaPrincipal: Boolean=false;

  //Lista de archivos seleccionados
  selectedFiles: FileList;
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo = []
  //Mensaje que almacena la respuesta de las Apis
  message = '';
  //Nombre del archivo para usarlo posteriormente en la vista html
  fileName = "";
  fileInfos: Observable<any>;
  urls = new Array<string>();
  previsualizacion: any;
  
  constructor(private http:HttpClient,private sanitizer: DomSanitizer, private mascotaService:MascotaService, private auth: AuthService, private  alerts: AlertsService,private photo: photoService,private route:Router,private matdialog: MatDialog, private dialogRef: MatDialogRef<FormularioGatoComponent>) { }
  @ViewChild(MatTable) tabla1: MatTable<Foto>;
  
  ngOnInit(): void {
    this.SignupForm= new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.maxLength(30),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      estado: new FormControl('', Validators.required),
      tamaño: new FormControl({value: 'No aplica', disabled: true}),
      sexo: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('',[Validators.required]),
      raza: new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      castrado: new FormControl('',Validators.required),
      conductaNiños: new FormControl('',Validators.required),
      conductaGatos: new FormControl('',Validators.required),
      conductaPerros: new FormControl('',Validators.required),
      descripcion: new FormControl('',[Validators.required,Validators.maxLength(150),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú.,;: ]*$')]),
      //foto: new FormControl('',Validators.required),
    });

    
    this.dialogRef.disableClose=true;
    
  }

  estadoChange(estado: number){
    if (estado == 0){
      this.adoptarChecked = !this.adoptarChecked;
    }
    else if(estado == 1){
      this.provisorioChecked = !this.provisorioChecked;
    }
    if (this.adoptarChecked && this.provisorioChecked){
      this.SignupForm.controls.estado.setValue(2);
    }
    else if (this.adoptarChecked && !this.provisorioChecked){
      this.SignupForm.controls.estado.setValue(0);
    }
    else if (!this.adoptarChecked && this.provisorioChecked){
      this.SignupForm.controls.estado.setValue(1);
    }
    else{
      this.SignupForm.controls.estado.setValue(null);
    }
  }

  marcarPrincipal(principal: number){
    if (principal == 0){
      this.marcaPrincipal = !this.marcaPrincipal;
    }
  }
  

 CalculateAge() {
  const today: Date = new Date();
  const fechaNacimiento: Date = new Date(this.SignupForm.controls.fechaNacimiento.value);
  let age: number = today.getFullYear() - fechaNacimiento.getFullYear();
  const month: number = today.getMonth() - fechaNacimiento.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < fechaNacimiento.getDate())) {
    age--;
  }
  if (month >= 0 && month < 12) {
    this.mensajeEdad = "La mascota es cachorro";
  }
  else if(month >= 12){
    this.mensajeEdad = "La mascota es adulta";
  }
  else {
    this.mensajeEdad = "Fecha de nacimiento no válida";
  }
  this.edadInvalida = true;
}


selectFiles(event) {
  this.progressInfo = [];
  //Validación para obtener el nombre del archivo si es uno solo
  //En caso de que sea >1 asigna a fileName length
  event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " imagenes a subir";
  this.selectedFiles = event.target.files;
  
  this.urls = [];
    
    if (event.target.files) {
      for (let file of event.target.files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  
  
}

clearImage(url:number){  
  this.urls.splice(url,1);
}
 
  
    registrarAnimal(){
                     
      this.isLoading = true;
      
      if(this.SignupForm.valid){        
        let mascota: Mascota = new Mascota();
        mascota.tipoMascota=1; 
        mascota.nombreMascota= this.SignupForm.controls.nombre.value;
        mascota.estado=this.SignupForm.controls.estado.value;
        mascota.fechaNacimiento=(this.SignupForm.controls.fechaNacimiento.value).toLocaleString();;
        mascota.tamañoFinal="No aplica";
        mascota.sexo=this.SignupForm.controls.sexo.value;
        mascota.raza=this.SignupForm.controls.raza.value;
        mascota.castrado=this.SignupForm.controls.castrado.value;
        mascota.conductaNiños=this.SignupForm.controls.conductaNiños.value;
        mascota.conductaGatos=this.SignupForm.controls.conductaGatos.value;
        mascota.conductaPerros=this.SignupForm.controls.conductaPerros.value;
        mascota.descripcion=this.SignupForm.controls.descripcion.value;
            
        console.log(mascota); 
                
        
       this.photo.registroAnimal(mascota, this.auth.getToken()).subscribe(
         (resp: Data) => {

        

          for (let i = 0; i < this.selectedFiles.length; i++) {
           this.progressInfo[i] = { value: 0, fileName: this.selectedFiles[i].name };
              let foto: Foto=new Foto();
              foto.foto=this.selectedFiles.item(i);
              foto.esPrincipal=this.marcaPrincipal;

            this.photo.upload(this.selectedFiles[i],resp.id_Animal).subscribe(
              event => {
                console.log('llego la foto');
                if (event.type === HttpEventType.UploadProgress) {
                  this.progressInfo[i].value = Math.round(100 * event.loaded / event.total);
                } 
              },
              err => {
                console.log('no llego la foto');
                this.progressInfo[i].value = 0;
                this.message = 'No se puede subir el archivo ';
              });

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




