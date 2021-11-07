import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SignupService } from 'src/services/signup.service';
import { User } from 'src/models/IUser';
import { Data, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertsService } from 'src/utils/alerts.service';
import { TermsAndConditionsComponent } from 'src/app/terms-and-conditions/terms-and-conditions.component';
import { UserService } from 'src/services/user.service';
import { FormularioAdopcion } from 'src/models/IFormularioAdopcion';
import { Address } from 'src/models/IAddress';
import { AuthService } from 'src/app/auth.service';
import { NotificacionService } from 'src/services/notificacion.service';
import { Mascota } from 'src/models/IMascota';
import { UserFormComponent } from '../user-form/user-form.component';
import { MascotaService } from 'src/services/mascota.service';
import { SolicitudProvisorioComponent } from 'src/app/solicitud-provisorio/solicitud-provisorio.component';
import { LocalStorageService } from 'src/services/local-storage.service';
import { ConsultaSeguimientosComponent } from '../consulta-seguimientos/consulta-seguimientos.component';
import { NuevaVacuna } from 'src/models/INuevaVacuna';
import { HttpClient } from '@angular/common/http';
import { photoService } from 'src/services/photo.service';


@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.scss']
})

export class VerMascotaComponent implements OnInit {
  ProfileForm: FormGroup;
  SignupFormVac: FormGroup;
  mascota: any;
  Titulo = "";
  columnas = ['Nombre', 'Fecha de aplicacion'];
  columnasEdit = ['Nombre', 'Fecha de aplicacion', 'Opciones'];
  listaVacunas: any = []; //aca se guardaran todas las vacunas
  slideIndex = 0;
  fotos: any = [];
  fotoVisualizar: any = [];
  accion: any;
  profile: any;
  enEdicion: Boolean = false;
  selected: any;
  boton = "Editar";
  vac: any = {};

  constructor(private authservice: AuthService, private http: HttpClient, private photo: photoService, private mascotaService: MascotaService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private alertsService: AlertsService, private router: Router, private localStorageService: LocalStorageService) {

  }

  ngOnInit() {

    this.profile = this.localStorageService.getProfile();
    //this.usuarioId = this.localStorageService.

    //obtengo el usuario
    this.mascota = this.data.mascota;
    this.accion = this.data.accion;
    console.log(this.mascota)

    this.Titulo = this.mascota.nombreMascota;
    // Formato fecha  
    if (this.mascota.fechaNacimiento !== null && this.mascota.fechaNacimiento !== undefined) {
      var date = this.mascota.fechaNacimiento.substring(0, 10);
      var [yyyy, mm, dd] = date.split("-");
      var revdate = `${dd}/${mm}/${yyyy}`;
      this.mascota.fechaNacimiento = revdate;
    }

    if (this.mascota.Foto.length != 0) {
      //Recorro imágenes
      for (let i = 0; i < this.mascota.Foto.length; i++) {
        // Foto Principal

        const object1 = {
          path: this.mascota.Foto[i].foto,
        };
        if (this.mascota.Foto[i].esPrincipal) {
          this.fotos.unshift(object1);
          this.fotoVisualizar = [];
          this.fotoVisualizar.push(object1);
        }
        else {
          this.fotos.push(object1);
        }
      }
    }


    this.inicializarFormulario();


    this.mascotaService.getVacunas(this.mascota._id).then((r) => {
      if (r.length > 0) {
        this.listaVacunas = r;
      }
    });
  }

  editar() {
    if (this.boton == "Editar") {
      this.inicializarFormulario();
      this.boton = "Guardar";
    }
    else{
      this.guardarCambios();
    }
    this.enEdicion = !this.enEdicion;
  }

  inicializarFormulario() {
    if (this.enEdicion == false) {
      this.ProfileForm = new FormGroup({
        nombres: new FormControl({ value: this.mascota.nombreMascota, disabled: true }),
        tamañoFinal: new FormControl({ value: this.mascota.tamañoFinal, disabled: true }),
        sexo: new FormControl({ value: this.mascota.sexo, disabled: true }),
        fechaNacimiento: new FormControl({ value: this.mascota.fechaNacimiento, disabled: true }),
        raza: new FormControl({ value: this.mascota.raza, disabled: true }),
        castrado: new FormControl({ value: this.mascota.castrado, disabled: true }),
        conductaGatos: new FormControl({ value: this.mascota.conductaGatos, disabled: true }),
        conductaPerros: new FormControl({ value: this.mascota.conductaPerros, disabled: true }),
        conductaNiños: new FormControl({ value: this.mascota.conductaNiños, disabled: true }),
        descripcion: new FormControl({ value: this.mascota.descripcion, disabled: true }),
      });
    }
    else if (this.enEdicion && this.mascota.responsableId == this.authservice.getCurrentUser()._id) {
      this.selected = this.mascota.castrado;
      this.ProfileForm = new FormGroup({
        nombres: new FormControl({ value: this.mascota.nombreMascota, disabled: true }),
        tamañoFinal: new FormControl({ value: this.mascota.tamañoFinal, disabled: true }),
        sexo: new FormControl({ value: this.mascota.sexo, disabled: true }),
        fechaNacimiento: new FormControl({ value: this.mascota.fechaNacimiento, disabled: true }),
        raza: new FormControl({ value: this.mascota.raza, disabled: true }),
        castrado: new FormControl({ value: this.mascota.castrado }),
        conductaGatos: new FormControl({ value: this.mascota.conductaGatos, disabled: true }),
        conductaPerros: new FormControl({ value: this.mascota.conductaPerros, disabled: true }),
        conductaNiños: new FormControl({ value: this.mascota.conductaNiños, disabled: true }),
        descripcion: new FormControl({ value: this.mascota.descripcion, disabled: true }),
      });
    }
    this.SignupFormVac = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      fechaAplicacion: new FormControl('', Validators.required),
    });
  }


  guardarCambios(){
    let mascotaActualiza: Mascota = new Mascota();
    mascotaActualiza = this.mascota;
    mascotaActualiza.castrado = this.SignupFormVac.controls.castrado.value;
    this.mascotaService.actualizarMascota(mascotaActualiza);



      this.photo.registroAnimal(mascotaActualiza, this.authservice.getToken()).subscribe(
        (resp: Data) => {
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

            })
          this.alertsService.confirmMessage("Se han actualizado los datos de la mascota correctamente").then((result) => window.location.href = '/mascotas')

        },
        () => {

          this.alertsService.errorMessage("No se han podido actualizar los datos de la mascota");

        }

      )


    


    this.boton = "Editar";
  }

  agregar() {
    if (this.SignupFormVac.valid) {
      const object1 = {
        nombre: this.SignupFormVac.controls.nombre.value,
        fechaAplicacion: this.SignupFormVac.controls.fechaAplicacion.value,
      };

      this.listaVacunas.push(
        object1
      );
    }
  }

  validateVacunas() {
    if (this.SignupFormVac.valid) {
      document.getElementById("btnVacuna").classList.remove("buttonDisabled");
    } else {
      document.getElementById("btnVacuna").classList.add("buttonDisabled");
    }
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


  // Next/previous controls
  plusSlides(action: number) {

    this.slideIndex + action
    let object1 = {};
    if ((this.slideIndex + action) >= 0 && (this.slideIndex + action) < this.fotos.length) {
      object1 = {
        path: this.fotos[this.slideIndex + action].path,
      };
      this.slideIndex += action;
    }
    else if (action == 1) {
      object1 = {
        path: this.fotos[0].path,
      };
      this.slideIndex = 0;
    }
    else {
      object1 = {
        path: this.fotos[this.fotos.length - 1].path,
      };
      this.slideIndex = this.fotos.length - 1;
    }

    this.fotoVisualizar = [];
    this.fotoVisualizar.push(object1);
  }


  openUserForm() {
    this.dialog.open(UserFormComponent, {
      data: {
        mascota: this.data.mascota,
      }
    })
  }

  openProvisorioForm() {
    this.dialog.open(SolicitudProvisorioComponent, {
      data: {
        mascota: this.data.mascota,
      }
    })
  }

  openSeguimientos() {
    this.dialog.open(ConsultaSeguimientosComponent, {
      data: {
        mascota: this.data.mascota,
        accion: this.accion,
      }
    })
  }

  esResponsable() {
    return (this.localStorageService.getUser()._id === this.data.mascota.responsableId);
  }

  esParticular() {
    if (this.profile == "1") {
      if (this.localStorageService.getUser()._id === this.data.mascota.responsableId) {
        return false;
      } else { return true; }
    } else if (this.profile == "2") {
      return false;
    } else if (this.profile == "3") {
      return false;
    } else if (this.profile == null) {
      return false;
    }
  }

  indicarLogueo() {
    if (this.profile == null) {
      return true;
    } else { return false; }
  }

  goToSesion() {
    this.dialog.closeAll();
    this.router.navigate(['/inicio-sesion']);
  }

}