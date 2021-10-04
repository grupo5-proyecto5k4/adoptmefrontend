import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertsService } from 'src/utils/alerts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { R3TargetBinder } from '@angular/compiler';
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
  selector: 'app-formulario-perro',
  templateUrl: './formulario-perro.component.html',
  styleUrls: ['./formulario-perro.component.scss']
})
export class FormularioPerroComponent implements OnInit {

  SignupForm: FormGroup;
  Titulo = "Registro de Perro";


  public loading: boolean;
  SignupFormVac: FormGroup;
  verTabla = false;
  edadInvalida: Boolean = false;
  mensajeEdad: string = "";
  isLoading: Boolean = false;
  adoptarChecked: Boolean = false;
  provisorioChecked: Boolean = false;
  marcaPrincipal: Boolean = false;
  listaVacunas = []; //aca se guardaran todas las vacunas
  columnas = ['Nombre', 'Cantidad dosis', 'Opciones'];
  vac: any = {};
  nuevaVacuna: any = {};
  nombreVac: string;
  cantDosis: number;
  mensajeB = '💉 Registrar vacunaciones';

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

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private mascotaService: MascotaService, private auth: AuthService, private alerts: AlertsService, private photo: photoService, private route: Router, private matdialog: MatDialog, private dialogRef: MatDialogRef<FormularioPerroComponent>) { }
  @ViewChild(MatTable) tabla1: MatTable<Foto>;
  @ViewChild(MatTable) tabla2: MatTable<NuevaVacuna>;

  ngOnInit(): void {
    this.SignupForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      estado: new FormControl('', Validators.required),
      tamaño: new FormControl('', [Validators.required]),
      sexo: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', [Validators.required]),
      raza: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      castrado: new FormControl('', Validators.required),
      conductaNiños: new FormControl('', Validators.required),
      conductaGatos: new FormControl('', Validators.required),
      conductaPerros: new FormControl('', Validators.required),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú.,;: ]*$')]),
      //foto: new FormControl('',Validators.required),
    });

    this.SignupFormVac = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      cantidadDosis: new FormControl('', Validators.required),
    });


    this.dialogRef.disableClose = true;

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

  marcarPrincipal(principal: number) {
    if (principal == 0) {
      this.marcaPrincipal = !this.marcaPrincipal;
    }
  }

  validateInitialDate() {
    return (this.SignupForm.get('fechaNacimiento').touched && (this.SignupForm.controls.fechaNacimiento.value == ""));
  }

  mostrarVacunas() {
    this.mensajeB = this.verTabla ? '💉 Registrar vacunaciones' : 'Cancelar carga de vacunas';
    this.verTabla = !this.verTabla;
  }

  validateTamano() {
    return (((this.SignupForm.get('tamaño').touched ||
      this.SignupForm.get('tamaño').dirty) &&
      this.SignupForm.get('tamaño').errors));
  }

  validateSexo() {
    return (((this.SignupForm.get('sexo').touched ||
      this.SignupForm.get('sexo').dirty) &&
      this.SignupForm.get('sexo').errors));
  }

  validateFechaNacimiento() {
    return (((this.SignupForm.get('fechaNacimiento').touched ||
      this.SignupForm.get('fechaNacimiento').dirty) &&
      this.SignupForm.get('fechaNacimiento').errors));
  }

  validateRaza() {
    return (((this.SignupForm.get('raza').touched ||
      this.SignupForm.get('raza').dirty) &&
      this.SignupForm.get('raza').errors));
  }

  validateCastrado() {
    return (((this.SignupForm.get('castrado').touched ||
      this.SignupForm.get('castrado').dirty) &&
      this.SignupForm.get('castrado').errors));
  }

  validateNinos() {
    return (((this.SignupForm.get('conductaNiños').touched ||
      this.SignupForm.get('conductaNiños').dirty) &&
      this.SignupForm.get('conductaNiños').errors));
  }

  validateGatos() {
    return (((this.SignupForm.get('conductaGatos').touched ||
      this.SignupForm.get('conductaGatos').dirty) &&
      this.SignupForm.get('conductaGatos').errors));
  }

  validatePerros() {
    return (((this.SignupForm.get('conductaPerros').touched ||
      this.SignupForm.get('conductaPerros').dirty) &&
      this.SignupForm.get('conductaPerros').errors));
  }

  validateNombreVac() {
    return (((this.SignupFormVac.get('nombre').touched ||
      this.SignupFormVac.get('nombre').dirty) &&
      this.SignupFormVac.get('nombre').errors));
  }  

  validateDosis() {
    return (((this.SignupFormVac.get('cantidadDosis').touched ||
      this.SignupFormVac.get('cantidadDosis').dirty) &&
      this.SignupFormVac.get('cantidadDosis').errors));
  }

  validateButton() {
    if (this.SignupForm.valid && this.urls !== undefined && this.urls !== null) {
      document.getElementById("confirmar").classList.remove("buttonDisabled");
    } else {
      document.getElementById("confirmar").classList.add("buttonDisabled");
    }
  }

  validateVacunas(){
    if (this.SignupFormVac.valid) {
      document.getElementById("btnVacuna").classList.remove("buttonDisabled");
    } else {
      document.getElementById("btnVacuna").classList.add("buttonDisabled");
    }
  }

  agregar() {

    const object1 = {
      nombre: this.SignupFormVac.controls.nombre.value,
      cantidadDosis: this.SignupFormVac.controls.cantidadDosis.value,
    };

    this.listaVacunas.push(
      object1
    );

    console.log("listado vacunas: " + this.listaVacunas)
  }


  borrarFila(cantD: number) {
    this.listaVacunas.splice(cantD, 1);
    this.tabla2.renderRows();
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
    else if (month >= 12) {
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

    if (this.selectedFiles) {
      for (let file of event.target.files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }

  }


  clearImage(url: number) {
    this.urls.splice(url, 1);
  }


  registrarAnimal() {

    this.isLoading = true;

    if (this.SignupForm.valid && this.urls !== undefined && this.urls !== null) {
      let mascota: Mascota = new Mascota();
      mascota.tipoMascota = 0;
      mascota.nombreMascota = this.SignupForm.controls.nombre.value;
      mascota.estado = this.SignupForm.controls.estado.value;
      mascota.fechaNacimiento = (this.SignupForm.controls.fechaNacimiento.value).toLocaleString();;
      mascota.tamañoFinal = this.SignupForm.controls.tamaño.value;
      mascota.sexo = this.SignupForm.controls.sexo.value;
      mascota.raza = this.SignupForm.controls.raza.value;
      mascota.castrado = this.SignupForm.controls.castrado.value;
      mascota.conductaNiños = this.SignupForm.controls.conductaNiños.value;
      mascota.conductaGatos = this.SignupForm.controls.conductaGatos.value;
      mascota.conductaPerros = this.SignupForm.controls.conductaPerros.value;
      mascota.descripcion = this.SignupForm.controls.descripcion.value;

      console.log(mascota);
      this.alerts.infoMessage(""+mascota+"", "mascota");


      this.photo.registroAnimal(mascota, this.auth.getToken()).subscribe(
        (resp: Data) => {

          for (let i = 0; i < this.selectedFiles.length; i++) {
            this.progressInfo[i] = { value: 0, fileName: this.selectedFiles[i].name };
            let foto: Foto = new Foto();
            foto.foto = this.selectedFiles.item(i);
            foto.esPrincipal = this.marcaPrincipal;

            this.photo.upload(this.selectedFiles[i], resp.id_Animal).subscribe(
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

          let vacunasAnimal = [];

          for (let i = 0; i < this.listaVacunas.length; i++) {
            let nuevaVac: NuevaVacuna = new NuevaVacuna();
            nuevaVac.nombreVacuna = this.listaVacunas[i].nombre;
            nuevaVac.cantidadDosis = this.listaVacunas[i].nombre;
            nuevaVac.id_Animal = resp.id_Animal;

            vacunasAnimal.push(nuevaVac);
            console.log(vacunasAnimal);
          }


          this.http.post<NuevaVacuna>('https://adoptmebackend.herokuapp.com/vacunas/vacuna', vacunasAnimal)
            .subscribe(() => {
              console.log("se registro vacuna!");


            }, () => {
              this.loading = false;
              alert('Error de vacuna');
            })
          this.alerts.confirmMessage("Su mascota ha sido registrada").then((result) => window.location.href = '/mascotas')

        },
        () => {
          this.alerts.errorMessage("No se ha podido registrar su mascota");

        }
      )


    }



  }

}




