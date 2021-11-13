import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { RegistrarVisitaComponent } from 'src/app/registrar-visita/registrar-visita.component';
import { MascotaService } from 'src/services/mascota.service';
import { NotificacionService } from 'src/services/notificacion.service';
import { VisualizacionSolicitudesService } from 'src/services/visualizacion-solicitudes';
import { AlertsService } from 'src/utils/alerts.service';

@Component({
  selector: 'app-consulta-seguimientos',
  templateUrl: './consulta-seguimientos.component.html',
  styleUrls: ['./consulta-seguimientos.component.scss']
})
export class ConsultaSeguimientosComponent implements OnInit {
  seguimientos: any;
  accion: any;
  mascota: any;
  proceso = "";
  solicitanteId: any;
  fotos: any = [];
  fotoVisualizar: any = [];
  slideIndex = 0;
  SignupForm: FormGroup;
  motivoVisible = false;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,private alertService: AlertsService, private visualizarService: VisualizacionSolicitudesService, private mascotaService: MascotaService, private notificacionService: NotificacionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.accion = this.data.accion;
    this.mascota = this.data.mascota;

    this.mascotaService.getSeguimientosAnimal(this.mascota._id, this.authService.getToken()).subscribe(seguimiento => {
      this.seguimientos = seguimiento;
    });

    if (this.mascota.estado == "En provisorio") {
      this.proceso = "Finalizar provisorio"
    }

    this.SignupForm = new FormGroup({
      observacion: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    });


    if (this.seguimientos.length > 0) {
      if (this.seguimientos.Visita.length > 0) {
        for (let x = 0; x < (this.seguimientos.Visita.length); x++) {
          // Edad 
          if (this.seguimientos.Visita[x].visitaFotos.length > 0) {
            //Recorro imágenes
            for (let i = 0; i < this.seguimientos.Visita[x].visitaFotos.length; i++) {
              // Foto Principal
              //   if (this.seguimientos.Visita[x].visitaFotos[i].esPrincipal) {
              this.seguimientos.Visita[x].imagenCard = this.seguimientos.Visita[x].Foto[i].foto;



              //   }
            }
          }
        }
      }
    }


  }

  async cancelarProceso() {
    console.log("valido?", this.SignupForm.valid)
    if (this.SignupForm.valid){
      let body: any = {};
      body.observacion = this.SignupForm.controls.observacion.value;
      this.mascotaService.finalizarProvisorio(this.mascota._id, this.authService.getToken(), body).subscribe(respuesta => {
        this.solicitanteId = respuesta._id;
        this.enviarNotificacionDeBaja();
      this.alertService.confirmMessage("El provisorio de "+this.mascota.nombreMascota+" ha sido finalizado")
      });
      
    }
    else{
      this.alertService.questionMessage('¿Desea finalizar el proceso de hogar provisorio de '+this.mascota.nombreMascota+'?','Finalizar provisorio','Finalizar','Cancelar')
      .then(result =>{
        this.motivoVisible = true;
      })
      ;
    }
  }

  consultarEstadoMascota() {
    return (this.mascota.estado == 'En provisorio')
  }

  registrarVisita(seguim: any) {
    console.log(seguim)
    this.dialog.open(RegistrarVisitaComponent, {
      data: {
        seguimiento: seguim,
      }
    });

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



  async enviarNotificacionDeBaja() {
    console.log(this.mascota.nombreMascota, this.mascota._id, this.solicitanteId)
    if (this.mascota.estado == "Adoptado") {
      this.notificacionService.notificarBajaDeAdopcionAParticular(this.mascota.nombreMascota, this.mascota._id, this.solicitanteId, this.authService.getToken())
    }
    else {
      this.notificacionService.notificarBajaDeProvisorioAParticular(this.mascota.nombreMascota, this.mascota._id, this.solicitanteId, this.authService.getToken())
    }
  }

}
