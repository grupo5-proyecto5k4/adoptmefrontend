 interface IMascota{
    nombreMascota: string;
    esCachorro: number;
    tamañoFinal: string;
    sexo: number;
    edad:number;
    razaPadre: string;
    razaMadre: string;
    castrado: number;
    fechaAlta: Date;
    conductaNiños: string;
    conductaPerros: string;
    conductaGatos: string;
    descripcion: string;

}

export class Mascota implements IMascota{
    nombreMascota: string;
    esCachorro: number;
    tamañoFinal: string;
    sexo: number;
    edad: number;
    razaPadre: string;
    razaMadre:string;
    castrado:number;
    fechaAlta:Date;
    conductaNiños:string;
    conductaPerros:string;
    conductaGatos:string;
    descripcion:string;

    constructor(){
        
    };
}