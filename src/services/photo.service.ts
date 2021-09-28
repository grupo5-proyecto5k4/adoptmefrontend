import {Injectable} from '@angular/core';
import {HttpClient,HttpEvent,HttpHeaders, HttpRequest,HttpParams} from '@angular/common/http';
import {Mascota} from '../models/IMascota';
import { Observable } from 'rxjs';
import {catchError,map} from 'rxjs/operators';
import {NuevaVacuna} from '../models/INuevaVacuna';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})

export class photoService{

    uri='https://adoptmebackend.herokuapp.com/animales/animal';  
    urlVacuna='https://adoptmebackend.herokuapp.com/vacunas/vacuna'; 
    fotoenv=environment.base_url;

    constructor(private http:HttpClient){}
  
    registroAnimal(request: Mascota, token:string): Observable<any>{

        return this.http.post<Mascota>(this.uri,request,{ headers: new HttpHeaders().set('auth-token', `${token}`)});

    }

    registrarVacuna(request:NuevaVacuna): Observable<any>{
        return this.http.post<NuevaVacuna>(this.urlVacuna,request)
    }
     
    upload(file: File, id_Animal:string): Observable<HttpEvent<any>>{
        const formData: FormData = new FormData();
        formData.append('imagen', file);
        formData.append('id_Animal',id_Animal)
       
        const req = new HttpRequest('POST', `${this.fotoenv}/fotos/imagen/add`, formData);
        return this.http.request(req);
      }
   

   
    
}