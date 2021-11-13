import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertsService } from 'src/utils/alerts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { R3TargetBinder, visitAll } from '@angular/compiler';
import { photoService } from '../../services/photo.service';
import { Mascota } from '../../models/IMascota';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { NuevaVacuna } from '../../models/INuevaVacuna';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Foto } from '../../models/IFoto';
import { MascotaService } from 'src/services/mascota.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-registrar-visita',
  templateUrl: './registrar-visita.component.html',
  styleUrls: ['./registrar-visita.component.scss']
})
export class RegistrarVisitaComponent implements OnInit {

  SignupForm: FormGroup;
  Titulo = "Registrar Visita";

  public loading: boolean;
  SignupFormVac: FormGroup;
  verTabla = false;
  edadInvalida: Boolean = false;
  mensajeEdad: string = "";
  isLoading: Boolean = false;
  adoptarChecked: Boolean = false;
  provisorioChecked: Boolean = false;
  marcaPrincipal: string;
  listaVacunas = []; //aca se guardaran todas las vacunas
  columnas = ['Nombre', 'Fecha de aplicacion', 'Opciones'];
  vac: any = {};
  nuevaVacuna: any = {};
  mensajeB = '💉 Registrar vacunaciones';
  isfechaFuturaInvalida: Boolean = false;

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
  InputSeleccionadoYVacio = false;
  seguimiento: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, @Inject(MAT_DIALOG_DATA) public data: any, private mascotaService: MascotaService, private auth: AuthService, private alerts: AlertsService, private photo: photoService, private route: Router, private matdialog: MatDialog, private dialogRef: MatDialogRef<RegistrarVisitaComponent>) { }
  @ViewChild(MatTable) tabla1: MatTable<Foto>;
  @ViewChild(MatTable) tabla2: MatTable<NuevaVacuna>;

  ngOnInit(): void {
    this.seguimiento = this.data.seguimiento;
    console.log(this.seguimiento)
    console.log(this.seguimiento._id)
    this.SignupForm = new FormGroup({
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(350), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú.,;: ]*$')]),
      imagen: new FormControl(''),
    });



    this.dialogRef.disableClose = true;

  }

  principal(url: string) {
    return (this.marcaPrincipal == url)
  }


  estadoChange(estado: number) {
    if (estado == 0) {
      this.adoptarChecked = !this.adoptarChecked;
    }
    else if (estado == 1) {
      this.provisorioChecked = !this.provisorioChecked;
    }
    if (this.adoptarChecked && this.provisorioChecked) {
      this.SignupForm.controls.estado.setValue('Disponible Adopción y Provisorio');
    }
    else if (this.adoptarChecked && !this.provisorioChecked) {
      this.SignupForm.controls.estado.setValue('Disponible Adopción');
    }
    else if (!this.adoptarChecked && this.provisorioChecked) {
      this.SignupForm.controls.estado.setValue('Disponible Provisorio');
    }
    else {
      this.SignupForm.controls.estado.setValue(null);
    }
  }

  marcarPrincipal(url: string) {
    for (let i = 0; i < this.urls.length; i++) {
      if (url == this.urls[i]) {
        this.marcaPrincipal = this.urls[i];
        break
      }
    }
  }

  cambiarEstadoInput() {
    if (this.urls.length == 0) {
      this.InputSeleccionadoYVacio = true;
    }
  }
  validateInitialDate() {
    return (this.SignupForm.get('fechaNacimiento').touched && (this.SignupForm.controls.fechaNacimiento.value == ""));
  }

  validatePastDate() {
    let today = new Date();
    let fechaNacimientoFormato = new Date(this.SignupForm.controls.fechaNacimiento.value);
    let difference = (today.getTime() - fechaNacimientoFormato.getTime()) / (1000 * 60 * 60 * 24);
    if (difference < 0) {
      return true
    } else return false;
  }

  validateMaxEdad() {
    let today = new Date();
    let fechaNacimientoFormato = new Date(this.SignupForm.controls.fechaNacimiento.value);
    let difference = (today.getTime() - fechaNacimientoFormato.getTime()) / (1000 * 60 * 60 * 24);
    if (difference > 365 * 27) {
      return true
    } else return false;
  }

  mostrarVacunas() {
    this.mensajeB = this.verTabla ? '💉 Registrar vacunaciones' : 'Cancelar carga de vacunas';
    this.verTabla = !this.verTabla;
  }

 

  validateButton() {
    if (this.SignupForm.valid && this.urls !== undefined && this.urls !== null) {
      document.getElementById("confirmar").classList.remove("buttonDisabled");
    } else {
      document.getElementById("confirmar").classList.add("buttonDisabled");
    }
  }

  validateVacunas() {
    if (this.SignupFormVac.valid) {
      document.getElementById("btnVacuna").classList.remove("buttonDisabled");
    } else {
      document.getElementById("btnVacuna").classList.add("buttonDisabled");
    }
  }





  selectFiles(event) {
    this.progressInfo = [];
    //Validación para obtener el nombre del archivo si es uno solo
    //En caso de que sea >1 asigna a fileName length
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " imagenes a subir";
    this.selectedFiles = event.target.files;
    console.log("selected files:")
    console.log(this.selectedFiles);
    this.urls = [];

    if (this.selectedFiles) {
      this.InputSeleccionadoYVacio = false;
      let cant = 0;
      for (let file of event.target.files) {
        cant += 1;
        if (cant < 6) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.urls.push(e.target.result);
          }
          reader.readAsDataURL(file);
        }
        else {
          break;
        }
      }
    }
    else if (this.urls.length == 0) {
      this.InputSeleccionadoYVacio = true;
    }

  }


  clearImage(url: string) {
    let cantD = 0;
    for (let i = 0; i < this.urls.length; i++) {
      if (url == this.urls[i]) {
        cantD = i;
        break
      }
    }
    this.urls.splice(cantD, 1);
    if (this.urls.length == 0) {
      this.InputSeleccionadoYVacio = true;
    }
  }


  async registrarVisita() {
    //updateSeguimiento
    if (this.SignupForm.valid) {
      this.isLoading = true;
      let visita: any = {};
      visita.seguimientoId = this.seguimiento._id;
      visita.descripcionVisita = this.SignupForm.controls.descripcion.value;


      this.photo.registroVisita(visita, this.auth.getToken()).subscribe(
        (resp: Data) => {

          for (let i = 0; i < this.selectedFiles.length; i++) {
            this.progressInfo[i] = { value: 0, fileName: this.selectedFiles[i].name };
            let foto: Foto = new Foto();
            foto.foto = this.selectedFiles.item(i);
            foto.esPrincipal = false;
            if (i == 0) {
              foto.esPrincipal = true;
            }

            this.photo.uploadFotoVisita(this.selectedFiles[i], resp.id_Animal, this.auth.getToken()).subscribe(
              event => {
                if (event.type === HttpEventType.UploadProgress) {
                  this.progressInfo[i].value = Math.round(100 * event.loaded / event.total);
                }
              },
              err => {
                this.progressInfo[i].value = 0;
                this.message = 'No se puede subir el archivo ';
              });
          }


          this.alerts.confirmMessage("La visita ha sido registrada").then((result) => window.location.href = '/mascotas')

        },
        () => {
          this.isLoading = false;
          this.alerts.errorMessage("No se ha podido registrar la visita");

        }

      )
      
    }



  }

}




