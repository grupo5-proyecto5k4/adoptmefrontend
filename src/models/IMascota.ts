 interface IMascota{
    _id?:string;
    tipoMascota?:number;
    nombreMascota: string;
    esCachorro: number;
    tamañoFinal: string;
    sexo: number;
    edad:number;
    razaPadre: string;
    razaMadre: string;
    castrado: number;
    fechaAlta?: Date;
    fechaModificacion?:Date;
    estado?:string;
    responsableCategoria?:number;
    responsableId?:string;
    conductaNiños: string;
    conductaPerros: string;
    conductaGatos: string;
    descripcion: string;

}

export class Mascota implements IMascota{
    _id?:string;
    tipoMascota?:number;
    nombreMascota: string;
    esCachorro: number;
    tamañoFinal: string;
    sexo: number;
    edad: number;
    razaPadre: string;
    razaMadre:string;
    castrado:number;
    fechaAlta?:Date;
    fechaModificacion?:Date;
    estado?:string;
    responsableCategoria?:number;
    responsableId?:string;
    conductaNiños:string;
    conductaPerros:string;
    conductaGatos:string;
    descripcion:string;

    constructor(){
        
    };
}