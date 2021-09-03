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
    urlFoto='https://adoptmebackend.herokuapp.com/fotos/imagen/add';
   
     
    constructor(private http:HttpClient){}

  
    registroAnimal(request: Mascota, token: string): Observable<any>{

        return this.http.post<any>(this.uri,{request,token});

    }

    registroFoto(request: any): Observable<any>{
      
        const formData = new FormData();
        formData.append('image',request);
        request.withCredentials=false;
        return this.http.post<any>(this.urlFoto,formData);
    }

    
}