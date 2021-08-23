import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertsService {

    constructor() {
    }

    public confirmMessage(message: string, titleMessage?: string) {
        let alertTitle = '¡Perfecto!';
        if (titleMessage != "" && titleMessage != undefined) {
            alertTitle = titleMessage;
        }
        return Swal.fire({
            title: '<h2 style="color: #333333 !important">'+alertTitle+'</h2>',
            html: '<h3 style="color: #333333 !important">' + message + '</h3>',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#c50fa1',
            backdrop: 'rgba(0,0,0,0.4)',
            width: 350,
        });
    }

    public errorMessage(message: string, titleMessage?: string) {
        let alertTitle = 'Oops...';
        if (titleMessage != "" && titleMessage != undefined) {
            alertTitle = titleMessage;
        }
        return Swal.fire({
            title: '<h2 style="color: #333333 !important">'+alertTitle+'</h2>',
            html: '<h3 style="color: #333333 !important">' + message + '</h3>',
            icon: 'error',
            confirmButtonText: 'Volver',
            confirmButtonColor: '#c50fa1',
            backdrop: 'rgba(0,0,0,0.4)',
            width: 350,
        });
    }

    public questionMessage(message: string, titleMessage: string, confirmText: string, cancelText: string) {
        let alertTitle = titleMessage;

        return Swal.fire({
            title: '<h2 style="color: #333333 !important">'+alertTitle+'</h2>',
            html: '<h3 style="color: #333333 !important">' + message + '</h3>',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: cancelText,
            confirmButtonText: confirmText,
            confirmButtonColor: '#c50fa1',
            backdrop: 'rgba(0,0,0,0.4)',
            width: 350,
            reverseButtons: true,
        });
    }

    public questionErrorMessage(message: string, titleMessage: string, confirmText: string, cancelText: string) {
        let alertTitle = titleMessage;

        return Swal.fire({
            title: '<h2 style="color: #333333 !important">'+alertTitle+'</h2>',
            html: '<h3 style="color: #333333 !important">' + message + '</h3>',
            icon: 'error',
            showCancelButton: true,
            cancelButtonColor: '#d33' ,
            cancelButtonText: cancelText,
            confirmButtonText: confirmText,
            confirmButtonColor: '#c50fa1',
            backdrop: 'rgba(0,0,0,0.4)',
            width: 350,
            reverseButtons: true,
        });
    }

    public infoMessage(message: string, titleMessage?: string){
        let alertTitle = titleMessage;
        return Swal.fire({
        title: '<h2 style="color: #333333 !important">'+alertTitle+'</h2>',
        html: '<h3 style="color: #333333 !important">'+message+'</h3>',
        icon: 'info',
        confirmButtonColor: '#c50fa1',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
      });
    }

}