import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService implements ErrorHandler {
  
  constructor(private alertsService: AlertsService) {
  }

  public handleError(httpError: HttpErrorResponse) {
    let errorMessage = null;
    const {status, statusText, message, url, error} = httpError;
    console.log(httpError);

    if (status === 403) {
      errorMessage = error.error.message ? error.error.message : 'Sin autorización';
    }

    if (status === 404) {
      errorMessage = error.error.message ? error.error.message : 'No se encontró el recurso solicitado.';
    }

    if (status === 500) {
      errorMessage = error.error.message ? error.error.message : 'Se ha producido un error y la operación no pudo completarse. Vuelva a intentar más tarde.';
    }


    if (error.error.message) {
     error.error.message = error.error.message;
    } else if (error.error.message) {
      errorMessage = error.error.message ? error.error.message : null;
    }

    return throwError(error.error.message ? error.error.message : 'Algo no salió bien y la operación no se completó.');
  }
}