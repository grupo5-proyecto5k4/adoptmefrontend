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
  columnas = ['Nombre', 'Fecha de aplicación'];
  columnasEdit = ['Nombre', 'Fecha de aplicación', 'Opciones'];
  listaVacunas: any = []; //aca se guardaran todas las vacunas
  listaVacunasPut: any = []; //aca se guardaran todas las vacunas
  slideIndex = 0;
  fotos: any = [];
  fotoVisualizar: any = [];
  accion: any;
  profile: any;
  enEdicion: Boolean = false;
  selected: any;
  boton = "Editar";
  vac: any = {};
  fechaNacimientoVisualizada: any = "";

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
      this.fechaNacimientoVisualizada = revdate;
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
    else {
      this.guardarCambios();
    }
    this.enEdicion = !this.enEdicion;
  }

  inicializarFormulario() {
    this.ProfileForm = new FormGroup({
      nombres: new FormControl({ value: this.mascota.nombreMascota, disabled: true }),
      tamañoFinal: new FormControl({ value: this.mascota.tamañoFinal, disabled: true }),
      sexo: new FormControl({ value: this.mascota.sexo, disabled: true }),
      fechaNacimiento: new FormControl({ value: this.fechaNacimientoVisualizada, disabled: true }),
      raza: new FormControl({ value: this.mascota.raza, disabled: true }),
      castrado: new FormControl({ value: this.mascota.castrado, disabled: true }),
      castradoPut: new FormControl({ value: this.mascota.castrado, disabled: false }),
      conductaGatos: new FormControl({ value: this.mascota.conductaGatos, disabled: true }),
      conductaPerros: new FormControl({ value: this.mascota.conductaPerros, disabled: true }),
      conductaNiños: new FormControl({ value: this.mascota.conductaNiños, disabled: true }),
      descripcion: new FormControl({ value: this.mascota.descripcion, disabled: true }),
      conductaGatosPut: new FormControl({ value: this.mascota.conductaGatos, disabled: false }),
      conductaPerrosPut: new FormControl({ value: this.mascota.conductaPerros, disabled: false }),
      conductaNiñosPut: new FormControl({ value: this.mascota.conductaNiños, disabled: false }),
      descripcionPut: new FormControl({ value: this.mascota.descripcion, disabled: false }, [Validators.required, Validators.maxLength(300), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú.,;: ]*$')]),
    });
    this.SignupFormVac = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      fechaAplicacion: new FormControl('', Validators.required),
    });
  }


  guardarCambios() {

    /*
    let mascotaActualiza: Mascota = new Mascota();
    mascotaActualiza = this.mascota;
    */

    let mascotaActualiza: any = {};
    mascotaActualiza.id_Animal = this.mascota._id;

    mascotaActualiza.castrado = this.ProfileForm.controls.castradoPut.value;
    mascotaActualiza.conductaGatos = this.ProfileForm.controls.conductaGatosPut.value;
    mascotaActualiza.conductaNiños = this.ProfileForm.controls.conductaNiñosPut.value;
    mascotaActualiza.conductaPerros = this.ProfileForm.controls.conductaPerrosPut.value;
    mascotaActualiza.descripcion = this.ProfileForm.controls.descripcionPut.value;

    mascotaActualiza.castrado = this.ProfileForm.controls.castradoPut.value;
    this.mascotaService.actualizarMascota(mascotaActualiza, this.authservice.getToken()).subscribe(
      (resp: Data) => {

        this.mascota = resp;
        console.log("mascota editada", this.mascota);

        let vacunasAnimal = [];

        for (let i = 0; i < this.listaVacunasPut.length; i++) {
          let nuevaVac: NuevaVacuna = new NuevaVacuna();
          nuevaVac.nombreVacuna = this.listaVacunasPut[i].nombre;
          nuevaVac.fechaAplicacion = this.listaVacunasPut[i].fechaAplicacion;
          nuevaVac.id_Animal = this.mascota._id;

          vacunasAnimal.push(nuevaVac);
          console.log(vacunasAnimal);
        }

        this.inicializarFormulario();
        this.http.post<NuevaVacuna>('https://adoptmebackend.herokuapp.com/vacunas/vacuna', vacunasAnimal)
          .subscribe()
        this.alertsService.confirmMessage("Se han actualizado los datos de la mascota correctamente").then((result) => window.location.href = '/mascotas');
        this.boton = "Editar";
      },
      () => {
        this.alertsService.errorMessage("No se han podido actualizar los datos de la mascota");
      }

    );



  }

  agregar() {
    if (this.SignupFormVac.valid) {
      const object1 = {
        nombre: this.SignupFormVac.controls.nombre.value,
        fechaAplicacion: this.SignupFormVac.controls.fechaAplicacion.value,
      };

      this.listaVacunasPut.push(
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
    for (let i = 0; i < this.listaVacunasPut.length; i++) {
      if (vacuna == this.listaVacunasPut[i]) {
        cantD = i;
        break
      }
    }
    this.listaVacunasPut.splice(cantD, 1);
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

  esResponsableOAdmin(){
    // Si es nulo no hay usuario logueado, no verá seguimientos
    if (this.localStorageService.getUser() === null) {
      return false;
    } else {
      return ((this.localStorageService.getUser()._id === this.data.mascota.responsableId)||(this.localStorageService.getProfile() == "0"));
    }
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