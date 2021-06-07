import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {catchError, map} from 'rxjs/operators';
import { ParticularUser } from 'src/models/IParticularUser';

@Injectable({
  providedIn: 'root'
})
export class SignupParticularService {
 
  constructor(private httpClient: HttpClient) {}
 
  registerParticularUser(request: ParticularUser){

  }
}
