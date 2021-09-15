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
    centrosPendientes: any;
    profile: any;

    constructor(private dialog: MatDialog, private userService: UserService, private alertsService: AlertsService, private authService: AuthService, private router: Router) { }

    

      /*1 - Activo (Usuario)
        2 - Pendiente (Usuario)
        3 - Bloqueado (Usuario) */


    

    
}
  