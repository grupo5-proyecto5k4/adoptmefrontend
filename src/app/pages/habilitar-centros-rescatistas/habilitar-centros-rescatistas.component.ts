import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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

    constructor(private dialog: MatDialog, private userService: UserService, private alertsService: AlertsService,) { }

    ngOnInit() { }


      /*1 - Activo (Usuario)
        2 - Pendiente (Usuario)
        3 - Bloqueado (Usuario) */

    habilitarCentro() {
      //this.userService.getCentrosRescatistasPendientes(estado,)
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
