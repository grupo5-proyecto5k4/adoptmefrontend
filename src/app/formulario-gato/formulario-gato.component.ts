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
  public archivos: any = [];
  private fileToUpload: File = null;
  public previsualizacion: string;
  public loading: boolean;
  listaVacunas:any[]=[]; //aca se guardaran todas las vacunas 
  SignupFormVac: FormGroup;
  vacunas: vacuna []= [];
  columnas = ['Nombre', 'CantidadDosis','Opciones'];
  vac: any= {};
  nuevaVacuna:any= {};
  nombreVac: string;
  cantDosis:number;
  verTabla=false;
  mensajeB= 'Agregar Vacunación';
  edadInvalida: Boolean = false;
  mensajeEdad: string = "";
  isLoading: Boolean = false;
  adoptarChecked: Boolean = false;
  provisorioChecked: Boolean = false;

  constructor(private http:HttpClient,private sanitizer: DomSanitizer, private mascotaService:MascotaService, private auth: AuthService, private  alerts: AlertsService,private photo: photoService,private route:Router,private matdialog: MatDialog, private dialogRef: MatDialogRef<FormularioGatoComponent>) { }
  @ViewChild(MatTable) tabla1: MatTable<vacuna>;
  
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
      foto: new FormControl('',Validators.required),
    });

    this.SignupFormVac= new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.maxLength(30),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      cantidadDosis: new FormControl('',Validators.required),
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

  borrarFila(cantD: number) {
    if (this.alerts.errorMessage("Realmente quiere borrarlo?")) {
      this.vacunas.splice(cantD,1);
      this.tabla1.renderRows();
    }
  }

  agregar() {
    this.vacunas.push(this.vac);
    this.nombreVac=this.vac.nombre;
    this.cantDosis=this.vac.cantidadDosis;
    this.tabla1.renderRows();
    this.vac={};
  } 

  mostrarVacunas(){
    this.mensajeB= this.verTabla? 'Agregar Vacunación': 'Cancelar Vacunación';
    this.verTabla=!this.verTabla;
   
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

  
    registrarAnimal(){
      this.alerts.confirmMessage("Su mascota ha sido registrada").then((result) => window.location.href = '/');
               
      //this.isLoading = true;
      /*
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
        this.alerts.confirmMessage("Su mascota ha sido registrada").then((result)=> window.location.href='/mascotas')
          
        /*
       this.photo.registroAnimal(mascota, this.auth.getToken()).subscribe(
         (resp: Data) => {
          try {
            this.loading = true;
            const formularioDeDatos = new FormData();
            this.archivos.forEach(archivo => {
              formularioDeDatos.append('imagen', archivo)
              formularioDeDatos.append('id_Animal',resp.id_Animal)
            
            })

            console.log(formularioDeDatos);
            let nuevaVac: NuevaVacuna=new NuevaVacuna();
            nuevaVac.nombreVacuna=this.nombreVac;
            nuevaVac.cantidadDosis=this.cantDosis;

            this.listaVacunas.push( nuevaVac,resp.id_Animal);
            //this.listaVacunas.push(resp.id_Animal)
            
            console.log(this.listaVacunas);
            
            this.mascotaService.registrarVacunas(this.listaVacunas)
              .subscribe({
                complete: () => {
                  this.alerts.confirmMessage("Su cuenta ha sido registrada").then((result) => window.location.href = '/');
                },
                error: (err: any) => {
                  this.alerts.errorMessage(err.error.error).then((result) => {
                    this.isLoading = false;
                  }
                )
                }
              });
            
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
       
       */

     }

}




