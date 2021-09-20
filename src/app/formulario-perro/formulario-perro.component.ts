import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormGroupDirective, NgForm,FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {AlertsService} from '../../utils/alerts.service';
import {Router, ActivatedRoute, Data} from '@angular/router';
import {R3TargetBinder} from '@angular/compiler';
import {photoService} from '../../services/photo.service';
import {Mascota} from '../../models/IMascota';
import {validateVerticalPosition} from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import {vacuna} from '../../models/IVacuna';
import { MatTable } from '@angular/material/table';
import {NuevaVacuna} from '../../models/INuevaVacuna';


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
  Titulo="Registro de Perro";
  TituloVacuna="Registro de Vacunaciones"
  public archivos: any = [];
  private fileToUpload: File = null;
  public previsualizacion: string;
  public loading: boolean;
  estadoMascota: string[] = ['Disponible Adopción', 'Disponible Provisorio', 'Disponible Adopción y Provisorio'];
  listaVacunas=[]; //aca se guardaran todas las vacunas 
  SignupFormVac: FormGroup;
  vacunas: vacuna []= [];
  columnas = ['nombre', 'cantidadDosis','borrar'];
  vac: any= {};
  nuevaVacuna:any= {};
  nombreVacuna: string;
  cantidadDosis:number;
  verTabla=false;
  mensajeB= 'Agregar Vacunación';
  edadInvalida: Boolean = false;
  mensajeEdad: string = "";

  constructor(private http:HttpClient,private sanitizer: DomSanitizer,private auth: AuthService, private  alerts: AlertsService,private photo: photoService,private route:Router,private matdialog: MatDialog, private dialogRef: MatDialogRef<FormularioPerroComponent>) { }
  @ViewChild(MatTable) tabla1: MatTable<vacuna>;

  ngOnInit(): void {
    this.SignupForm= new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.maxLength(30),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      estado: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('',[Validators.required]),
      tamaño: new FormControl('', [Validators.required,Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      sexo: new FormControl('', Validators.required),
      razaPadre: new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      razaMadre: new FormControl('',[Validators.required,Validators.maxLength(30),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      castrado: new FormControl('',Validators.required),
      conductaNiños: new FormControl('',Validators.required),
      conductaGatos: new FormControl('',Validators.required),
      conductaPerros: new FormControl('',Validators.required),
      descripcion: new FormControl('',[Validators.required,Validators.maxLength(150),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú.,:; ]*$')]),
      foto: new FormControl('',Validators.required),
    });

    this.SignupFormVac= new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.maxLength(30),Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      cantidadDosis: new FormControl('',Validators.required),
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

  borrarFila(cantD: number) {
    if (this.alerts.errorMessage("Realmente quiere borrarlo?")) {
      this.vacunas.splice(cantD,1);
      this.tabla1.renderRows();
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
    if (age < 1) {
      this.edadInvalida = true;
      this.mensajeEdad = "La mascota es cachorro y tiene " + month + " mes/es";
    }
    else if (age > 100){
      this.edadInvalida = true;
      this.mensajeEdad = "Fecha de nacimiento no válida";
    }
    else if(age >= 1){
      this.edadInvalida = true;
      this.mensajeEdad = "La mascota es adulto y tiene "+ age + " año/s";
    }
}


  agregar() {
    this.vacunas.push(this.vac);
    this.nombreVacuna=this.vac.nombre;
    this.cantidadDosis=this.vac.cantidadDosis;
    this.tabla1.renderRows();
    this.vac={};
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

  
  mostrarVacunas(){
    this.mensajeB= this.verTabla? 'Agregar Vacunación': 'Cancelar Vacunación';
    this.verTabla=!this.verTabla;
   
 }

  
    registrarAnimal(){
      
      if(this.SignupForm.valid && this.edadInvalida){        
        let mascota: Mascota = new Mascota();
        mascota.tipoMascota=0; 
        mascota.nombreMascota= this.SignupForm.controls.nombre.value;
        mascota.estado=this.SignupForm.controls.estado.value;
        mascota.tamañoFinal=this.SignupForm.controls.tamaño.value;
        mascota.sexo=this.SignupForm.controls.sexo.value;
        mascota.fechaNacimiento=(this.SignupForm.controls.fechaNacimiento.value).toLocaleString();;
        mascota.razaPadre=this.SignupForm.controls.razaPadre.value;
        mascota.razaMadre=this.SignupForm.controls.razaMadre.value;
        mascota.castrado=this.SignupForm.controls.castrado.value;
        mascota.conductaNiños=this.SignupForm.controls.conductaNiños.value;
        mascota.conductaGatos=this.SignupForm.controls.conductaGatos.value;
        mascota.conductaPerros=this.SignupForm.controls.conductaPerros.value;
        mascota.descripcion=this.SignupForm.controls.descripcion.value;
        
        console.log(mascota); 
       this.photo.registroAnimal(mascota, this.auth.getToken()).subscribe(
         (resp: Data) => {
          try {
            this.loading = true;
            const formularioDeDatos = new FormData();
            this.archivos.forEach(archivo => {
            formularioDeDatos.append('imagen', archivo)
            formularioDeDatos.append('id_Animal',resp.id_Animal)
            })
           
            const vacuna=[ 
              this.nombreVacuna, this.cantidadDosis, resp.id_Animal
            ]

            let nuevaVac: NuevaVacuna=new NuevaVacuna();
            //nuevaVac.nombreVacuna=this.nombreVac;
            //nuevaVac.cantidadDosis=this.cantDosis;
            nuevaVac.id_Animal=resp.id_Animal;
            
           //const formVacuna= new FormData();
           //formVacuna.append('nombreVacuna',nuevaVac.nombreVacuna);
           //formVacuna.append('cantidadDosis',nuevaVac.cantidadDosis);
           //formVacuna.append('id_Animal',resp.id_Animal);
            this.listaVacunas.push(vacuna);
            //this.listaVacunas.push( resp.id_Animal);
            
            console.log(vacuna);

            this.http.post<vacuna>('https://adoptmebackend.herokuapp.com/vacunas/vacuna',vacuna)
              .subscribe(() => {
                this.loading = false;
                console.log("se registro vacuna!");
                
      
              }, () => {
                this.loading = false;
                alert('Error de vacuna');
              })
            
            this.http.post(`https://adoptmebackend.herokuapp.com/fotos/imagen/add`, formularioDeDatos)
              .subscribe(() => {
                this.loading = false;
                
      
              }, () => {
                this.loading = false;
                alert('Error de foto');
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



