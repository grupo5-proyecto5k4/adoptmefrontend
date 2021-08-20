import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Ifoto} from '../models/IFoto';
import {Mascota} from '../models/IMascota';
import { Observable } from 'rxjs';
import {catchError,map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class photoService{

    uri='https://adoptmebackend.herokuapp.com/animales/animal'

    constructor(private http:HttpClient){}

    createPhoto(titulo:string, descripcion: string, foto:File){
        const fd= new FormData();
        fd.append('titulo',titulo);
        fd.append('descripcion',descripcion);
        fd.append('imagenURL', foto);
        return this.http.post(this.uri,fd); //deberia ser la url de fotos 
    }

    getPhotos(){
        return this.http.get<Ifoto[]>(this.uri);
    }

    registroAnimal(request: Mascota): Observable<Mascota>{

        return this.http.post<Mascota>(this.uri,request);

    }
}