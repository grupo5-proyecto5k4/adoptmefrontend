interface INuevaVacuna{
    _id?:string;
    nombreVacuna:string;
    fechaAplicacion:Date;
    fechaCreacion?: Date;
    fechaModificacion?: Date;
    id_Animal:string;
   }
   
   export class NuevaVacuna implements INuevaVacuna{
       _id?:string;
       nombreVacuna:string;
       fechaAplicacion:Date;
       fechaCreacion?: Date;
       fechaModificacion?: Date;
       id_Animal:string;
       constructor() { };
   }