import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {catchError, map} from 'rxjs/operators';
import { IRescatistUser } from 'src/models/IRescatistUser';

@Injectable({
  providedIn: 'root'
})
export class SignupRescatistService {
 
  constructor(private httpClient: HttpClient) {}
 
  registerParticularUser(request: IRescatistUser){

  }
}
