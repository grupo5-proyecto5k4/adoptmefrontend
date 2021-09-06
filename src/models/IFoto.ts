
interface Ifoto{
    _id?: string;
    titulo: string;
    descripcion?: string;
    imagenURL?: string;
   
}

export class Foto implements Ifoto{
    _id?:string;
    titulo:string;
    descripcion?:string;
    imagenURL?:string;
    
    constructor(){};
}

