interface INuevaVacuna{
    _id?:string;
    nombreVacuna:string;
    cantidadDosis:number;
    fechaCreacion?: Date;
    fechaModificacion?: Date;
    
   }
   
   export class NuevaVacuna implements INuevaVacuna{
       _id?:string;
       nombreVacuna:string;
       cantidadDosis:number;
       fechaCreacion?: Date;
       fechaModificacion?: Date;
       
       constructor() { };
   }