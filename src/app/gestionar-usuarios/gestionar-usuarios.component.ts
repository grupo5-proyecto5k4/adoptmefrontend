import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/models/IUser';
import { UserService } from 'src/services/user.service';
import { AlertsService } from 'src/utils/alerts.service';
import { UserProfileModalComponent } from '../components/user-profile-modal/user-profile-modal.component';



@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.scss']
})
export class GestionarUsuariosComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  Titulo = "Gestionar Usuarios";
  public pageSize: number = 10;
  public lowValue: number = 0;
  public highValue: number = 10;
  private pageIndex: number = 0;
  private activePageIndex: boolean = false;
  UsuariosActivos:any=[];
  UsuariosBloq:any=[];
  profile: any;
  FilterForm: FormGroup;
  filtroAplicado = false;

  constructor(private dialog: MatDialog, private userService: UserService, private alertsService: AlertsService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.profile = this.authService.getProfile();
    if(this.profile == '0'){
      this.iniciarForm();
      await this.obtenerUsuarios();

    }
    else{
      window.scrollTo(0, 0);
      this.router.navigate(['/']);
    }
  }


    /*1 - Activo (Usuario)
      2 - Pendiente (Usuario)
      3 - Bloqueado (Usuario) */

  async obtenerUsuarios(){    
  
    this.userService.getUsuarios('Activo',this.authService.getToken()).then((r) => {
      this.UsuariosActivos=r;
    });    

    this.userService.getUsuarios('Bloqueado',this.authService.getToken()).then((r) => {
      this.UsuariosBloq=r;
    }); 
    
   
  } 

  proximamente(){
    this.alertsService.infoMessage('La visualización de los datos aún no se encuentra disponible','Información')
  }

  obtenerNombre(user:User){
    if (user.apellidos !== undefined && user.apellidos!==null){
      return (user.nombres)+ ' ' +(user.apellidos);
    }
    else {
      return (user.nombres)
    }
  }
  
  cambiarEstado(user: any, estado:number ) {
    if(user.tipoUsuario==1){
      let particular: User = { _id: user._id, nombres: user.nombres,apellidos: user.apellidos, correoElectronico: user.correoElectronico , idEstado: estado, dni: user.dni, numeroContacto: user.numeroContacto, fechaNacimiento: user.fechaNacimiento, facebook: user.facebook, instagram: user.instagram, fechaCreacion: user.fechaCreacion, fechaModificacion: user.fechaCreacion, tipoUsuario: user.tipoUsuario, contrasenia: '' };      
      this.userService.updateAccount(particular, this.authService.getToken()).subscribe({
      complete: () => {
        if (estado == 1){
        this.alertsService.confirmMessage("El usuario ha sido activado")
          .then((result) => {
            this.obtenerUsuarios;
          });
        }
        else if (estado == 3){
          this.alertsService.confirmMessage("El usuario ha sido bloqueado")
          .then((result) => {
            this.obtenerUsuarios();
          });
        }
      },
      error: (err: any) => {
        this.alertsService.errorMessage("Se ha producido un error, vuelva a intentar más tarde")
      }
    });

    }
    else if(user.tipoUsuario==2){
      
      let centro: User = { _id: user._id, nombres: user.nombres, correoElectronico: user.correoElectronico , idEstado: estado, dni: user.dni, numeroContacto: user.numeroContacto, fechaNacimiento: user.fechaNacimiento, facebook: user.facebook, instagram: user.instagram, fechaCreacion: user.fechaCreacion, fechaModificacion: user.fechaCreacion, tipoUsuario: user.tipoUsuario, contrasenia: '', Direccion: user.Direccion  };      
      this.userService.updateAccount(centro, this.authService.getToken()).subscribe({
      complete: () => {
        if (estado == 1){
        this.alertsService.confirmMessage("El usuario ha sido activado")
          .then((result) => {
            this.obtenerUsuarios();
          });
        }
        else if (estado == 3){
          this.alertsService.confirmMessage("El usuario ha sido bloqueado")
          .then((result) => {
            this.obtenerUsuarios();
          });
        }
      },
      error: (err: any) => {
        this.alertsService.errorMessage("Se ha producido un error, vuelva a intentar más tarde")
      }
    });
    }

    
  }

  obtenerTipoUsuario(tipo:number){
   if(tipo==1){
     return "Particular"
   }else if(tipo==2){
     return "Centro Rescatista"
   }
   else{
     return "Administrador"
   }
  }

  openUserForm(usuario: User){
    this.dialog.open(UserProfileModalComponent, {
      data: {
          User: usuario,
      }
  })
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

    buscar() {
      this.filtroAplicado = true;
      let filters: any = {};
      if (this.FilterForm.controls.nombre.value !== '') {
        filters.nombres = this.FilterForm.controls.nombre.value;
      }
      if (this.FilterForm.controls.barrio.value !== '') {
        filters.barrio = this.FilterForm.controls.barrio.value;
      }
      filters.estado = "Activo";
      this.userService.getUsuariosFiltrados(filters, this.authService.getToken()).subscribe(activos => {
        this.UsuariosActivos = activos;     
              // "En adopcion y en provisorio"
      });
      filters.estado = "Bloqueado";
      this.userService.getUsuariosFiltrados(filters, this.authService.getToken()).subscribe(bloqueados => {
        this.UsuariosBloq= bloqueados;     
      }) 
    }
  
    clean() {
      this.iniciarForm();
    }
  
  
    iniciarForm() {
      this.FilterForm = new FormGroup({
        nombre: new FormControl(''),
        tipoMascota: new FormControl(''),
        tamanoFinal: new FormControl(''),
        sexo: new FormControl(''),
        barrio: new FormControl(''),
      });
    }
}




    

    

  