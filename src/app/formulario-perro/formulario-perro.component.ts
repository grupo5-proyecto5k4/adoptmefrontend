import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
  Titulo = "";

  
  private animal: number;
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
  isfechaFuturaInvalida : Boolean = false;
  PastDate = false;
  MaxEdad = false;

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

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, @Inject(MAT_DIALOG_DATA) public data: any, private mascotaService: MascotaService, private auth: AuthService, private alerts: AlertsService, private photo: photoService, private route: Router, private matdialog: MatDialog, private dialogRef: MatDialogRef<FormularioPerroComponent>) { }
  @ViewChild(MatTable) tabla1: MatTable<Foto>;
  @ViewChild(MatTable) tabla2: MatTable<NuevaVacuna>;

  ngOnInit(): void {

    this.animal = this.data.tipoMascota;
    if (this.animal == 0) {
      this.Titulo = "Registrar Perro"
    }
    else {
      this.Titulo = "Registrar Gato"
    }

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
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(300), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú.,;: ]*$')]),
      foto: new FormControl('', Validators.required),
    });

    this.SignupFormVac = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      fechaAplicacion: new FormControl('', Validators.required),
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

  validatePastDate(){
    let today = new Date();
    let fechaNacimientoFormato = new Date(this.SignupForm.controls.fechaNacimiento.value);
    let difference = (today.getTime() - fechaNacimientoFormato.getTime()) / (1000 * 60 * 60 * 24);
    if (difference < 0){
      this.PastDate = true;
      this.edadInvalida = false;
    } else  this.PastDate = false;
  }
  
  validateMaxEdad(){
    let today = new Date();
    let fechaNacimientoFormato = new Date(this.SignupForm.controls.fechaNacimiento.value);
    let difference = (today.getTime() - fechaNacimientoFormato.getTime()) / (1000 * 60 * 60 * 24);
    if (difference > 365*27){
      this.MaxEdad = true;
      this.edadInvalida = false;
    } else this.MaxEdad = false;
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

  validateFechaAplicacion() {
    return (((this.SignupFormVac.get('fechaAplicacion').touched ||
      this.SignupFormVac.get('fechaAplicacion').dirty) &&
      this.SignupFormVac.get('fechaAplicacion').errors));
  }

  validateButton() {
    if (this.animal === 1){
      this.SignupForm.controls['tamaño'].setValue("No aplica");
    }  
    if (this.SignupForm.valid && this.urls !== undefined && this.urls !== null) {
      document.getElementById("confirmar").classList.remove("buttonDisabled");
    } else {
      document.getElementById("confirmar").classList.add("buttonDisabled");
    }
  }

  validateVacunas() {
    if (this.SignupFormVac.valid && this.SignupFormVac.controls.fechaAplicacion.value != ' ' && this.SignupFormVac.controls.nombre.value != ' ') {
      document.getElementById("btnVacuna").classList.remove("buttonDisabled");
    } else {
      document.getElementById("btnVacuna").classList.add("buttonDisabled");
    }
  }

  agregar() {
    if (this.SignupFormVac.valid && this.SignupFormVac.controls.fechaAplicacion.value != ' ' && this.SignupFormVac.controls.nombre.value != ' ') {
      const object1 = {
        nombre: this.SignupFormVac.controls.nombre.value,
        fechaAplicacion: this.SignupFormVac.controls.fechaAplicacion.value,
      };

      this.listaVacunas.push(
        object1
      );
    }
    // LIMPIAR CAMPO VACUNA
    this.SignupFormVac.controls['fechaAplicacion'].setValue(" ");
    this.SignupFormVac.controls['nombre'].setValue(" ");
  }


  borrarFila(vacuna: NuevaVacuna) {
    let cantD = 0;
    for (let i = 0; i < this.listaVacunas.length; i++) {
      if (vacuna == this.listaVacunas[i]) {
        cantD = i;
        break
      }
    }
    this.listaVacunas.splice(cantD, 1);
  }

  CalculateAge() {
    //validamos la funcion past date
    let today = new Date();
    let fechaNacimientoFormato = new Date(this.SignupForm.controls.fechaNacimiento.value);
    let difference = (today.getTime() - fechaNacimientoFormato.getTime()) / (1000 * 60 * 60 * 24);

   //validamos la funcion max edad

   //calculamos si es cachorro o adulto
    if (difference < 0 && this.validateFechaNacimiento()){
      this.mensajeEdad = "";
      this.PastDate = true;
      this.MaxEdad = false;
      this.edadInvalida = false;
    } else if (difference >= 0 && difference < 365) {
      this.mensajeEdad = "La mascota es cachorro"
      this.MaxEdad = false;
      this.PastDate = false;
      this.edadInvalida = true;
    } else if (difference > 365 && difference <= 365*30) {
      this.edadInvalida = true;
      this.mensajeEdad = "La mascota es adulta";
      this.MaxEdad = false;
      this.PastDate = false;
    } else if (difference > 365*30){
      this.mensajeEdad = "";
      this.edadInvalida = false;
      this.MaxEdad = true;
      this.PastDate = false;
    }
    else{
      this.mensajeEdad = "";
      this.edadInvalida = false;
      this.MaxEdad = false;
      this.PastDate = false;
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
    else if (this.urls.length == 0){
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


  registrarAnimal() {
    if (this.animal === 1){
      this.SignupForm.controls['tamaño'].setValue("No aplica");
    }  
    if (this.SignupForm.valid && this.urls !== undefined && this.urls !== null) {
      this.isLoading = true;
      let mascota: Mascota = new Mascota();
      mascota.tipoMascota = this.data.tipoMascota;
      mascota.nombreMascota = this.SignupForm.controls.nombre.value;
      mascota.estado = this.SignupForm.controls.estado.value;
      mascota.fechaNacimiento = (this.SignupForm.controls.fechaNacimiento.value).toLocaleString();
      mascota.tamañoFinal = this.SignupForm.controls.tamaño.value;
      mascota.sexo = this.SignupForm.controls.sexo.value;
      mascota.raza = this.SignupForm.controls.raza.value;
      mascota.castrado = this.SignupForm.controls.castrado.value;
      mascota.conductaNiños = this.SignupForm.controls.conductaNiños.value;
      mascota.conductaGatos = this.SignupForm.controls.conductaGatos.value;
      mascota.conductaPerros = this.SignupForm.controls.conductaPerros.value;
      mascota.descripcion = this.SignupForm.controls.descripcion.value;

      console.log(mascota);



      this.photo.registroAnimal(mascota, this.auth.getToken()).subscribe(
        (resp: Data) => {

          for (let i = 0; i < this.selectedFiles.length; i++) {
            this.progressInfo[i] = { value: 0, fileName: this.selectedFiles[i].name };
            let foto: Foto = new Foto();
            foto.foto = this.selectedFiles.item(i);
            foto.esPrincipal = false;
            if (i == 0) {
              foto.esPrincipal = true;
            }
            console.log("foto")
            console.log(this.selectedFiles.item(i))

            this.photo.upload(this.selectedFiles[i], resp.id_Animal).subscribe(
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


          let vacunasAnimal = [];

          for (let i = 0; i < this.listaVacunas.length; i++) {
            let nuevaVac: NuevaVacuna = new NuevaVacuna();
            nuevaVac.nombreVacuna = this.listaVacunas[i].nombre;
            nuevaVac.fechaAplicacion = this.listaVacunas[i].fechaAplicacion;
            nuevaVac.id_Animal = resp.id_Animal;

            vacunasAnimal.push(nuevaVac);
            console.log(vacunasAnimal);
          }


          this.http.post<NuevaVacuna>('https://adoptmebackend.herokuapp.com/vacunas/vacuna', vacunasAnimal)
            .subscribe(() => {

            }, () => {
              this.loading = false;
            })
          this.alerts.confirmMessage("Su mascota ha sido registrada").then((result) => window.location.href = '/mascotas')

        },
        () => {
          this.isLoading = false;
          this.alerts.errorMessage("No se ha podido registrar la mascota");

        }

      )


    }



  }

}




