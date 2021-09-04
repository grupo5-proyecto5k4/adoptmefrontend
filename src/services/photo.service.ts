import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Mascota} from '../models/IMascota';
import { Observable } from 'rxjs';
import {catchError,map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class photoService{

    uri='https://adoptmebackend.herokuapp.com/animales/animal';   
     
    constructor(private http:HttpClient){}

  
    registroAnimal(request: Mascota, token:string): Observable<any>{

        return this.http.post<Mascota>(this.uri,request,{ headers: new HttpHeaders().set('auth-token', `${token}`)});

    }
     
   
    
}