import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserProfileModalComponent } from 'src/app/components/user-profile-modal/user-profile-modal.component';
import { User } from 'src/models/IUser';
import { UserService } from 'src/services/user.service';
import { AlertsService } from 'src/utils/alerts.service';
import { BarriosService } from 'src/services/barrios.service';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';



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
  profile: any;
  FilterForm: FormGroup;
  filtroAplicado = false;

  myControl = new FormControl();
  selectedBarrio; 
  filteredBarrios: Observable<string[]>;
  barrios: string[] = [];
  barriosBack;

  constructor(private BarriosService: BarriosService, private dialog: MatDialog, private userService: UserService, private alertsService: AlertsService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.BarriosService.getBarrios().subscribe(data => {
      this.barriosBack = data;
      for (let x = 0; x < this.barriosBack.length; x++){
        this.barrios.push(this.barriosBack[x].nombre);
      }
      this.filteredBarrios = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    });

    this.profile = this.authService.getProfile();
    if (this.profile == '0') {
      this.iniciarForm();
      await this.obtenerCentros();
    }
    else {
      window.scrollTo(0, 0);
      this.router.navigate(['/']);
    }
  }


  /*1 - Activo (Usuario)
    2 - Pendiente (Usuario)
    3 - Bloqueado (Usuario) */


  async obtenerCentros() {
    this.userService.getCentrosRescatistasPendientes('Pendiente', this.authService.getToken()).then((r) => {
      this.centrosPendientes = r;
    });
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.barrios.filter(option => option.toLowerCase().includes(filterValue));
  }

  OnHumanSelected(SelectedHuman) {
    this.selectedBarrio = SelectedHuman;
  }

  openUserForm(usuario: User) {
    this.dialog.open(UserProfileModalComponent, {
      data: {
        User: usuario,
      }
    })
  }

  proximamente() {
    this.alertsService.infoMessage('La visualizaci??n del centro rescatista a??n no se encuentra disponible', 'Informaci??n')
  }

  cambiarEstado(user: any, estado: number) {
    let centro: User = { _id: user._id, nombres: user.nombres, correoElectronico: user.correoElectronico, idEstado: estado, dni: user.dni, numeroContacto: user.numeroContacto, fechaNacimiento: user.fechaNacimiento, facebook: user.facebook, instagram: user.instagram, fechaCreacion: user.fechaCreacion, fechaModificacion: user.fechaCreacion, tipoUsuario: user.tipoUsuario, contrasenia: '', Direccion: user.Direccion };
    this.userService.updateAccount(centro, this.authService.getToken()).subscribe({
      complete: () => {
        if (estado == 1) {
          this.alertsService.confirmMessage("El centro rescatista ha sido habilitado")
            .then((result) => {
              this.obtenerCentros();
            });
        }
        else if (estado == 3) {
          this.alertsService.confirmMessage("El centro rescatista ha sido rechazado")
            .then((result) => {
              this.obtenerCentros();
            });
        }
      },
      error: (err: any) => {
        this.alertsService.errorMessage("Se ha producido un error, vuelva a intentar m??s tarde")
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


  buscar() {
    this.filtroAplicado = true;
    let filters: any = {};
    if (this.FilterForm.controls.nombre.value !== '') {
      filters.nombres = this.FilterForm.controls.nombre.value;
    }
    if (this.selectedBarrio !== '') {
      filters.barrio = this.selectedBarrio;
    }
    this.userService.getCentrosRescatistasPendientesFiltrados(filters, this.authService.getToken()).subscribe(centros => {
      this.centrosPendientes = centros;      
    });
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
