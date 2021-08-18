import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/models/IUser';
import { UserService } from 'src/services/user.service';
import { AlertsService } from 'src/utils/alerts.service';



@Component({
    selector: 'app-habilitar-centros-rescatistas',
    templateUrl: './habilitar-centros-rescatistas.component.html',
    styleUrls: ['./habilitar-centros-rescatistas.component.scss'],
})


export class HabilitarCentroRescatistaComponent {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    Titulo = "Habilitar centros rescatistas";
    public pageSize: number = 10;
    public lowValue: number = 0;
    public highValue: number = 10;
    private pageIndex: number = 0;
    private activePageIndex: boolean = false;
    centrosPendientes: any;

    constructor(private dialog: MatDialog, private userService: UserService, private alertsService: AlertsService, private authService: AuthService) { }

    async ngOnInit() { 
      await this.obtenerCentros();
    }


      /*1 - Activo (Usuario)
        2 - Pendiente (Usuario)
        3 - Bloqueado (Usuario) */


    async obtenerCentros(){    
      this.userService.getCentrosRescatistasPendientes('Pendiente', this.authService.getToken()).then((r) => {
        this.centrosPendientes = r;
      });        
      if (this.centrosPendientes != null){
        this.alertsService.infoMessage(this.centrosPendientes,'Centros rescatistas');
      }
    } 

    proximamente(){
      this.alertsService.infoMessage('La visualización del centro rescatista aún no se encuentra disponible','Información')
    }
    
    cambiarEstado(userId: number, estado: number) {
      //let centro: User = { id: user.id, nombres: user.nombres, correoElectronico: user.correoElectronico , idEstado: estado, dni: user.dni, numeroContacto: user.numeroContacto, fechaNacimiento: user.fechaNacimiento, facebook: user.facebook, instagram: user.instagram, fechaCreacion: user.fechaCreacion, fechaModificacion: user.fechaCreacion, tipoUsuario: user.tipoUsuario, contrasenia: '', Direccion: user.Direccion  };
      let centro: User;
      centro.id = userId;
      centro.idEstado = estado;
      this.alertsService.infoMessage((""+(userId)+""+(estado)+""),'Centros rescatistas');
      //this.alertsService.infoMessage(this.authService.getToken(),'Centros rescatistas');
      this.userService.updateAccount(centro, this.authService.getToken()).subscribe({
        complete: () => {
          if (estado == 1){
          this.alertsService.confirmMessage("El centro rescatista ha sido habilitado")
            .then((result) => {
              this.obtenerCentros();
            });
          }
          else if (estado == 3){
            this.alertsService.confirmMessage("El centro rescatista ha sido rechazado")
            .then((result) => {
              this.obtenerCentros();
            });
          }
        },
        error: (err: any) => {
          this.alertsService.errorMessage("Se ha producido un error, vuelva a intentar más tarde")
        }
      });
    }

    getPaginatorData(event) {
        if (event.pageIndex === this.pageIndex + 1) {
            this.lowValue = this.lowValue + this.pageSize;
            this.highValue = this.highValue + this.pageSize;
        }
        else if (event.pageIndex === this.pageIndex - 1) {
            this.lowValue = this.lowValue - this.pageSize;
            this.highValue = this.highValue - this.pageSize;
        }
        this.pageIndex = event.pageIndex;
        this.activePageIndex = true;
    }

    setPage(event) {
        if (this.paginator !== null && this.paginator != undefined && event != null) {
          this.paginator.pageIndex = 1;
          this.getPaginatorData(this.paginator);
        }
        if (this.activePageIndex) {
          this.activePageIndex = false;
          this.pageIndex = 0;
          this.pageSize = 10;
          this.lowValue = 0;
          this.highValue = 10;
        }
      }
}
