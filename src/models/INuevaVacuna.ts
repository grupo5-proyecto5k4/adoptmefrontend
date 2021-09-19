interface INuevaVacuna{
    _id?:string;
    nombreVacuna:string;
    cantidadDosis:number;
    fechaCreacion?: Date;
    fechaModificacion?: Date;
    id_Animal:string;
   }
   
   export class NuevaVacuna implements INuevaVacuna{
       _id?:string;
       nombreVacuna:string;
       cantidadDosis:number;
       fechaCreacion?: Date;
       fechaModificacion?: Date;
       id_Animal:string;
       constructor() { };
   }