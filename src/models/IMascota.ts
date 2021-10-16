 interface IMascota{
    _id?:string;
    tipoMascota?:number;
    nombreMascota: string;
    tamañoFinal: string;
    sexo: string;
    fechaNacimiento:Date;
    raza: string;
    castrado: number;
    fechaAlta?: Date;
    fechaModificacion?:Date;
    estado:string;
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
    tamañoFinal: string;
    sexo: string;
    fechaNacimiento:Date;
    raza: string;
    castrado:number;
    fechaAlta?:Date;
    fechaModificacion?:Date;
    estado:string;
    responsableCategoria?:number;
    responsableId?:string;
    conductaNiños:string;
    conductaPerros:string;
    conductaGatos:string;
    descripcion:string;

    constructor(){
        
    };
}